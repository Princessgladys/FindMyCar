var map = L.map('map').setView([41.3904, 2.1914], 15);

//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

//window.onload=function(){
	
	//retrieve the values from the database
	var localDBlength =localStorage.length;
	if (localDBlength == 0) {
		alert('Sorry, No car position available!!')
	}
	else {
		console.log('localDBlength: '+localDBlength)
		var lastItem = localDBlength -1

		var itemKey = localStorage.key(lastItem);//get the first item (zero) from the database.
		var values = localStorage.getItem(itemKey); //values currently look like 'Some Project;12;5/7/2010'
		values = values.split(";");
		var lon = values[0];
		var lat = values[1];
		var acc = values[2];
		var milliseconds = new Date(+itemKey);
		var fecha =milliseconds.getFullYear()+'-'+milliseconds.getMonth()+', '+milliseconds.getDay()+'-'+milliseconds.getHours()+':'+milliseconds.getMinutes();
		console.log(itemKey+', '+milliseconds)
		console.log('coche aparcado el: '+fecha+': '+lon+', '+lat)

		var carLatLng = new L.LatLng(lat, lon);
		console.log(carLatLng)
		//map.setView(carLatLng, 17);
		//marker
		//L.marker(carLatLng).addTo(map).bindPopup("<b>My car</b><br>Should be here").openPopup();
	}
//};
