(function() {
  var app = angular.module('tinatasks', ["firebase"]);
  var ref = new Firebase("https://tinacg.firebaseio.com/tinatasks");
  
  app.controller('TaskController', ['$scope', '$firebase', function($scope, $firebase) {
    function init(authData) {
      $scope.loginStatus = "Welcome back " + authData.password.email + "!";
      $scope.loggedIn = true;

      var tasksRef = ref.child(authData.uid);
      
      // until new security rules are placed, there is nothing preventing
      // an user from overwriting another user's data or reading them.

      var sync = $firebase(tasksRef);
      $scope.tasks = sync.$asArray();

      $scope.addTask = function(taskDone, taskDescription, taskCategory, taskDueDate) {
        taskDescription = taskDescription || "My Task";
        taskCategory = taskCategory || "~uncategorized";
        taskDueDate = taskDueDate || "asap";
        
        $scope.tasks.$add({ done: taskDone,
                            description: taskDescription,
                            category: taskCategory,
                            createDate: (new Date()).getTime(),
                            dueDate: taskDueDate,
                          });
        $scope.taskDone = false;
        $scope.taskDescription = "";
        $scope.taskCategory = "";
        $scope.taskDueDate = "";

        $scope.$broadcast("newTaskAdded");
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

  app.directive("focusOn", function() {
    return function(scope, elem, attr) {
      scope.$on(attr.focusOn, function(e) {
        elem[0].focus();
      });
    };
  });
})();
