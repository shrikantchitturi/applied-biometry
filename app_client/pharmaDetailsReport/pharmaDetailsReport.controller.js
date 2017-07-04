(function () {

  angular
    .module('loc8rApp')
    .controller('pharmaDetailsReportCtrl', pharmaDetailsReportCtrl);

  pharmaDetailsReportCtrl.$inject = ['$routeParams', '$location', '$modal', '$scope','loc8rData', 'authentication','NgTableParams','pharmaDetails'];
  function pharmaDetailsReportCtrl ($routeParams, $location, $modal, $scope, loc8rData, authentication,NgTableParams,pharmaDetails) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();
    
    vm.pageHeader = {
      title: 'Pharmacogenomic Details Report'
    };

    //Pharmacogenomic Report :
    vm.pharmaReportDetails = new NgTableParams({}, {
      getData: function(params) {
        // ajax request to api
        $scope.profile_id = "f608edc7fd20b8df";
        return pharmaDetails.getPharmacogenomicDetails($scope.profile_id)
          .success(function (data) {
            params.total(data.length); // recal. page nav controls
            vm.pharmaReportDetailsResults = data;
            //return data;
         })
        .error(function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
      }
    });

  }

})();