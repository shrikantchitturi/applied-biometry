(function() {

  angular
    .module('loc8rApp')
    .service('pharmaDetails', pharmaDetails);

  pharmaDetails.$inject = ['$http'];
  function pharmaDetails ($http) {
    
    var getPharmacogenomicDetails = function (profile_id, offset, limit) {
      return $http.get('/api/getPharmacogenomicDetails?profile_id=' + profile_id);
    };
    
    return {
      getPharmacogenomicDetails : getPharmacogenomicDetails
    };
  }

})();