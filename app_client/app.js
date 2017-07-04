(function () {

  angular.module('loc8rApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap','ngTable','smart-table','ngResource']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/pharmaSummaryReport', {
        templateUrl: '/pharmaSummaryReport/pharmaSummaryReport.view.html',
        controller: 'pharmaSummaryReportCtrl',
        controllerAs: 'vm'
      })
      .when('/pharmaDetailsReport', {
        templateUrl: '/pharmaDetailsReport/pharmaDetailsReport.view.html',
        controller: 'pharmaDetailsReportCtrl',
        controllerAs: 'vm'
      })
      .when('/snpediaData', {
        templateUrl: '/snpediaData/snpediaData.view.html',
        controller: 'snpediaDataCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    //$locationProvider.html5Mode(true);
  }

  angular
    .module('loc8rApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();