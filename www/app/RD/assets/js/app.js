/*\
================================================================================
 *  App
================================================================================
\*/
var RD = angular.module('RDapp',[
  'ngRoute',
  'ngMaterial'
]);
/*\
================================================================================
 *  Config
================================================================================
\*/
var tpl = function (d) {
  return 'RD/tpl/'+d+'.html';
}

RD.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: tpl('connect'),
    controller: 'connect'
  })
  .when('/login', {
    templateUrl: tpl('login'),
    controller: 'login'
  })
  .when('/remote', {
    templateUrl: tpl('remote'),
    controller: 'remote'
  })
    .otherwise({
      redirectTo: "/"
    });
  // configure html5 to get links working on jsfiddle
  //$locationProvider.html5Mode(true);
});
/*\
================================================================================
 *  Controller
================================================================================
\*/
RD.controller('RDapp',function ($scope,$rootScope) {
  $scope.name = 'Raafet';
  $rootScope.tpl = tpl;
  $rootScope.isLogin = true;

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Info')
        .textContent('project name.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };
});

RD.controller('connect',function ($scope,$location,$timeout) {
  $scope.rcnt = false;
  $scope.msg = 'Connect...';

  involtFunction.involt = function(){
    $location.path('/login');
  };

  $location.path('/login');

  function recont() {
    $timeout(function () {
      $scope.msg = "Can't connect plz re-connect";
      $scope.rcnt = true;
    },5000);
  }

  $scope.recont = function () {
    involt.sendFunction("involt");
    $scope.rcnt = false;
    $scope.msg = 'Connect...';
    recont();
  }

  recont();


});

RD.controller('login',function ($scope,$location,$rootScope) {
  involt.sendFunction("involt");
  $scope.msg = 'Enter password to login';
  $scope.btnLogin = function () {
    $rootScope.pass = $scope.passInp;
    if ($scope.passInp.length > 0) {
      var string = $scope.passInp+"\n";
      involt.sendOrder("login",$scope.passInp,1);
    }
  }

  involtFunction.loginOk = function () {
    $location.path('/remote');
  }
  involtFunction.errorPass = function () {
    $scope.msg = 'Error login password';
  }
});

RD.controller('remote',function ($scope,$rootScope) {
  $scope.mled = 'Enter password to login';
  $scope.powerON = function () {
    involt.sendOrder("power",$rootScope.pass,1);
  }
  $scope.powerOFF = function () {
    involt.sendOrder("power",$rootScope.pass,0);
  }

  $scope.led = function (v) {
    if (v) {
      involt.sendOrder("led",$rootScope.pass,1);
    }else {
      involt.sendOrder("led",$rootScope.pass,0);
    }
  }

  $scope.usb = function (v) {
    if (v) {
      involt.sendOrder("usb",$rootScope.pass,1);
    }else {
      involt.sendOrder("usb",$rootScope.pass,0);
    }
  }

  $scope.engine = function (v) {
    if (v) {
      involt.sendOrder("engine",$rootScope.pass,1);
    }else {
      involt.sendOrder("engine",$rootScope.pass,0);
    }
  }
});
