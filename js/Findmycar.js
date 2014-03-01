
//geolocation API
var x = document.getElementById("texto");
var userLat;
var userLon;
var accu;

function getLocation()
  {
  if (navigator.geolocation)
    {
	navigator.geolocation.getCurrentPosition(showPosition,noLoco,{frequency:5000,maximumAge: 0, timeout: 10000, enableHighAccuracy:true});
    //navigator.geolocation.getCurrentPosition(showPosition);
    //navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});
    }
  else{x.innerHTML = "Geolocation is not supported by this browser.";}
  }
function showPosition(position) {
  	x.innerHTML = "geolocationAPI coords | Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	accu= position.coords.accuracy;

	var mapCenter = new L.LatLng(lat, lon);
	map.setView(mapCenter, 13);

	L.marker(mapCenter).addTo(map)
	.bindPopup("You are within " + accu + " meters from this point").openPopup();

	L.circle(mapCenter, accu).addTo(map);
}

function noLoco(position) {
	map.setView([41.3, 2.19], 13);
}
var map = L.map('map').setView([42, 2], 13);


L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


/*
function onLocationFound(e) {
	var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map)
		.bindPopup("You are within " + radius + " meters from this point").openPopup();

	L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});
*/

