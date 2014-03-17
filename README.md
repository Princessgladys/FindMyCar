FindMyCar
=========

HTML5 Mobile Web app that lets you bookmark where you parked your car.

It use the HTML5 geolocation API

```
navigator.geolocation.getCurrentPosition(success, error, options)
```

Save the date (milliseconds) and the car lat, lon locally within the user's browser with the HTML5 localstorage. Information is never transferred to any server.

```
localstorage.setitem(key, value)
```
And show it on a [Leaflet map](http://leafletjs.com/)