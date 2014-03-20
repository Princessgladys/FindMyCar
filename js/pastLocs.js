var map = L.map('map').setView([41.3904, 2.1914], 14);

//the base map:
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: " &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors",
    maxZoom: 18
}).addTo(map);
map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

//retrieve the values from the database
var localDBlength =localStorage.length;
console.log('localDBlength: '+localDBlength)

var arrayPoints = [];
var myMarkers=[];

if (localDBlength == 0) {
	alert('Sorry, No car position available!!')
}
else {
	// add all markers from the localstorage
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
		var myMarker=L.marker(carLatLng)
			.addTo(map)
			.bindPopup("parked on:</br>"+fecha+"h")
			//.openPopup()
			.setOpacity(1);
		// 
		arrayPoints.push([+lat,+lon]);
		myMarkers.push(myMarker);
		console.log(arrayPoints[i]);
		console.log(myMarkers[i]);

	};
}

//create heatmap layer
//L.heatLayer(latlngs, options)
var heat = L.heatLayer(arrayPoints).addTo(map);
var options = {
	maxZoom:17,//zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
	max:1.0,//maximum point intensity, 1.0 by default
	radius: 25,// radius of each "point" of the heatmap, 25 by default
    blur: 15,//amount of blur
    gradient: {0.15: "rgb(0,0,255)",
        0.35: "rgb(0,255,255)",
        0.65: "rgb(0,255,0)",
        0.95: "yellow",
        1.0: "rgb(255,0,0)"}
}
//heat.setOptions(options);


var button = $('#button')

function showMarkers(){
	if (button.html() == 'Hide Markers'){
		button.html('Show Markers');
		for (var i = myMarkers.length - 1; i >= 0; i--) {
			myMarkers[i].setOpacity(0);
		}
	}
	else {
		button.html('Hide Markers')
		for (var i = myMarkers.length - 1; i >= 0; i--) {
			myMarkers[i].setOpacity(1);
		}
	}

};

//leaflet "zoomstart" and "zoomend" events:
/*
map.on("zoomstart", function (e) { 
	zoomlevemap.getZoom()); 
console.log("ZOOMSTART", e); 
console.log("map.getBounds()"+map.getBounds()._southWest.lat+','+map.getBounds()._southWest.lng)
console.log("map.getBounds()"+map.getBounds()._northEast.lat+','+map.getBounds()._northEast.lng)
});*/