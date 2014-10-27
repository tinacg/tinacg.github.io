(function() {
  var app = angular.module('appleApp', ["firebase"]);
  var ref = new Firebase("https://tinacg.firebaseio.com/apple-store");

  app.controller('StoreController', ['$scope', '$rootScope', '$firebase', function($scope, $rootScope, $firebase) {
    $scope.products = [];
    $scope.totalSales = 0;

    $rootScope.status = "";
    
    var sync = $firebase(ref);
    
    // $scope.sales = [];
    $rootScope.localUid = 0;
    $rootScope.loginStatus = "";
    
    //    $rootScope.$apply();


    function init(authData) {
      $rootScope.loginStatus = "Welcome " + authData.uid;
      $rootScope.localUid = authData.uid;
      $scope.sales = sync.$asArray();
    }

    function clean() {
      $rootScope.loginStatus = "Please log in";
      $scope.sales = [];
      $rootScope.localUid = 0;
      $scope.totalSales = 0;
    }
    
    ref.onAuth(function(authData) {
      if (authData) {
        init(authData);
      } else {
        clean();
      }
    });
    
    ref.on('child_added', function(childSnapshot) {
      $scope.totalSales += childSnapshot.val().quantity;
    });

    ref.on('child_removed', function(childSnapshot) {
      $scope.totalSales -= childSnapshot.val().quantity;
    });
    
    $scope.addSale = function(saleQuantity, saleType) {
      $scope.sales.$add({ quantity: parseInt(saleQuantity), type: saleType });
      $scope.saleQuantity = "";
      $scope.saleType = "";
    };
    
    $scope.user = {};
    
    $scope.login = function() {
      // firebase login with this.user.email and this.user.password
      ref.authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password,
      }, function (err, authData) {
        if (err === null) {
          // alert("Welcome " + authData.uid);
          init(authData);
        } else {
          // alert("Error logging in");
          $rootScope.localUid = -1;
          $rootScope.loginStatus = "Error logging in";
          $rootScope.$apply();
        }
      });
    };
    
    $scope.logout = function() {
      clean();
      ref.unauth();
      // $rootScope.$apply();
    };
  }]);
})();
