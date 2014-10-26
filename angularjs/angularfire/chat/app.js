var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://tinacg.firebaseio.com/firebase-chat");

  var authData = ref.getAuth();

  if (authData) {
    $scope.status = "Welcome back " + authData.uid;
  } else {
    $scope.status = "Please login to post";
  }
  
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();

  $scope.addMessage = function(text) {
    $scope.messages.$add({ text: text });
  }
});
