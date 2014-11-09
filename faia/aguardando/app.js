(function() {
  var app = angular.module('aguardando', ['components', 'firebase', 'ui.bootstrap']);
  var ref = new Firebase("https://faia.firebaseio.com/aguardando");

  function formSetEditable(formId, state) {
    var form = document.getElementById(formId);
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; i++) {
      elements[i].disabled = !state;
    }
  }
  
  app.controller("OrganizationController", ['$scope', '$firebase', '$modal', function($scope, $firebase, $modal) {
    function init(authData) {
      $scope.loginStatus = "Login válido até " + (new Date(authData.expires * 1000));
      $scope.loggedIn = true;
      $scope.operatorEmail = authData.password.email;

      $scope.notification = " ";

      $scope.alertarResultado = function(message) {
        $scope.alterarSenhaResultado = message;
        $scope.$apply();
      };
      
      $scope.DEBUG = true;
      $scope.isAdmin = false;

      // CHECK ADMIN STATUS
      var administradoresRef = ref.child("administradores");
      $scope.administradoresSync = $firebase(administradoresRef);
      $scope.administradores = $scope.administradoresSync.$asObject();

      $scope.administradores.$loaded().then(function() {
        if ($scope.administradores[authData.uid] === 1) {
          $scope.isAdmin = true
        }
      });
      
      // CALCULACOES
      var computedRef = ref.child("computed");
      $scope.computedSync = $firebase(computedRef);
      $scope.computed = $scope.computedSync.$asObject();

      // END CALCULACOES

      // CLIENTES
      var clientesRef = ref.child("clientes");
      $scope.clientesSync = $firebase(clientesRef);
      $scope.clientesObj = $scope.clientesSync.$asObject();
      $scope.clientes = $scope.clientesSync.$asArray();
      $scope.clienteOrder = "nome";

      $scope.items = ['item1', 'item2'];

      $scope.setCliente = function(codigo, nome, vendedor) {
        if (vendedor === undefined) {
          vendedor = "";
        }
        $scope.clientesSync.$set(codigo, { codigo: parseInt(codigo), nome: nome, idVendedor: vendedor }).then($scope.$broadcast("newClienteAdded"));
      };

      $scope.editClienteOpen = function(cliente) {
        var modalInstance = $modal.open({
          templateUrl: 'myClienteModalContent.html',
          controller: 'EditClienteModalCtrl',
          size: 'lg',
          resolve: {
            items: function() {
              return $scope.items;
            },
            codigo: function() {
              return cliente.codigo;
            },
            clienteNome: function() {
              return cliente.nome;
            },
            idVendedor: function() {
              return cliente.idVendedor;
            },
            vendedores: function() {
              return $scope.vendedores;
            },
          }
        });

        modalInstance.result.then(function(selected) {
          $scope.setCliente(cliente.codigo, selected.nome, selected.idVendedor);
        }, function() {
          // do nothing
        });
      };  // END CLIENTES
      
      

      // PRODUTOS
      var produtosRef = ref.child("produtos");
      $scope.produtosSync = $firebase(produtosRef);
      $scope.produtosObj = $scope.produtosSync.$asObject();
      $scope.produtos = $scope.produtosSync.$asArray();
      $scope.produtoOrder = "nome";

      $scope.setProduto = function(codigo, nome, qtdePorCaixa, sobrando, chegando, containers) {
        nome = nome || "";
        qtdePorCaixa = qtdePorCaixa || 0;
        sobrando = sobrando || 0;
        chegando = chegando || 0;
        containers = containers || '';
        
        $scope.produtosSync.$set(codigo.toUpperCase(),
                                 { codigo: codigo.toUpperCase(),
                                   nome: nome,
                                   qtdePorCaixa: parseInt(qtdePorCaixa),
                                   sobrando: parseInt(sobrando),
                                   chegando: parseInt(chegando),
                                   containers: containers,
                                 })                      
          .then($scope.$broadcast("newProdutoAdded"))
          .then(function() { $scope.computeSobrandoChegando(codigo.toUpperCase()); });
      };

      $scope.updateProduto = function(codigo, nome, qtdePorCaixa, sobrando, chegando, containers) {
        nome = nome || "";
        qtdePorCaixa = qtdePorCaixa || 0;
        sobrando = sobrando || 0;
        chegando = chegando || 0;
        containers = containers || '';
        
        $scope.produtosSync.$set(codigo.toUpperCase(),
                                 { codigo: codigo.toUpperCase(),
                                   nome: nome,
                                   qtdePorCaixa: parseInt(qtdePorCaixa),
                                   sobrando: parseInt(sobrando),
                                   chegando: parseInt(chegando),
                                   containers: containers,
                                 })                      
          .then($scope.$broadcast("newProdutoAdded"))
      };

      $scope.editProdutoOpen = function(produto) {
        var modalInstance = $modal.open({
          templateUrl: 'myProdutoModalContent.html',
          controller: 'EditProdutoModalCtrl',
          size: 'lg',
          resolve: {
            items: function() {
              return $scope.items;
            },
            codigo: function() {
              return produto.codigo;
            },
            produtoNome: function() {
              return produto.nome;
            },
            produtoQtdePorCaixa: function() {
              return produto.qtdePorCaixa;
            },
          }
        });

        modalInstance.result.then(function(selected) {
          $scope.setProduto(produto.codigo, selected.nome, selected.qtdePorCaixa);
        }, function() {
          // do nothing
        });
      };  // END PRODUTOS
      

      // PEDIDOS
      var pedidosRef = ref.child("pedidos");
      $scope.pedidosSync = $firebase(pedidosRef);
      $scope.pedidos = $scope.pedidosSync.$asArray();

      $scope.pedidoEstadoOrder = function(pedido) {
        switch (pedido.estado) {
        case 'Reserva': return 1;
        case 'Desistencia': return 2;
        case 'Container': return 3;
        case 'Desistencia do Container': return 4;
        case 'Faturado': return 5;
        case 'Cancelado': return 6;
        default: return 99;
        }
      };

      /*
      $scope.pedidoEstadoOpcoes = [
        { name: 'Desistencia',
          value: 'Desistencia'
        },
        { name: 'Reserva',
          value: 'Reserva'
        },
        { name: 'Container',
          value: 'Container'
        },
        { name: 'Desistencia do Container',
          value: 'Desistencia do Container'
        },
        { name: 'Faturado',
          value: 'Faturado'
        },
        { name: 'Cancelado',
          value: 'Cancelado'
        },
      ];
      */

      $scope.pedidoEstadoOpcoes = [
        'Desistencia',
        'Reserva',
        'Container',
        'Desistencia do Container',
        'Faturado',
        'Cancelado',
      ];
      
      $scope.computePedidosTotal = function(pedidosArray) {
        var total = 0;

        /*
          angular.forEach(pedidosArray, function(value, key) {
          total += parseInt(value.quantidade);
          });
          if (isNaN(total)) {
          total = "";
          }
        */
        
        $scope.computed.pedidosTotal = total;
        $scope.computed.$save();
      };

      $scope.pedidos.$loaded().then(function() {
        $scope.computePedidosTotal($scope.pedidos);
      });

      $scope.addPedido = function(pedido_codigoProduto, pedido_qtdePedida, pedido_qtdeJaSeparada, pedido_codigoCliente, pedido_estado, pedido_obs) {
        pedido_obs = pedido_obs || "";
        pedido_qtdePedida = pedido_qtdePedida || 0;
        pedido_qtdeJaSeparada = pedido_qtdeJaSeparada || 0;
        pedido_estado = pedido_estado || "Reserva";
        
        $scope.pedidos.$add({ codigoProduto: pedido_codigoProduto,
                              qtdePedida: parseInt(pedido_qtdePedida),
                              qtdeJaSeparada: parseInt(pedido_qtdeJaSeparada),
                              codigoCliente: parseInt(pedido_codigoCliente),
                              estado: pedido_estado,
                              obs: pedido_obs,
                              dataCriadaNum: (new Date()).getTime(),
                              dataCriada: (new Date()).format("weekdayTime"),
                              dataAtualizada: (new Date()).format("weekdayTime"),
                            })
          .then(function() { $scope.notification = "Adicionado pedido " + pedido_codigoCliente + " " + pedido_qtdePedida + "pçs"; })
          .then(function() { $scope.computeSobrandoChegando(pedido_codigoProduto); })
          .then($scope.$broadcast("newPedidoAdded"));
      };  // END PEDIDOS


      // CHEGANDO
      var chegandosRef = ref.child("chegandos");
      $scope.chegandosSync = $firebase(chegandosRef);
      $scope.chegandos = $scope.chegandosSync.$asArray();

      $scope.addChegando = function(chegando_codigoProduto, quantidade, container) {
        quantidade = quantidade || 0;
        container = container || "";
        
        $scope.chegandos.$add({ codigoProduto: chegando_codigoProduto,
                                quantidade: parseInt(quantidade),
                                container: container })
          .then(function() { $scope.notification = "Adicionado chegando " + chegando_codigoProduto + " " + quantidade + "pçs"; })
          .then(function() { $scope.computeSobrandoChegando(chegando_codigoProduto); })
          .then($scope.$broadcast("newChegandoAdded"));
      };  // END CHEGANDO
      
      
      // VENDEDORES
      var vendedoresRef = ref.child("vendedores");
      $scope.vendedoresSync = $firebase(vendedoresRef);
      $scope.vendedoresObj = $scope.vendedoresSync.$asObject();
      $scope.vendedores = $scope.vendedoresSync.$asArray();

      $scope.setVendedor = function(id, nome) {
        $scope.vendedoresSync.$set(id, { id: id, nome: nome });
      };  // END VENDEDORES

      // MINHA CONTA
      $scope.alterarSenha = function(oldPassword, newPassword) {
        formSetEditable("senhaForm", false);
        ref.changePassword({
          email: $scope.operatorEmail,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }, function(error) {
          if (error === null) {
            $scope.alertarResultado("Senha alterada com sucesso.");
            formSetEditable("senhaForm", true);
          } else {
            $scope.alertarResultado("Houve um erro na ateração de senha: " + error);
            formSetEditable("senhaForm", true);
          }
        });
      };

      // CALCULACOES
      $scope.computeSobrandoChegando = function(codigo) {
        codigo = codigo.toUpperCase();
        var chegandoTotal = 0;
        var containers = [];
        angular.forEach($scope.chegandos, function(chegando, pushId) {
          if (chegando.codigoProduto === codigo) {
            chegandoTotal += parseInt(chegando.quantidade);
            if (containers.indexOf(chegando.container) === -1) {
              containers.push(chegando.container);
            }
          }
        });
        if (isNaN(chegandoTotal)) {
          chegandoTotal = 0;
        }

        containers = containers.sort().join(", ");

        var sobrando = chegandoTotal;

        angular.forEach($scope.pedidos, function(pedido, pushId) {
          if (pedido.codigoProduto.toUpperCase() === codigo && pedido.estado === 'Container') {
            sobrando -= (pedido.qtdePedida - pedido.qtdeJaSeparada);
          }
        });

        if (sobrando < 0) {
          sobrando = 0;
        }
        
        $scope.updateProduto(codigo,
                             $scope.produtosObj[codigo].nome,
                             $scope.produtosObj[codigo].qtdePorCaixa,
                             sobrando,
                             chegandoTotal,
                             containers);
      };

      
    }  // END init()

    function clean() {
      $scope.loginStatus = "Por favor fazer login";
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

  app.controller('EditClienteModalCtrl', function($scope, $modalInstance, items, clienteNome, idVendedor, codigo, vendedores) {
    $scope.items = items;
    $scope.vendedores = vendedores;
    $scope.selected = {
      item: $scope.items[0],
      codigo: codigo,
      nome: clienteNome,
      idVendedor: idVendedor,
    };
    $scope.ok = function() {
      $modalInstance.close($scope.selected);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('Cancelar');
    };
  });  // END EDIT CLIENTE MODAL

  app.controller('EditProdutoModalCtrl', function($scope, $modalInstance, items, produtoNome, codigo, produtoQtdePorCaixa) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0],
      codigo: codigo,
      nome: produtoNome,
      qtdePorCaixa: produtoQtdePorCaixa,
    };
    $scope.ok = function() {
      $modalInstance.close($scope.selected);
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('Cancelar');
    };
  });  // END EDIT PRODUTO MODAL

  app.directive("focusOn", function() {
    return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
        elem[0].focus();
      });
    };
  });
  
})();
