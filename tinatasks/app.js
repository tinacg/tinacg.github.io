(function() {
  var app = angular.module('tinatasks', ["components", "firebase"]);
  var ref = new Firebase("https://tinacg.firebaseio.com/tinatasks");
  
  app.controller('TaskController', ['$rootScope', '$scope', '$firebase', function($rootScope, $scope, $firebase) {
    function init(authData) {
      // $scope.loginStatus = "Welcome back " + authData.password.email + "! Your token expires " + (new Date(authData.expires * 1000));
      $scope.loggedIn = true;

      $scope.notification = authData.password.email + " token expires " + (new Date(authData.expires * 1000));

      var tabsRef = ref.child(authData.uid).child("tabs");
      var sync = $firebase(tabsRef);
      $scope.tabs = sync.$asArray();
      
      $scope.addTab = function(tabName) {
        $scope.tabs.$add({ name: tabName })
          .then(function() { $scope.refreshTaskRefs(); })
          .then(function() { $scope.notification = "Added tab " + tabName; });
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

          $scope.tasks[tab.name].$loaded().then(function() {
            $scope.refreshAllTasks();
          });
          
        });
      };

      $scope.tabs.$loaded().then(function () {
        $scope.refreshTaskRefs();
        //$rootScope.panes[1].select();
        angular.forEach($scope.tabs, function(tab, tabId) {
          // console.log("populate " + tab.name);
          $scope.populateAllTasks(tab.name);
        });
      });

      $scope.updateTask = function(tasks, task) {
        tasks.$save(task)
          .then(function() { $scope.notification = "Changed task " + task.description; });
      }
      
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
          .then(function() { $scope.notification = "Added " + tabName + "/" + taskDescription; })
          .then(function() { $scope.refreshAllTasks(); });
        
        $scope.taskDone = false;
        $scope.taskDescription = "";
        $scope.taskCategory = "";
        $scope.taskDueDate = "";
        
        $scope.$broadcast("newTaskAdded");
      };

      // tasks[tab.name].$remove(task)
      $scope.removeTask = function(tasks, task) {
        tasks.$remove(task)
          .then(function() { $scope.notification = "Removed task " + task.description; })
          .then(function() { $scope.refreshAllTasks(); });
      };
      
      $scope.deleteTabTasks = function(tabName) {
        tasksRootSync.$remove(tabName)
          .then(function() { $scope.notification = "Deleted tab tasks for " + tabName; })
          .then(function() { $scope.refreshAllTasks(); });
      };

      $scope.removeTab = function(tab) {
        tasksRootSync.$remove(tab.name)
          .then(function() { $scope.tabs.$remove(tab)
                             .then(function() { $scope.notification = "Removed tab " + tab.name; }); })
          .then(function() { $scope.refreshAllTasks(); });
      };

      // ARRAY FOR ALL TASKS

      $scope.allTasks = [];

      $scope.cleanAllTasks = function() {
        $scope.allTasks = [];
      }
      
      $scope.populateAllTasks = function(tabName) {
        angular.forEach($scope.tasks[tabName], function(task) {
          $scope.allTasks.push(task);
        });
      };

      $scope.refreshAllTasks = function() {
        $scope.cleanAllTasks();
        angular.forEach($scope.tabs, function(tab, tabId) {
          $scope.populateAllTasks(tab.name);
        });
      };
      
      
      // TIME AND MOMENT.JS
      
      $scope.getms = function(s) {
        var m = moment(s, "D/M/YY H:mm:ss");
        var result = m.valueOf();
        if (isNaN(result)) {
          result = 0;
        }
        return result;
      };

      $scope.getFormattedDate = function(ms) {
        var result = moment(ms).locale('pt-BR').format('ddd D-MMM-YY H:mm:ss');
        if (result === 'Invalid date') {
          result = 'data invalida';
        }
        if (ms === undefined) {
          result = "";
        }
        return result;
      };

      $scope.getShortDate = function(ms) {
        // var result = moment(ms).locale('pt-BR').format('D-MMM H:mm:ss');
        var result = moment(ms).locale('pt-BR').format('D-MMM');
        return result;
      };

      $scope.parseDate = function(s) {
        if (s === 'soon') {
          return 9999999999000;
        } else if (s.toLowerCase() === 'now') {
          return moment().valueOf();
        } else {
          return moment(s, "D/M/YY H:mm:ss").valueOf();
        }
      };

      $scope.millisToString = function(ms)
      {
        if (ms < 0 || ms > 3159999999000) {
          return "∞";
        }
        var seconds = Math.floor(ms / 1000);
        var numyears = Math.floor(seconds / 31536000);
        var numdays = Math.floor((seconds % 31536000) / 86400); 
        var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
        var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
        var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

        var result = "";

        if (numyears > 0) {
          result += numyears + "y ";
        }
        if (numdays > 0) {
          result += numdays + "d ";
        }
        if (numhours > 0) {
          result += numhours + "h ";
        }
        if (numminutes > 0) {
          result += numminutes + "m ";
        }
        // if (numseconds > 0) {
        //  result += numseconds + "s";
        // }
        return result;
      }

      $scope.momentNow = function() {
        return moment().valueOf();
      };

      $scope.now = $scope.momentNow();
      $scope.nowFull = moment().locale('pt-BR').format();

      $scope.dueDateOrder = function(task) {
        return $scope.parseDate(task.dueDate);
      }

      function numdays(ms) {
        var seconds = Math.floor(ms / 1000);
        var days = Math.floor(seconds / 86400);

        return days;
      }

      function daysSince01(dmyStr) {
        var dmyParts = dmyStr.split("/");
        var day = Number(dmyParts[0]);
        var month = Number(dmyParts[1]);
        var year = Number(dmyParts[2]);

        var leapYearsPassed = Math.floor(year / 4);

        if (year % 4 === 0 && month > 2) {
          leapYearsPassed -= 1;
        }
        
        return leapYearsPassed + (year * 365) + moment(dmyStr, "D/M/YY").dayOfYear();
      }

      // pass moment() now to a function that returns D/M/Y

      $scope.daysDiff = function(then, now) {
        // var nineteenseventy = moment("1/1/1970 0:00:00", "D/M/YYYY H:mm:ss");
        // var then_since1970 = numdays(moment(then, "D/M/YY H:mm:ss").valueOf());
        // var now_since1970 = numdays(moment().valueOf());
        // return Math.max(0, then_since1970 - now_since1970);
        // var result = daysSince01(then.split(" ")[0]) - daysSince01(moment().locale('pt-BR').format("D/M/YY"))
        var result = Math.floor((moment(then.split(" ")[0], "D/M/YY").startOf("day") - moment().startOf("day")) / 86400000);

        var iso_weekday = moment(then.split(" ")[0], "D/M/YY").isoWeekday();
        var diaDaSemana = ['', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

        if (then.toLowerCase() === 'now') {
          result = 0;
          iso_weekday = moment().isoWeekday();
        }

        function parenthesize(s) {
          return "(" + s + ")";
        }

        if (isNaN(result) || result < 0) {
          // result = "";
          return "today (past due)";
        } else {
          if (result === 1) {
            return "in " + result + " day " + parenthesize(diaDaSemana[iso_weekday]);
          } else if (result === 0) {
            return "today " + parenthesize(diaDaSemana[iso_weekday]);
          } else {
            return "in " + result + " days " + parenthesize(diaDaSemana[iso_weekday]);
          }
        }
      };

      // 15 jun 2015 check if due date is today. Used to highlight/bold
      // task description
      $scope.dueToday = function(then, now) {
        return $scope.daysDiff(then, now).indexOf("today") !== -1;
      };

      $scope.dueTomorrow = function(then, now) {
        return $scope.daysDiff(then, now).indexOf("in 1 day") !== -1;
      };

    }

    function clean() {
      $scope.notification = "Please log in";
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
