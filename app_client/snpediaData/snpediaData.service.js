(function() {

  angular
    .module('loc8rApp')
    .service('snpediaData', snpediaData);

  snpediaData.$inject = ['$http'];
  function snpediaData ($http) {
    
    var getWikiText = function (page, limit) {
      return $http.get('/api/snpediaWiki?page=' + page + '&limit=' + limit);
    };
    
    var getWikiTags = function (page, limit) {
      return $http.get('/api/snpediaWikiTags?offset=' + page + '&limit=' + limit);
    };
    return {
      getWikiText : getWikiText,
      getWikiTags : getWikiTags
    };
  }

})();