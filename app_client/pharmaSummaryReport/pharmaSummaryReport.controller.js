(function () {

  angular
    .module('loc8rApp')
    .controller('pharmaSummaryReportCtrl', pharmaSummaryReportCtrl);

  pharmaSummaryReportCtrl.$inject = ['$routeParams', '$location', '$modal', '$scope','loc8rData', 'authentication','NgTableParams','pharmaReport'];
  function pharmaSummaryReportCtrl ($routeParams, $location, $modal, $scope, loc8rData, authentication,NgTableParams,pharmaReport) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();
    
    vm.pageHeader = {
      title: 'Pharmacogenomic Summary Report'
    };

    //Pharmacogenomic Report :
    vm.pharmaReportSummary = new NgTableParams({}, {
      getData: function(params) {
        // ajax request to api
        $scope.profile_id = "f608edc7fd20b8df";
        return pharmaReport.getPharmaReportSummary($scope.profile_id)
          .success(function (data) {
            params.total(data.length); // recal. page nav controls
            vm.pharmaReportSummaryResults = data;
            return data;
         })
        .error(function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
      }
    });

  }

})();