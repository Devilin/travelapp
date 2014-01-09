// public/map.js

//Creating map
var map;
$(document).ready(function(){
      map = new GMaps({
        el: '#map',
        lat: 0,
        lng: 0,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'BOTTOM_LEFT'
        },
        panControl : false,
        streetViewControl : false,
        mapTypeControl: false,
        overviewMapControl: false
      });

// Define user location
      GMaps.geolocate({
		  success: function(position) {
		    map.setCenter(position.coords.latitude, position.coords.longitude);

		    // Creating marker of user location
			  map.addMarker({
				  lat: position.coords.latitude,
				  lng: position.coords.longitude,
				  title: 'Lima',
				  click: function(e) {
				    alert('You clicked in this marker');
				  },
				  infoWindow: {
					  content: '<p>You are here!</p>'
					}
			});
		  },
		  error: function(error) {
		    alert('Geolocation failed: '+error.message);
		  },
		  not_supported: function() {
		    alert("Your browser does not support geolocation");
		  }
	  });


      //Map Search
      $('#geocoding_form').submit(function(e){
        e.preventDefault();
        GMaps.geocode({
          address: $('#address').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng(),
                infoWindow: {
                  content: $('#address').val()+'<p ng-bind="placeData.lat">'+latlng.lat()+'</p>'+'<p ng-bind="placeData.lng">'+latlng.lng()+'</p>'
                } 
              });

            } else {
                  alert('Nothing found');
            }
          }
        });
      });

});
