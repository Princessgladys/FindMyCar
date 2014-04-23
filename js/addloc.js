//geolocation API
var x = document.getElementById("texto");
var lat;
var lon;
var accu;


function getLocation()  {
  var options = null;
  if (navigator.geolocation) {
    options={enableHighAccuracy: true, maximumAge: 3000, timeout: 30000};
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
};

function getNoPosition(position) {
	//map.setView([41.3905, 2.1914], 15);
	x.innerHTML = "Geolocation is not supported"
};

var map = L.map('map').setView([41.3905, 2.1914], 15);

//the base map:
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors. Routes from <a href="http://project-osrm.org/">OSRM</a>',
    maxZoom: 18
}).addTo(map);

/*map.on('moveend', function() {
    console.log("map was panned!");
    console.log("zoom: " + map.getZoom());    // prints out zoom level
    console.log("center: " + map.getCenter());    // prints out map center
    //console.log(map.getBounds());    // throws error
    console.log("min zoom "+map.getMinZoom() + ' max '+ map.getMaxZoom() )
});*/

//save data values into localstorage
function saveToLocalDB (key, value){

	if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		try {
			localStorage.setItem(key, value.join(";")); 
			$('#msgbox').removeClass('hide');
			$('#msgbox').html('save location on localStorage. '+value.join(";"));
			console.log('save location on localStorage');
			//localStorage.setItem(key, value); //saves to the database, "key", "value"
		} catch (e) {
		 	 if (e == QUOTA_EXCEEDED_ERR) {
		 	 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
			}
		}
	}
};

//push data into an array
function savelocation() {
	var newDate = new Date(),
		DateTime = newDate.getTime(),
		values = new Array();
	
	values.push(lat); //push each value into our values array
	values.push(lon);
	values.push(accu);

	x.innerHTML =DateTime+ '<br>, '+ lat+', '+lon+ ', '+ accu;
	saveToLocalDB(DateTime, values);
	console.log('savelocation:'+DateTime+ ', '+ lat+', '+lon+ ', '+ accu)

};



