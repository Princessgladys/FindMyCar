var x = document.getElementById("texto");


//save data values into localstorage
function saveToLocalDB (key, value){

	if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		try {
			localStorage.setItem(key, value); //saves to the database, "key", "value"
		} catch (e) {
		 	 if (e == QUOTA_EXCEEDED_ERR) {
		 	 	 alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
			}
		}
	}
};


//push data into an array
function savelocation(lon,lat, accuracy) {
	var newDate = new Date(),
		DateTime = newDate.getTime(),
		values = new Array(),
		pos_lon = lon,
		pos_lat = lat,
		pos_acc = accuracy;
	
	values.push(pos_lon); //push each value into our values array
	values.push(pos_lat);
	values.push(pos_acc);

	x.innerHTML =DateTime+ '<br>, '+ lon+', '+lat+ ', '+ accuracy
	saveToLocalDB(DateTime, values)

}

//retrieve the values from the database
function getFromLocalDB(){
	
	var localDBlength =localStorage.length;
	console.log('localDBlength: '+localDBlength)
	
	var itemKey = localStorage.key(0);//get the first item (zero) from the database.
	var values = localStorage.getItem(itemKey); //values currently look like 'Some Project;12;5/7/2010'
	values = values.split(";");
	var lon = values[0];
	var lat = values[1];
	var acc = values[2];
	var milliseconds = new Date(itemKey);
	var fecha =milliseconds.getFullYear()+'-'+milliseconds.getMonth()+', '+milliseconds.getDay()+'-'+milliseconds.getHours()+':'+milliseconds.getMinutes();
	alert(fecha)
};
