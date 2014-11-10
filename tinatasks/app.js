(function() {
  var app = angular.module('tinatasks', ["components", "firebase"]);
  var ref = new Firebase("https://tinacg.firebaseio.com/tinatasks");
  
  app.controller('TaskController', ['$rootScope', '$scope', '$firebase', function($rootScope, $scope, $firebase) {
    function init(authData) {
      $scope.loginStatus = "Welcome back " + authData.password.email + "! Your token expires " + (new Date(authData.expires * 1000));
      $scope.loggedIn = true;

      $scope.notification = "Waiting for new task.";

      var tabsRef = ref.child(authData.uid).child("tabs");
      var sync = $firebase(tabsRef);
      $scope.tabs = sync.$asArray();
      
      $scope.addTab = function(tabName) {
        $scope.tabs.$add({ name: tabName })
          .then(function() { $scope.refreshTaskRefs(); });
      };

      var tasksRef = [];
      var tasksSync = [];
      $scope.tasks = [];

      var tasksRootRef = ref.child(authData.uid).child("tasks");
      var tasksRootSync = $firebase(tasksRootRef);
      $scope.tasksRoot = tasksRootSync.$asObject();
      
      $scope.refreshTaskRefs = function() {
        angular.forEach($scope.tabs, function(tab, tabId) {
          tasksRef[tab.name] = ref.child(authData.uid).child("tasks").child(tab.name);
          tasksSync[tab.name] = $firebase(tasksRef[tab.name]);
          $scope.tasks[tab.name] = tasksSync[tab.name].$asArray();
        });
      };

      $scope.tabs.$loaded().then(function () {
        $scope.refreshTaskRefs();
        //$rootScope.panes[1].select();
      });
      
      $scope.addTask = function(tabName, taskDone, taskDescription, taskCategory, taskDueDate) {
        taskDescription = taskDescription || "My Task";
        taskCategory = taskCategory || "~uncategorized";
        taskDueDate = taskDueDate || "soon";
        
        $scope.tasks[tabName].$add({ done: taskDone,
                                     description: taskDescription,
                                     category: taskCategory,
                                     createDate: (new Date()).getTime(),
                                     dueDate: taskDueDate,
                                   })
          .then(function() { $scope.notification = "Added " + tabName + "/" + taskDescription; });
        $scope.taskDone = false;
        $scope.taskDescription = "";
        $scope.taskCategory = "";
        $scope.taskDueDate = "";
        
        $scope.$broadcast("newTaskAdded");
      };

      $scope.deleteTabTasks = function(tabName) {
        tasksRootSync.$remove(tabName);
      };
    }

    function clean() {
      $scope.loginStatus = "Please log in";
      $scope.tabs = [];
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
