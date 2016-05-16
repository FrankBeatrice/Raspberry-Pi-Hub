var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  var myLatLng = {lat: crd.latitude, lng: crd.longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });
  
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Your location'
  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
};

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      google.maps.event.addListener(marker, "click", function (event) {
          var latitude = event.latLng.lat();
          var longitude = event.latLng.lng();
          console.log( latitude + ', ' + longitude );
      });
      // NOT WORKING - Info Window
      // var contentString = "this place";
      // var infowindow = new google.maps.InfoWindow({
      //   content: contentString
      // });
      // marker.addListener('click', function() {
      //   infowindow.open(map, marker);
      // });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function initMap() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}