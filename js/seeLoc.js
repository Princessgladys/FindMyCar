var map = L.map('map').setView([41.3904, 2.1914], 15);

//the base map:
// 
//alternate base
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors. Routes from <a href="http://project-osrm.org/">OSRM</a>',
    maxZoom: 18
}).addTo(map);
//map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

var carlat,carlon;
	
//retrieve values (date and car positions) from the database
var localDBlength =localStorage.length;
if (localDBlength == 0) {
	alert('Sorry, No car position available!!')
}
else {
	console.log('localDBlength: '+localDBlength)
	var lastItem = localDBlength -1 //last car position

	var itemKey = localStorage.key(lastItem);
	var values = localStorage.getItem(itemKey);
	values = values.split(";");
	var lat = values[0];
	var lon = values[1];
	var acc = values[2];
	var milliseconds = new Date(+itemKey);//convert to number
	var mes =milliseconds.getMonth()+1;
	var fecha =milliseconds.getFullYear()+'/'+mes+'/'+milliseconds.getDate()+', '+milliseconds.getHours()+':'+milliseconds.getMinutes();
	console.log(itemKey+', '+milliseconds);
	// redondear a 4 decimales
	Number.prototype.round = function(places) {
	  return +(Math.round(this + "e+" + places)  + "e-" + places);
	}
	carlat= +lat,
	carlon= +lon;
	console.log('car parked on: '+fecha+', at '+carlat.round(4)+', '+carlon.round(4));

	var carLatLng = new L.LatLng(lat, lon);
	map.setView(carLatLng, 16);
	
	// add car red marker, Extend the Default marker class
    var RedIcon = L.Icon.Default.extend({
        options: {iconUrl: 'img/marker-icon-red.png'}
    });
    var redIcon = new RedIcon();
	L.marker(carLatLng, {icon: redIcon}).addTo(map).bindPopup("<b>My car</b> should be here</br>parked on: "+fecha+"h").openPopup();

}

// find user position
function getLocation()  {
  var options = null;
  if (navigator.geolocation) {
    options={enableHighAccuracy: true, maximumAge: 3000, timeout: 30000};
	navigator.geolocation.getCurrentPosition(showPosition,getNoPosition,options);
  }
  else {
  	alert("Geolocation is not supported by this browser.");
  }
};

var mylat,mylon;

function showPosition(position) {
	mylat = position.coords.latitude;
	mylon = position.coords.longitude;
	accu= position.coords.accuracy;

	var mapCenter = new L.LatLng(mylat, mylon);
	map.setView(mapCenter, 16);

	L.marker(mapCenter).addTo(map)
	.bindPopup("You are within " + accu + " meters from this point").openPopup();

	L.circle(mapCenter, accu).addTo(map);
}

function getNoPosition(position) {
	//map.setView([41.3905, 2.1914], 15);
	alert("Geolocation is not supported")
};

// find route with leaflet-routing-machine.js
function getRoute() {
	if (mylat == undefined) {
		getLocation();
	}

	L.Routing.control({
	    waypoints: [
	        L.latLng(mylat,mylon),
	        L.latLng(carlat,carlon)
	    ]
	}).addTo(map);
};



