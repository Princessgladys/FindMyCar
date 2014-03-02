//geolocation API
var x = document.getElementById("texto");
var lat;
var lon;
var accu;


function getLocation()  {
  var options = null;
  if (navigator.geolocation) {
    options={enableHighAccuracy: true, maximumAge: 30000, timeout: 30000};
	navigator.geolocation.getCurrentPosition(showPosition,getNoPosition,options);
  }
  else {
  	x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

function showPosition(position) {
  	x.innerHTML = position.coords.latitude +', '+ position.coords.longitude;
	
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	accu= position.coords.accuracy;

	var mapCenter = new L.LatLng(lat, lon);
	map.setView(mapCenter, 17);

	L.marker(mapCenter).addTo(map)
	.bindPopup("You are within " + accu + " meters from this point").openPopup();

	L.circle(mapCenter, accu).addTo(map);
}

function userLocation(){
	saveLocation(lat, lon, accu);//calls a function in locations.js
};

function getNoPosition(position) {
	//map.setView([41.3905, 2.1914], 15);
	x.innerHTML = "Geolocation is not supported"
}
var map = L.map('map').setView([41.3905, 2.1914], 15);


//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


/*map.on('moveend', function() {
    console.log("map was panned!");
    console.log("zoom: " + map.getZoom());    // prints out zoom level
    console.log("center: " + map.getCenter());    // prints out map center
    //console.log(map.getBounds());    // throws error
    console.log("min zoom "+map.getMinZoom() + ' max '+ map.getMaxZoom() )
});*/



