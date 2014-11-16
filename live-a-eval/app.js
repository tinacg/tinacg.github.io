(function() {
  var app = angular.module('liveAEvalApp', ["firebase"]);
  var editor = CodeMirror.fromTextArea(document.getElementById("demotext"), {
    lineNumbers: true,
    mode: "text/javascript",
    matchBrackets: true
  });

  // var ref = new Firebase("https:// ??? .firebaseio.com/liveAEval");

  app.controller('evalController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.myEval = function(code) {
      $scope.result = eval(editor.getValue());
    };
  }]);
})();
