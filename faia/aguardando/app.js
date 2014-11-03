(function() {
  var app = angular.module('aguardando', ['components', 'firebase']);
  var ref = new Firebase("https://faia.firebaseio.com/aguardando");

  app.controller("OrganizationController", ['$scope', '$firebase', function($scope, $firebase) {
    function init(authData) {
      $scope.loginStatus = "Welcome back " + authData.password.email + "! Your token expires " + (new Date(authData.expires * 1000));
      $scope.loggedIn = true;
    }

    function clean() {
      $scope.loginStatus = "Please log in";
      $scope.tasks = [];
      $scope.loggedIn = false;
    }

    $scope.logout = function() {
      ref.unauth();
      document.location.href = "login.html";
    }
    
    var authData = ref.getAuth();
    if (authData) {
      init(authData);
    } else {
      clean();
    }
  }]);
})();
