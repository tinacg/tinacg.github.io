(function() {
  var app = angular.module('pianoKeys', [])
    .controller('songController', ['$scope', function($scope) {
      $scope.chords = [
        {'id': 'a',
         'names': 'c e g',
        },

        {'id': 'b',
         'names': 'f a d',
        },
      ];
      $scope.clickedOn = 0;

    }])

  //http://stackoverflow.com/questions/16587961/is-there-already-a-canvas-drawing-directive-for-angularjs-out-there
  
    .directive("piano", function() {
      return {

        // http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive
        scope: {
          notes: '='
        },
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          
          // BEGIN PIANO MAIN FN
          var context = element[0].getContext('2d');

          scope.notes = "";

          var watcher = scope.$watch('notes', function() {
            console.log(scope.notes + 'watched');
            console.log("set internal array of notes");
            console.log("draw piano");
          });

          element.bind('click', function(e) {
            console.log(e.offsetX);
            clickedOn = e.offsetX;
            scope.clickedOn = e.offsetX;
            scope.$apply(function() {
              scope.notes = e.offsetX;
            });
          });
        }
      };
    });
})();
