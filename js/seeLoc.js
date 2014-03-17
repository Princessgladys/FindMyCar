var map = L.map('map').setView([41.3904, 2.1914], 15);

//the base map:
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);

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
	// add car marker
	var carIcon = L.icon({
	    iconUrl: 'img/car.png'/*,
	    shadowUrl: 'leaf-shadow.png',
	    iconSize:     [38, 95], // size of the icon
	    shadowSize:   [50, 64], // size of the shadow
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    shadowAnchor: [4, 62],  // the same for the shadow
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	    */
	});

	L.marker(carLatLng, {icon: carIcon}).addTo(map).bindPopup("<b>My car</b><br>Should be here</br>parked on: "+fecha+"h").openPopup();

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
}


// find route with: 
// http://project-osrm.org/

function getRoute() {
	//alert('carposition: '+carlat+", "+carlon+' myposition:'+mylat+","+mylon)
	var osrm_url = "http://map.project-osrm.org/?hl=es&loc="+mylat+","+mylon+"&loc="+carlat+","+carlon+"&z=15";
	window.open(osrm_url);
}