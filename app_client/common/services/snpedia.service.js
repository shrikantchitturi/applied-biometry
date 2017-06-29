(function() {

  angular
    .module('loc8rApp')
    .service('snpediaData', snpediaData);

  snpediaData.$inject = ['$http'];
  function snpediaData ($http) {
    
    var getWikiText = function (offset, limit) {
      return $http.get('/api/snpediaWiki?offset=' + offset + '&limit=' + limit);
    };
    
    var getWikiTags = function (offset, limit) {
      return $http.get('/api/snpediaWikiTags?offset=' + offset + '&limit=' + limit);
    };
    return {
      getWikiText : getWikiText,
      getWikiTags : getWikiTags
    };
  }

})();