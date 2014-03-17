FindMyCar
=========

Mobile Web app that lets you bookmark where you parked your car

milestones
----------

[x] landing page

[x] base map, get user location (geolocationAPI)

[x] save location on localstorage

[x] footer menu

[x] see location

[ ] get a route to the car

[x] heatmaps

HTML5 geolocation [navigator.geolocation.getCurrentPosition(success, error, options)]:

```
options:
===============================================================
watch                 | [false] | watch for position changes
timeout               | [10000] | timeout for position lookup
maximumAge            | [3000]  | max age of cached positions
enableHighAccuracy    | [true]  | use high-accuracy positioning
```


HTML5 localstorage [localstorage.setitem(key value)]

```
var newDate = new Date(),
	DateTime = newDate.getTime(),
	values = new Array();

values.push(lat);
values.push(lon);
values.push(accu);

localStorage.setItem(DateTime, values.join(";")); 

```