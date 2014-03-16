var map = L.map('map').setView([41.3904, 2.1914], 14);

//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	//maxZoom: 17,
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
		map.setView(carLatLng, 14);
		
		// add marker
		L.marker(carLatLng).addTo(map).bindPopup("parked on:</br>"+fecha+"h").openPopup();
	};
}
var addressPoints = [
[41.3904, 2.1914, 0.4],
[41.3914, 2.1924, 0.2],
[41.3924, 2.1934, 1],
[41.3934, 2.1994, 0.3],
[41.3944, 2.1954, 0.65],
[41.3954, 2.1974, 0.96]]

var heat;
function heatmap(){
	//L.heatLayer(latlngs, options)
	heat = L.heatLayer(addressPoints).addTo(map);
	var options = {
		maxZoom:17,//zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
		max:1,//maximum point intensity, 1.0 by default
		radius: 25,// radius of each "point" of the heatmap, 25 by default
        blur: 14,//amount of blur
        /*gradient: {0.15: "rgb(0,0,255)",
            0.35: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"}*/
	}
	heat.setOptions(options);
}
map.on("moveend", function (e) { 
    console.log(" zoom: " +map.getZoom()+ " center: " + map.getCenter());
    console.log(heat)
})
