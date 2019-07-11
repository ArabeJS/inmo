/*\
================================================================================
 *  App
================================================================================
\*/
var RD = angular.module('RDapp',['ngRoute', 'ngMaterial', 'ngMessages','pascalprecht.translate']);
/*\
================================================================================
 *  Config
================================================================================
\*/
var tpl = function (n) {
  return 'page/'+n+'.html';
};

RD.config(function($routeProvider, $translateProvider) {
  $routeProvider
  .when('/', {
    templateUrl: tpl('start'),
    controller: 'start',
  }).when('/login', {
    templateUrl: tpl('login'),
    controller: 'login',
  }).when('/menu', {
    templateUrl: tpl('menu'),
    controller: 'menu',
  })
    .otherwise({
      redirectTo: "/"
    });

  $translateProvider.useStaticFilesLoader({
    prefix: './core/lang/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
});
/*\
================================================================================
 *  Controller
================================================================================
\*/
RD.controller('RDapp', function ($scope,$translate,$location,$rootScope) {
  $scope.tpl = tpl;
  $rootScope.isMenu = false;

  involtFunction.SnotLogin = function(){
    $scope.$apply(function () {
      $location.path('/login');
    });
  };
});
// start
RD.controller('start', function ($scope,$translate,$location,$timeout) {
  $scope.sIcon = 'bluetooth';//'bluetooth_connected';
  $scope.sText = $translate.instant('11');
  $scope.vLoad = false;
  $scope.sVerity = function () {
    $scope.vLoad = true;

    $scope.sIcon = 'developer_mode';
    $scope.sText = $translate.instant('12')+'...';

    function ifError() {
      $timeout(function () {
        $scope.sIcon = 'mobile_off';
        $scope.sText = $translate.instant('13');
        $scope.vLoad = false;
      },200);
    };

    $timeout(function () {
      involt.sendFunction('info');
      ifError();
    },1000);

  }


  involtFunction.InotLogin = function(){
    $scope.$apply(function () {
      $location.path('/login');
    });
  };

  involtFunction.IisLogin = function(){
    $scope.$apply(function () {
      $location.path('/menu');
    });
  };


});
// login
RD.controller('login', function ($scope,$translate,$location,$mdDialog) {
  $scope.login = function (ev) {
    involt.sendOrd('login',$scope.pass);
  }

  involtFunction.notLogin = function(){
    return $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('body')))
        .title($translate.instant('15'))
        .textContent($translate.instant('16'))
        .ariaLabel('Pass Alert Dialog')
        .ok($translate.instant('17'))
    );
  };

  involtFunction.isLogin = function(){
    $scope.$apply(function () {
      $location.path('/menu');involt.sendFunction('stat');
    });
  };
});
// menu
RD.controller('menu', function ($scope,$translate,$location,$rootScope) {
  $rootScope.isMenu = true;

involt.sendFunction('stat');

  $rootScope.stat = {
    onOff: "",
    ignition: "",
    color: 'red',
    on: 1
  };

  function statON() {console.log('on');
    $scope.$apply(function () {
      $scope.stat = {
        onOff: $translate.instant('18'),
        ignition: $translate.instant('20'),
        color: 'yellow-500',
        on: 0
      };
    });
  }

  function statOFF() {console.log('off');
    $scope.$apply(function () {
      $scope.stat = {
        onOff: $translate.instant('19'),
        ignition: $translate.instant('21'),
        color: 'red',
        on: 1
      };
    });
  }

  $scope.boot = function () {
    involt.sendOrd('boot', $scope.stat.on);
  };

  $scope.start = function (n) {
    involt.sendOrd('start',n);
  };

  involtFunction.bootON = function(){
    statON();
  };

  involtFunction.bootOff = function(){
    statOFF();
  };

});
/*============================================================================*/
/*\
================================================================================
 *  RUN
================================================================================
\*/
/*  RDapp  */
RD.run(function($rootScope, $location) {

});
