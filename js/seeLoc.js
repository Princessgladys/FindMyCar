var map = L.map('map').setView([41.3904, 2.1914], 15);

//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


	
//retrieve the values from the database
var localDBlength =localStorage.length;
if (localDBlength == 0) {
	alert('Sorry, No car position available!!')
}
else {
	console.log('localDBlength: '+localDBlength)
	var lastItem = localDBlength -1

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
	var latN= +lat,
		lonN= +lon;
	console.log('car parked on: '+fecha+', at '+latN.round(4)+', '+lonN.round(4));

	var carLatLng = new L.LatLng(lat, lon);
	map.setView(carLatLng, 15);
	// add marker
	L.marker(carLatLng).addTo(map).bindPopup("<b>My car</b><br>Should be here</br>parked on: "+fecha+"h").openPopup();
}

function getLocation()  {
  var options = null;
  if (navigator.geolocation) {
    options={enableHighAccuracy: true, maximumAge: 30000, timeout: 30000};
	navigator.geolocation.getCurrentPosition(showPosition,getNoPosition,options);
  }
  else {
  	alert("Geolocation is not supported by this browser.");
  }
};

function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	accu= position.coords.accuracy;

	var mapCenter = new L.LatLng(lat, lon);
	map.setView(mapCenter, 14);

	L.marker(mapCenter).addTo(map)
	.bindPopup("You are within " + accu + " meters from this point").openPopup();

	L.circle(mapCenter, accu).addTo(map);
}

function getNoPosition(position) {
	//map.setView([41.3905, 2.1914], 15);
	alert("Geolocation is not supported")
}