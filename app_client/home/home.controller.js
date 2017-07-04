(function () {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'NgTableParams', 'snpediaData'];
  function homeCtrl($scope, NgTableParams, snpediaData) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    vm.pageHeader = {
      title: 'Applied Biometry',
      strapline: ''
    };

    var self = this;
    //Snpedia

    vm.wikiTextList = [];
    this.getWikiTextList = function callServer(tableState) {

      vm.isWikiTextLoading = true;

      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.
      snpediaData.getWikiText(start,number,tableState)
        .success(function (data) {
          tableState.pagination.numberOfPages = 100;//set the number of pages so the pagination can update
          vm.wikiTextList = data;
          vm.isWikiTextLoading = false;
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
      });
    };


    self.wikiTagsParams = new NgTableParams({
    }, {
        counts: [],
        getData: function (params) {
          vm.wikiTagsList = [];
          var offset = params.url().page;
          var limit = params.url().count;
          snpediaData.getWikiTags(offset, limit)
            .success(function (data) {
              params.total(data.length);
              vm.wikiTagsList = data;
              console.log(vm.wikiTagsList);
            })
            .error(function (e) {
              vm.message = "Sorry, something's gone wrong, please try again later";
            });
        }
      });

  }

})();