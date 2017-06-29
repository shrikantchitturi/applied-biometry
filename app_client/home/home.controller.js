(function () {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation', 'NgTableParams', 'snpediaData'];
  function homeCtrl($scope, loc8rData, geolocation, NgTableParams, snpediaData) {
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Applied Biometry',
      strapline: ''
    };


    vm.getData = function (position) {
      var lat = position.coords.latitude,
        lng = position.coords.longitude;
      vm.message = "Searching for nearby places";
      loc8rData.locationByCoords(lat, lng)
        .success(function (data) {
          vm.message = data.length > 0 ? "" : "No locations found nearby";
          vm.data = { locations: data };
          console.log(vm.data);
        })
        .error(function (e) {
          vm.message = "Sorry, something's gone wrong, please try again later";
        });
    };

    vm.showError = function (error) {
      $scope.$apply(function () {
        vm.message = error.message;
      });
    };

    vm.noGeo = function () {
      $scope.$apply(function () {
        vm.message = "Geolocation is not supported by this browser.";
      });
    };

    var self = this;
    var data = [{ rs: "rs1065852", gene: "CYP2D6", summary: "CYP2D6 drug metabolism", missens: "T/C", variant: "TC", annotation: "reduced, intermediate, CYP2D6 function consider use of the following guidelines imipramine: use 80% of standard dosing doxepin: use 80% of standard dosing trimipramine: use 90% of standard dosing desipramine: use 80% of standard dosing nortripyline: use 95% of standard dosing clomipramine: use 90% of standard dosing paroxetine: use 85% of standard dosing venlafaxine: use 80% of standard dosing amitriptyline; use 90% of standard dosing bupropion: use 95% of standard dosing perphenazine: use 80% of standard dosing haloperidol: use 95% of standard dosing olanzapine: use 105% of standard dosing risperidone: use 90% of standard dosing" } /*,*/];
    self.tableParams = new NgTableParams({}, { dataset: data });

    self.wikiTextParams = new NgTableParams({
    }, {
        counts: [],
        getData: function (params) {
           vm.wikiTextList = [];
           var offset = params.url().page;
           var limit = params.url().count;
           snpediaData.getWikiText(offset, limit)
            .success(function (data) {
              params.total(data.length); 
              vm.wikiTextList = data;
              //console.log(vm.wikiTextList);
            })
            .error(function (e) {
              vm.message = "Sorry, something's gone wrong, please try again later";
            });
        }
      });

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