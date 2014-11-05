(function() {
  var app = angular.module('aguardando', ['components', 'firebase']);
  var ref = new Firebase("https://faia.firebaseio.com/aguardando");

  app.controller("OrganizationController", ['$scope', '$firebase', function($scope, $firebase) {
    function init(authData) {
      $scope.loginStatus = "Login: " + authData.password.email + " Vencimento " + (new Date(authData.expires * 1000));
      $scope.loggedIn = true;

      $scope.notify = function(message) {
        $scope.notification = message;
      };

      $scope.DEBUG = true;

      $scope.aguardando = $firebase(ref).$asObject();
      
      $scope.setCliente = function(codigo, nome) {
        $scope.clientesSync.$set(codigo, { codigo: codigo, nome: nome });
      };

      $scope.computePedidosTotal = function(pedidosArray) {
        var total = 0;
        angular.forEach(pedidosArray, function(value, key) {
          total += parseInt(value.quantidade);
        });
        if (isNaN(total)) {
          total = "";
        }
        $scope.computedObj.pedidosTotal = total;
        $scope.aguardando.$update("computed", { pedidosTotal: total });
      };

      $scope.aguardando.$loaded().then(function () {
        $scope.computedObj = $scope.aguardando.computed;
        $scope.clientes = $scope.aguardando.clientes;
        $scope.pedidos = $scope.aguardando.pedidos;

        $scope.computePedidosTotal($scope.aguardando.pedidos);
      });

      $scope.addPedido = function(pedido_codigoCliente, quantidade) {
        $scope.pedidos.$add({ codigoCliente: pedido_codigoCliente,
                              quantidade: quantidade })
          .then($scope.notify("Adicionado pedido " + pedido_codigoCliente + " " + quantidade + "pçs"))
          .then(function() { $scope.computePedidosTotal($scope.pedidos); });
      };

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
