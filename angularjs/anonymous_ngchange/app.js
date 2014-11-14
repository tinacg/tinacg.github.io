(function() {
  angular.module("anonymousFunctionApp", [])

    .controller('AnonymousFunctionController', ['$scope', function($scope) {
      $scope.f = function(arg) {
        $scope.result = arg + arg;
      };

      $scope.g = function(arg) {
        $scope.result = arg.toUpperCase();
      };
    }]);
  
})();
