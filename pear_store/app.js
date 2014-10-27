(function() {
  var app = angular.module("pearApp", ["firebase"]);
  var ref = new Firebase("https://tinacg.firebaseio.com/pear-store");

  var salesRef = new Firebase("https://tinacg.firebaseio.com/pear-store/sales");
  
  app.controller("StoreController", ['$scope', '$firebase', function($scope, $firebase) {
    $scope.totalSales = 0;

    $scope.codigoTotals = {};
    
    var sync = $firebase(salesRef);
    
    function init(authData) {
      $scope.loginStatus = "Welcome " + authData.uid;
      $scope.sales = sync.$asArray();
      $scope.loggedIn = true;
      $scope.userId = authData.uid;
      
      salesRef.on('child_added', function(childSnapshot) {
        var sale = childSnapshot.val();
        $scope.totalSales += sale.quantity;
        if ($scope.codigoTotals.hasOwnProperty(sale.type)) {
          $scope.codigoTotals[sale.type] += sale.quantity;
        } else {
          $scope.codigoTotals[sale.type] = sale.quantity;
        }
      });

      salesRef.on('child_removed', function(childSnapshot) {
        var sale = childSnapshot.val();
        $scope.totalSales -= sale.quantity;
        $scope.codigoTotals[sale.type] -= sale.quantity;        
      });

      $scope.addSale = function(saleClientId, saleQuantity, saleType) {
        $scope.sales.$add({ clientId: saleClientId, quantity: parseInt(saleQuantity), type: saleType, userId: $scope.userId });
        $scope.saleClientId = "";
        $scope.saleQuantity = "";
        $scope.saleType = "";

        $scope.$broadcast("newSaleAdded");
      };

      
    }

    function clean() {
      $scope.loginStatus = "Please log in";
      $scope.sales = [];
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

  app.directive('focusOn', function() {
    return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
        elem[0].focus();
      });
    };
  });
})();
