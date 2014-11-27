(function() {
  var app = angular.module('pianoKeys', [])
    .controller('songController', ['$scope', function($scope) {
      $scope.chords = [
        {'id': 'a',
         'names': 'c e g',
         'notes': '1 3 5',
        },

        {'id': 'b',
         'names': 'f a d',
         'notes': '2 8 5',
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

          var keys = [];
          var numKeys = 48;

          for (var i = 0; i < numKeys; i++) {
            keys.push(new Key(i));
          }

          drawPiano(keys, context);
          
          scope.notes = "";

          scope.$watch('notes', function() {
            for (var i = 0; i < numKeys; i++) {
              keys[i].selected = false;
            }

            if (scope.notes) {
              var notesArray = scope.notes.split(" ");
              try {
                notesArray.forEach(function(note) {
                  keys[parseInt(note)].selected = true;
                });
              } catch (ex) {
                console.log(ex);
              }
            }
              
            drawPiano(keys, context);
          });

          element.bind('click', function(e) {
            var x = e.offsetX;
            var y = e.offsetY;

            var keysSelected = "";
            
            keys.forEach(function(key) {
              // blacks
              if (y > key.top && y < key.top + key.blackHeight && key.isBlack && 
                  x > key.left && x < key.left + key.width) {
                key.selected = !key.selected;
              } else if (y > key.top + key.blackHeight && y < key.top + key.height && x > key.left && x < key.left + key.width) {
                key.selected = !key.selected;
              }

              if (key.selected) {
                keysSelected += key.index + " ";
              }
            });

            scope.notes = keysSelected.slice(0, keysSelected.length-1);
            scope.$apply();

            drawPiano(keys, context);

            /*
            console.log(e.offsetX);
            clickedOn = e.offsetX;
            scope.clickedOn = e.offsetX;
            scope.$apply(function() {
              scope.notes = e.offsetX;
            });
            */
          });
        }
      };
    });
})();
