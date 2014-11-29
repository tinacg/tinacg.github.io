(function() {
  var app = angular.module('pianoKeys', [])
    .controller('songController', ['$scope', function($scope) {
      $scope.chords = [
        {
          'notes': '5 17 21 24 27',
        },

        {
          'notes': '5 10 11 21 23',
        },

        {
          'notes': '12 16 19',
        },
      ];

      $scope.transpose = function(steps) {
        $scope.chords.forEach(function(chord) {
          var newNotes = "";
          chord.notes.split(" ").forEach(function(note) {
            var noteNum = parseInt(note);
            if (noteNum > 0) {
              newNotes += (parseInt(note) + steps) + " ";
            }
          });
          chord.notes = newNotes.slice(0, newNotes.length-1);
        });
      };

      $scope.addChord = function(index) {
        $scope.chords.splice(index + 1, 0, { 'notes': '' });
      };

      $scope.chordAppend = function(obj) {
        $scope.chords.push(obj);
      };

      $scope.focusInControl = {};
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
          });
        }
      };
    })

    .directive("staff", function() {
      return {
        scope: {
          chords: '=',
          control: '='
        },
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          var currentKey = 'C';  // add to scope '='
          
          var context = element[0].getContext('2d');

          scope.$watch('chords', function() {
            drawStaff(currentKey, scope.chords, context);
            // redraw staff
          }, true);

          drawStaff(currentKey, scope.chords, context);

          // http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive
          scope.internalControl = scope.control || {};
          scope.internalControl.extendCanvas = function(width) {
            context.canvas.width += width;
            drawStaff(currentKey, scope.chords, context);
          };
        }
      }
    });
})();
