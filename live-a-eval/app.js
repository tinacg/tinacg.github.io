var out = function() {
  var params = Array.prototype.slice.call(arguments);
  var paramString = params.join(" ");
  $("#resulttext").val($("#resulttext").val() + "OUT) " + paramString + "\n");
  console.log("OUT) " + paramString);
  return "";
};

(function() {
  var app = angular.module('liveAEvalApp', ["firebase"]);

  function evaluate() {
    (1, eval)(editor.getValue());
    var commandsResult = getCommandsResult($("#commands").val());
    $("#resulttext").val($("#resulttext").val() + commandsResult);
  }
  
  var editor = CodeMirror.fromTextArea(document.getElementById("demotext"), {
    lineNumbers: true,
    mode: "text/javascript",
    matchBrackets: true,
    extraKeys: {
      // "Ctrl-Enter": function() { (1, eval)(editor.getValue()); $("#resulttext").val($("#resulttext").val() + getCommandsResult($("#commands").val())); }
      "Ctrl-Enter": evaluate
    }
  });

  $("#commands").keydown(function (e) {
    if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
      evaluate();
      // (1, eval)(editor.getValue());
      // $("#resulttext").val($("#resulttext").val() + getCommandsResult($("#commands").val()));
    }
  });

  var getCommandsResult = function(commands) {
    if (!commands) {
      return "";
    }
    var result = "";
    // $("#resulttext").val("");
    var commandsArray = commands.split('\n');
    for (var i = 0; i < commandsArray.length; i++) {
      result += (1, eval)(commandsArray[i]) + "\n";
    }
    return result;
  };
  
  var ref = new Firebase("https://tinacg.firebaseio.com/live-a-eval");

  app.controller('evalController', ['$scope', '$firebase', function($scope, $firebase) {
    $scope.myEval = function(code) {
      evaluate();
      // (1, eval)(editor.getValue());
      // $scope.result = getCommandsResult($scope.ngCommands);
      // $("#resulttext").val($("#resulttext").val() + getCommandsResult($("#commands").val()));
    };

    var savedDefsRef = null;
    var savedDefsSync = null;
    $scope.savedDefs = null;

    $scope.currentEntry = "new";
    
    function setupSavedDefsRef(authData) {
      savedDefsRef = ref.child(authData.uid).child("savedDefs");
      savedDefsSync = $firebase(savedDefsRef);
      $scope.savedDefs = savedDefsSync.$asArray();
      // $scope.savedDefs.$add({ name: 'hello' });
    }

    $scope.addEntry = function(title) {
      title = title || "Untitled";
      defs = editor.getValue() || "// no defs";
      commands = $scope.ngCommands || "";
      $scope.savedDefs.$add({ title: title,
                              defs: defs,
                              commands: commands,
                            })
        .then(function() { $scope.infoMessage = "Saved " + title; })
        .then(function() { $scope.currentEntryTitle = title; $scope.saveTitle = ''; })
        .then(function() { $scope.currentEntry = $scope.savedDefs[$scope.savedDefs.length-1].$id });
    };

    $scope.loadEntry = function(id) {
      if (id === 'new') {
        editor.setValue("");
        $scope.ngCommands = "";
        $scope.result = "";
        $scope.currentEntryTitle = "";
      } else {
        var entryRef = savedDefsRef.child(id);
        var entrySync = $firebase(entryRef);
        var entryObj = entrySync.$asObject();

        entryObj.$loaded().then(function() {
          editor.setValue(entryObj.defs);
          $scope.ngCommands = entryObj.commands;
          $scope.currentEntryTitle = entryObj.title;
        });
      }
    };

    $scope.saveCurrent = function(id) {
      if (id === 'new') {
        $scope.infoMessage = "Cannot save into New, use Add new";
      } else {
        var entryRef = savedDefsRef.child(id);
        var entrySync = $firebase(entryRef);

        entrySync.$set({
          title: $scope.currentEntryTitle,
          defs: editor.getValue(),
          commands: $scope.ngCommands,
        })
          .then($scope.infoMessage = "Saved existing " + $scope.currentEntryTitle);
      }
    };

    $scope.removeCurrent = function(id) {
      if (id === 'new') {
        return 0;
      }
      var entryRef = savedDefsRef.child(id);
      var entrySync = $firebase(entryRef);
      entrySync.$remove();
      $scope.ngCommands = "";
      editor.setValue("");
      $scope.currentEntry = "new";
    }

    // USER MANAGEMENT    
    function checkLogin() {
      var authData = ref.getAuth();
      if (authData) {
        $scope.infoMessage = "Welcome back " + authData.password.email;
        $scope.loggedIn = true;
        setupSavedDefsRef(authData);
      } else {
        $scope.infoMessage = "Please log in.";
        $scope.loggedIn = false;
      }
    }

    $scope.logout = function() {
      ref.unauth();
      checkLogin();
    }

    $scope.tryLogin = function(email, pass) {
      ref.authWithPassword({
        email: email,
        password: pass,
      }, function(err, authData) {
        if (err === null) {
          checkLogin();
          $scope.$apply();
        } else {
          $scope.infoMessage = err;
          // clean refs and array
          $scope.$apply();
        }
      }); //.then(function() { checkLogin(); });
    };

    checkLogin();
  }]);
})();
