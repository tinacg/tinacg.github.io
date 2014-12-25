// BUG: Saving an entry does not select it in the dropdown

var out = function() {
  var params = Array.prototype.slice.call(arguments);
  var paramString = params.join(" ");
  $("#resulttext").val($("#resulttext").val() + paramString + "\n");
  console.log("OUT) " + paramString);
  return "";
};


(function() {
  var app = angular.module('liveAEvalApp', []);

  function evaluate() {
    (1, eval)(editor.getValue());
    var commandsResult = getCommandsResult($("#commands").val());
    $("#resulttext").val($("#resulttext").val() + commandsResult);
    var resulttext = document.getElementById("resulttext");
    resulttext.scrollTop = resulttext.scrollHeight;
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
      //(1, eval)(editor.getValue());
      //$("#resulttext").val($("#resulttext").val() + getCommandsResult($("#commands").val()));
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
  
  app.controller('evalController', ['$scope', function($scope) {
    $scope.myEval = function(code) {
      evaluate();
      //(1, eval)(editor.getValue());
      // $scope.result = getCommandsResult($scope.ngCommands);
      //$("#resulttext").val($("#resulttext").val() + getCommandsResult($("#commands").val()));
    };

    var savedDefsRef = null;
    var savedDefsSync = null;
    // $scope.savedDefs = null;
    $scope.savedDefs = [];
    if (typeof localStorage.getItem("lae_list") !== 'string') {
      localStorage.setItem("lae_list", "");
    }
    var lae_list_str = localStorage.getItem('lae_list');
    var titleList = [];
    if (lae_list_str.length > 0) {
      var titleList = localStorage.getItem("lae_list").split(",");
    }
      
    titleList.forEach(function(title) {
      $scope.savedDefs.push({title: title,
                             defs: localStorage.getItem("lae_defs_" + title),
                             commands: localStorage.getItem("lae_commands_" + title)});    
    });
    
    $scope.currentEntry = "new";

    
    //function setupSavedDefsRef(authData) {
     // savedDefsRef = ref.child(authData.uid).child("savedDefs");
      //savedDefsSync = $firebase(savedDefsRef);
      // $scope.savedDefs = savedDefsSync.$asArray();
     // $scope.savedDefs = null;
      // $scope.savedDefs.$add({ name: 'hello' });
    // }

    function setEntry(title, defs, commands) {
      localStorage.setItem("lae_defs_" + title, defs);
      localStorage.setItem("lae_commands_" + title, commands);
    }
    
    $scope.addEntry = function(title) {
      if (typeof title === 'string' && title !== "" && titleList.indexOf(title) === -1) {
        //title = title || "Untitled";
        defs = editor.getValue() || "// no defs";
        commands = $scope.ngCommands || "";
        titleList.push(title);
        $scope.savedDefs.push({title: title,
                               defs: defs,
                               commands: commands});
        localStorage.setItem("lae_list", titleList.toString());
        setEntry(title, defs, commands);
        $scope.infoMessage = "Saved " + title;
        // $scope.currentEntryTitle = title;
        // $scope.saveTitle = title;
        // $scope.$apply();
          //$scope.currentEntry = title;
	  
	    setTimeout(function() {
	      // console.log($scope.savedDefs[$scope.savedDefs.length-1].title);
	      $scope.currentEntry = $scope.savedDefs[$scope.savedDefs.length-1].title;
	      $scope.$apply();
	    }, 100);
      } else {
        $scope.infoMessage = "Cannot overwrite, save empty or New";
      }
      //$scope.savedDefs.$add({ title: title,
        //                      defs: defs,
          //                    commands: commands,
            //                })
      //.then(function() { $scope.currentEntryTitle = title; $scope.saveTitle = ''; })
      //.then(function() { $scope.currentEntry = $scope.savedDefs[$scope.savedDefs.length-1].$id });
    };

    $scope.loadEntry = function(title) {
      if (title === 'new') {
        editor.setValue("");
        $scope.ngCommands = "";
        $scope.result = "";
        $scope.currentEntryTitle = "";
        $scope.saveTitle = "";
        $scope.infoMessage = "Starting new entry";
      } else {
        //var entryRef = savedDefsRef.child(id);
        //var entrySync = $firebase(entryRef);
        //var entryObj = entrySync.$asObject();

        var entryObj = {title: title,
                    defs: localStorage.getItem("lae_defs_" + title),
                    commands: localStorage.getItem("lae_commands_" + title),
                   };
        //  entryObj.$loaded().then(function() {
        editor.setValue(entryObj.defs);
        $scope.ngCommands = entryObj.commands;
        $scope.currentEntryTitle = entryObj.title;
        $scope.saveTitle = "";
        $scope.infoMessage = "Loaded " + $scope.currentEntryTitle;
        //});
      }
    };

    $scope.saveCurrent = function(title) {
      if (title === 'new' || title.trim() === '') {
        $scope.infoMessage = "Cannot overwrite, save empty or New";
      } else {
//        var entryRef = savedDefsRef.child(id);
  //      var entrySync = $firebase(entryRef);

    //    entrySync.$set({
        var title = $scope.currentEntryTitle;
        var defs = editor.getValue();
        var commands = $scope.ngCommands;
        //})
        $scope.infoMessage = "Saved existing " + $scope.currentEntryTitle;
        setEntry(title, defs, commands);
      }
    };

    $scope.removeCurrent = function(title) {
      if (title === 'new') {
        return 0;
      }
//      var entryRef = savedDefsRef.child(id);
  //    var entrySync = $firebase(entryRef);
      //  entrySync.$remove();
      var titleIndex = titleList.indexOf(title);
      titleList.splice(titleIndex, 1);
      localStorage.setItem("lae_list", titleList);
      $scope.savedDefs.splice(titleIndex, 1);

      // remove from localStorage
      localStorage.removeItem("lae_defs_" + title);
      localStorage.removeItem("lae_commands_" + title);
      
      $scope.ngCommands = "";
      editor.setValue("");
      $scope.currentEntry = "new";

      
    }

  }]);
})();
