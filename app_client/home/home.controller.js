(function () {

  angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation', 'NgTableParams', 'snpediaData','pharmaReport'];
  function homeCtrl($scope, loc8rData, geolocation, NgTableParams, snpediaData,pharmaReport) {
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
   
    //Pharmacogenomic Report :
    self.pharmaReportSummary = new NgTableParams({}, {
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



    // self.wikiTextParams = new NgTableParams({
    //   page: 1,            // show first page
    //   count: 10,           // count per page
    // }, {
    //     getData: function (params) {
    //       //vm.wikiTextList = [];
    //       var offset = params.url().page;
    //       var limit = params.url().count;
    //       snpediaData.getWikiText(offset, limit)
    //         .success(function (data) {
    //           params.total(data.length);
    //           return data;
    //           //vm.wikiTextList = data;
    //           //console.log(vm.wikiTextList);
    //         })
    //         .error(function (e) {
    //           vm.message = "Sorry, something's gone wrong, please try again later";
    //         });
    //     }
    //   });

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


    //

  }

})();