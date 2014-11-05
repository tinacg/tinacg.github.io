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

      // CALCULACOES
      var computedRef = ref.child("computed");
      $scope.computedSync = $firebase(computedRef);
      $scope.computed = $scope.computedSync.$asObject();


      // CLIENTES
      var clientesRef = ref.child("clientes");
      $scope.clientesSync = $firebase(clientesRef);
      $scope.clientesObj = $scope.clientesSync.$asObject();
      $scope.clientes = $scope.clientesSync.$asArray();

      $scope.setCliente = function(codigo, nome, vendedor) {
        if (vendedor === undefined) {
          vendedor = "";
        }
        $scope.clientesSync.$set(codigo, { codigo: codigo, nome: nome, idVendedor: vendedor });
      };

      // VENDEDORES
      var vendedoresRef = ref.child("vendedores");
      $scope.vendedoresSync = $firebase(vendedoresRef);
      $scope.vendedoresObj = $scope.vendedoresSync.$asObject();
      $scope.vendedores = $scope.vendedoresSync.$asArray();

      $scope.setVendedor = function(id, nome) {
        $scope.vendedoresSync.$set(id, { id: id, nome: nome });
      };
      
      
      // PEDIDOS
      var pedidosRef = ref.child("pedidos");
      $scope.pedidosSync = $firebase(pedidosRef);
      $scope.pedidos = $scope.pedidosSync.$asArray();

      $scope.computePedidosTotal = function(pedidosArray) {
        var total = 0;
        angular.forEach(pedidosArray, function(value, key) {
          total += parseInt(value.quantidade);
        });
        if (isNaN(total)) {
          total = "";
        }
        $scope.computed.pedidosTotal = total;
        $scope.computed.$save();
      };

      $scope.pedidos.$loaded().then(function () {
        $scope.computePedidosTotal($scope.pedidos);
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
