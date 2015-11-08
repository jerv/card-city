// map stuff
$(document).ready(function() {

  var HEADER_HEIGHT = 70;

  var bittersMap = (function () {
    var geocoder= new google.maps.Geocoder(),
        markers = [],
        myLatlng = new google.maps.LatLng(36.803923, -119.790575),
        mapCenter = new google.maps.LatLng(36.803923, -119.790575),
        mapCanvas = document.getElementById('map_canvas'),
        mapOptions = {
          center: mapCenter,
          zoom: 13,
          scrollwheel: false,
          draggable: true,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(mapCanvas, mapOptions),
        infowindow = new google.maps.InfoWindow({
          content: '4753 N Blackstone, Fresno Ca 93726',
          maxWidth: 300
        }),
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Card City'
        });
    markers.push(marker);

    function deleteMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    return {
      init: function () {
        map.set('styles', [{
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            { hue: '#ffff00' },
            { saturation: 30 },
            { lightness: 10}
          ]}
                          ]);

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map,marker);
        });
      },
      placeMarkerOnAddress: function(address, contentString) {
        geocoder.geocode( {'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            deleteMarkers();
            $('html, body').animate({
              scrollTop: $('#map_canvas').offset().top - HEADER_HEIGHT
            }, 200);
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              animation: google.maps.Animation.DROP,
              position: results[0].geometry.location
            });
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
            markers.push(marker);
          } else {
            console.log("Geocode was not successful for the following reason: " + status);
          }
        });
      }
    };
  }());

  bittersMap.init();

  // register a click callback on the addresses themselves to drop a pin
  $('.ezt-content p').click(function() {
    var address = $(this).find('span').text();
    var contentString = address;
    bittersMap.placeMarkerOnAddress(address, contentString);
  });

});
