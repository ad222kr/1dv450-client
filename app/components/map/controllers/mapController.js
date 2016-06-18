angular
  .module("pub-map")
  .controller("MapController", MapController);

MapController.$inject = ["NgMap", "PubService", "$scope", "FlashService"]
/**
 * (description)
 * 
 * @param NgMap - Angular wrapper of google maps (i think?)
 * @param PubService - Pubs factory
 */
function MapController(NgMap, PubService, $scope, FlashService) {
  var vm = this;
  vm.markers = [];
  var infoWindow;



  NgMap
    .getMap().
    then(function(map) {
      vm.map = map;
      console.log(vm.map);
      PubService.getPubs()
        .then(function(data) {

          vm.markers = [];
          initMarkers(data.pubs); 
        })
        .catch(function(error) {
          FlashService.createErrorFlash(error);
        });
    });

    $scope.$on("pubClicked", function(event, pub, updateMarkers) {
      // Get the pubs again here when detail is viewed, since
      // it needs to be panned to a marker when a new pub is created
      // BUT it does not exist in the markers array or in the pubs gotten
      // the first time mapcontroller is run. 
      // So update this everytime to fix it even if it is unneccesary
      // Hope this comment makes sense
      // dis is panic fix
      PubService.getPubs()
        .then(function(data) {
          vm.markers = [];
          initMarkers(data.pubs);

          var markerObj = vm.markers.find(function(marker) {
            return marker.lat === pub.position.latitude && marker.lng === pub.position.longitude;
          })
          var latLng = new google.maps.LatLng(markerObj.lat, markerObj.lng);
          
          vm.map.setZoom(17);
          vm.map.panTo(latLng);
          openInfoWindow(markerObj.marker, pub);
        })
        .catch(function(error) {
          FlashService.createErrorFlash(error);
        });
      
    });

    $scope.$on("pubDeleted", function(event) {
      console.log(event);
      console.log("delted pub");
      PubService.getPubs()
        .then(function(data) {
          console.log(vm.markers);

          vm.markers.forEach(function(marker) {
            console.log(marker);
            marker.marker.setMap(null);
          });
          vm.markers = [];
          console.log(data.pubs);
          initMarkers(data.pubs);
        })
        .catch(function(error) {
          console.log(error);
        });
    });



  /**
   * Draws the markers on the map
   * 
   * @param data - object containing a list of the pubs
   */
  function initMarkers(pubs) {
    infoWindow = new google.maps.InfoWindow(); // Using the same instance for info-window
    vm.map.addListener("click", closeInfoWindow);
    pubs.forEach(function(pub) {
      var marker = new google.maps.Marker({
        position: {
          lat: pub.position.latitude,
          lng: pub.position.longitude },
        map: vm.map});
      // marker has its own method for getting lng/lat but its stupid floating point numbers
      // makes it impossible to compare since 0.1 + 0.2 = 0.30000000000000004 problem
      vm.markers.push({ marker: marker, lat: pub.position.latitude, lng: pub.position.longitude});
      marker.addListener("click", function() {
        openInfoWindow(marker, pub);
      });
     
    });
  }

  /**
   * Opens a markers information window
   * 
   * @param marker - the marker on which to open the window
   * @param pub - information of the pub to show
   */
  function openInfoWindow(marker, pub) {
    var latLng = marker.getPosition();
    infoWindow.setContent("<b>" + pub.name + "</b>");
    infoWindow.open(vm.map, marker);
  }

  /**
   * Closes the marker
   */
  function closeInfoWindow() {
    infoWindow.close();
  }


}
