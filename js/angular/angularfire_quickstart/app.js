var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", ["$scope", "$firebase", function($scope, $firebase) {
  var ref = new Firebase("FIXME add address");

  var sync = $firebase(ref);
  $scope.data = sync.$asObject();
}]);

