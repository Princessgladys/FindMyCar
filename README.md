FindMyCar
=========

HTML5 Mobile Web app that lets you bookmark where you parked your car.

It use the HTML5 geolocation API:

```
navigator.geolocation.getCurrentPosition(success, error, options)
```

Save the date (milliseconds) and the car lat, lon locally within the user's browser with the HTML5 localstorage API. Information is never transferred to any server.

```
localstorage.setitem(key, value)
```
Show the car position on a iteractive map made with the [Leaflet.js](http://leafletjs.com/) library.

Used OpenStreetMap as base layer:

```
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);
```

Additionally the user can get a route to the car with the [project-osrm](http://project-osrm.org/).

![Find my car img](https://raw.githubusercontent.com/mappingCo/FindMyCar/gh-pages/img/findmycar.png "Find my Car Web app")