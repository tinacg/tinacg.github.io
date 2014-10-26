var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", ["$scope", "$firebase", function($scope, $firebase) {
  var ref = new Firebase("https://tinacg.firebaseio.com/angularfire-message");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "data");
  
}]);

