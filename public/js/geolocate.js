var service;
var infowindow;
var map;
// var places = [
//         {
//           name: "adafruit",
//           address: "150 Varick Street, New York, NY 10013",
//           lat: 40.72601909999999,
//           long: -74.00536,
//         },
//         {
//           name: "tinkersphere",
//           address: "304 East 5th Street, New York, NY 10003",
//           lat:  40.7263943,
//           long: -73.98856080000002,
//         },
//         {
//           name: "nycresistor",
//           address: "87 3rd Avenue, 4th Floor, Brooklyn, NY 11217",
//           lat: 40.6836146,
//           long: -73.98167289999998,
//         }
//       ]
      function initMap() {
        

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // var loc = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

map = new google.maps.Map(document.getElementById('googleMap'), {
          // center: {lat: -34.397, lng: 150.644},
          center: pos,
          zoom: 6
        });
    infoWindow = new google.maps.InfoWindow();
    
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      map.setCenter(pos);

var request = {
    location: pos,
    radius: '10000',
    name: ['raspberry pi']
  };
  

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


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

            
// var map;
// var service;
// var infowindow;

// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     types: ['store']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: '../img/Raspberry_Pi_map_marker.png'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


// // function initMarkers(){
//    //create markers
//    var marker = new google.maps.Marker();

//    google.maps.event.addListener(marker, 'click', openInfoWindow(marker, i));
// }

// var infowindow = new google.maps.InfoWindow();
// function openInfoWindow(marker,index){
//          return function(e) {

//             //Close other info window if one is open
//             if (infowindow) {
//                 infowindow.close();
//             }

//             var content = marker.offer.text;

//             infowindow.setContent(content);

//             setTimeout(function() {
//                 infowindow.open(map, marker);
//             }, 200);
//         }
// }



      initMap();

