var map = L.map('map').setView([41.3904, 2.1914], 15);

//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

//retrieve the values from the database
var localDBlength =localStorage.length;
console.log('localDBlength: '+localDBlength)

if (localDBlength == 0) {
	alert('Sorry, No car position available!!')
}
else {
	// add all markers
	//for (var i = localDBlength - 1; i >= 0; i--) {
	for (var i = 0; i<localDBlength; i++) {

		var itemKey = localStorage.key(i);
		var values = localStorage.getItem(itemKey);
		values = values.split(";");
		var lat = values[0];
		var lon = values[1];
		var acc = values[2];
		var milliseconds = new Date(+itemKey);//convert to number
		var mes =milliseconds.getMonth()+1;
		var fecha =milliseconds.getFullYear()+'/'+mes+'/'+milliseconds.getDate()+', '+milliseconds.getHours()+':'+milliseconds.getMinutes();
		console.log('position '+i+': '+fecha+', parked at '+ lat+', '+lon)
		var carLatLng = new L.LatLng(lat, lon);
		map.setView(carLatLng, 15);
		
		// add marker
		L.marker(carLatLng).addTo(map).bindPopup("parked on:</br>"+fecha+"h").openPopup();

	};



}