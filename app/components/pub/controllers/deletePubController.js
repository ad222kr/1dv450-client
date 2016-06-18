angular
  .module("pub-map")
  .controller("DeletePubController", DeletePubController);
  
DeletePubController.$inject = [
  "PubService",
  "AuthService",
  "$location",
  "FlashService",
  "$stateParams",
  "$rootScope"
];

function DeletePubController(PubService, AuthService, $location, FlashService, $stateParams, $rootScope) {
  var vm = this;
  vm.loaded = false;
  
  PubService
    .getPubById($stateParams.id)
    .then(function(res) {
      vm.pub = res.pub;
      vm.loaded = true;
    })
    .catch(function(error) {
      FlashService.createErrorFlash(error);
    });
  
  vm.confirmDelete = function() {
    PubService.deletePub(vm.pub.id)
      .then(function(res) {
        var message = "<p>The pub was deleted!</p>";
        FlashService.createSuccessFlash(message);
        $rootScope.$broadcast("pubDeleted");
        $location.url("/pubs");
      })
      .catch(function(error) {
        FlashService.createErrorFlash(error);
      });
  }
  
  vm.cancelDelete = function() {
    console.log("Hell no");
    $location.url("/pubs");
  }
    
  
}