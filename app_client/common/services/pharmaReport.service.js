(function() {

  angular
    .module('loc8rApp')
    .service('pharmaReport', pharmaReport);

  pharmaReport.$inject = ['$http'];
  function pharmaReport ($http) {
    
    var getPharmaReportSummary = function (profile_id, offset, limit) {
      return $http.get('/api/getPharmacogenomicReport?profile_id=' + profile_id);
    };
    
    return {
      getPharmaReportSummary : getPharmaReportSummary
    };
  }

})();