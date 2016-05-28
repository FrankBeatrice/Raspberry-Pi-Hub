


var PiBaseMap = function(container){

  var map;
  var service;
  var infoWindow;
  var promise = $.Deferred();
  

  function init() {

      PiBaseMap.loadApi().then(function(){
        initMap();
      });
  }



  function initMap() {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

      // var loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      map = new google.maps.Map(document.getElementById(container), {
          center: pos,
          zoom: 11
        });

      infoWindow = new google.maps.InfoWindow();

      map.setCenter(pos);

      promise.resolve();

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.location,
    icon: '../img/Raspberry_Pi_map_marker.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


this.addPoint=function(point){
  promise.then(function(){

    var pos = new google.maps.LatLng(point.location.lat,point.location.lng);
    
    var marker = new google.maps.Marker({
      position:pos,
      title:point.title
          });

    marker.info = point.description;

   marker.addListener('click', function() {
      infoWindow.setContent(point.title);
      //infoWindow.open(map,marker);
    });

    marker.setMap(map);
  });
}

init();

};

PiBaseMap.promise = null;

PiBaseMap.loadApi = function(){

    if(PiBaseMap.promise !== null)
      return PiBaseMap.promise;

  var url = "https://maps.googleapis.com/";
  var uri = "maps/api/js";
  var apiKey = "AIzaSyC7H15nLRAnl2kb_3Ac1oFg8bQfnZF8u0I";
  var loadCallback = "apiLoaded";

    PiBaseMap.promise = $.Deferred();

    var apiUrl = url + uri + "?" +
                  "key=" + apiKey +
                  "&library=places" +
                  "&callback=" + loadCallback;
    var script = document.createElement('script');
    script.src = apiUrl;
    $("body").append(script);

    return PiBaseMap.promise;
}


   window.apiLoaded = function() {

      PiBaseMap.promise.resolve();
  }



