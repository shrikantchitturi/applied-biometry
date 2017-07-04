(function () {

  angular
    .module('loc8rApp')
    .controller('snpediaDataCtrl',snpediaDataCtrl);

  snpediaDataCtrl.$inject = ['$routeParams', '$location','$scope', 'authentication','NgTableParams','snpediaData'];
  function snpediaDataCtrl ($routeParams, $location, $scope, authentication,NgTableParams,snpediaData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();
    
    vm.pageHeader = {
      title: 'Snpedia Data'
    };

// $scope.LoadOutletTypes = function () {
//       snpediaData.getWikiText(1,1000)
//           .success(function (data) {
//             //vm.wikiTextParamsList = data;
//             $scope.outletTypes = data;
//             $scope.setOutletTypeWithOptions();
//         })
// };

// $scope.setOutletTypeWithOptions = function () {

//     var initialParams = {
//         count: 5 // initial page size
//     };
//     var initialSettings = {
//         // page size buttons (right set of buttons in demo)
//         counts: [10, 50, 100],
//         // determines the pager buttons (left set of buttons in demo)

//         paginationMaxBlocks: 5,
//         paginationMinBlocks: 1,
//         dataset: $scope.outletTypes
//     };

//     vm.wikiTextParams = new NgTableParams(initialParams, initialSettings);

// };
    //Wiki Text :
    vm.wikiTextParams = new NgTableParams({}, {
      getData: function(params) {
        //ajax request to api
        vm.wikiTextParamsList = [];
        snpediaData.getWikiText(params.url().page,params.url().count)
          .success(function (data) {
            params.total(data.length); // recal. page nav controls
            vm.wikiTextParamsList = data;
            //return data;
        }).error(function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
      }
    });

    //Wiki Tags :
     vm.wikiTagsParams = new NgTableParams({
    }, {
        getData: function (params) {
          vm.wikiTagsList = [];
          return snpediaData.getWikiTags(params.url().page,params.url().count)
            .success(function (data) {
              params.total(data.length);
              vm.wikiTagsList = data;
            })
            .error(function (e) {
              vm.message = "Sorry, something's gone wrong, please try again later";
            });
        }
      });

  }

})();