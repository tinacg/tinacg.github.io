(function() {
  var app = angular.module('liveAEvalApp', ["firebase"]);
  var editor = CodeMirror.fromTextArea(document.getElementById("demotext"), {
    lineNumbers: true,
    mode: "text/javascript",
    matchBrackets: true,
    extraKeys: {
      "Ctrl-Enter": function() { (1, eval)(editor.getValue()); $("#resulttext").val(getCommandsResult($("#commands").val())); }
    }
  });

  $("#commands").keydown(function (e) {
    if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
      (1, eval)(editor.getValue());
      $("#resulttext").val(getCommandsResult($("#commands").val()));
    }
  });                        

  var getCommandsResult = function(commands) {
    var result = "";
    var commandsArray = commands.split('\n');
    for (var i = 0; i < commandsArray.length; i++) {
      result += (1, eval)(commandsArray[i]) + "\n";
    }
    return result;
  };
  
  // var ref = new Firebase("https:// ??? .firebaseio.com/liveAEval");

  app.controller('evalController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.myEval = function(code) {
      (1, eval)(editor.getValue());
      $scope.result = getCommandsResult($scope.ngCommands);
      
    };
  }]);
})();
