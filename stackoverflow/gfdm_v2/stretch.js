var map;
var overlay;

function initialize() {
  var myLatlng = new google.maps.LatLng(0, 0);
  var mapOptions = {
    center: myLatlng,
    zoom: 2,
    minZoom: 0,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById('map_canvas_1'),
                            mapOptions);

  var dim = {"res":0.25,"minlat":-85.05,"minlon":-179.75,"nlat":682.5,"nlon":1441};
  var swBound = new google.maps.LatLng(dim.minlat, dim.minlon);
  var neBound = new google.maps.LatLng(dim.minlat + (dim.nlat-1)*dim.res - dim.res, dim.minlon + (dim.nlon-1)*dim.res - dim.res);

  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  overlay = new ImageOverlay(bounds, "ndvi30_20130908.png", map, 0, 0);
}

google.maps.event.addDomListener(window, 'load', initialize);
