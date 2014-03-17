FindMyCar
=========

HTML5 Mobile Web app that lets you bookmark where you parked your car.

It use the HTML5 geolocation

```
navigator.geolocation.getCurrentPosition(success, error, options)
```

Save the date (milliseconds) and the car lat, lon in HTML5 localstorage 

```
localstorage.setitem(key, value)
```
And show it on a [Leaflet map](http://leafletjs.com/)