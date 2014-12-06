(function() {
  function toggleArrayItem(array, value) {
    var i = array.indexOf(value);
    if (i === -1)
      array.push(value);
    else
      array.splice(i,1);
  }

  function toggleNote(notes, note) {
    var noteArray = notes.trim().split(" ");
    toggleArrayItem(noteArray, note);
    return noteArray.join(" ");
  }
  
  var app = angular.module('pianoKeys', ["tabs"])
    .controller('songController', ['$scope', function($scope) {
      $scope.chords = [
        {
          'notes': '24',
        },

        {
          'notes': '28',
        },

        {
          'notes': '31',
        },
      ];

      $scope.scale = [
        {'notes': '24'}, {'notes': '25'}, {'notes': '26'},
        {'notes': '27'}, {'notes': '28'}, {'notes': '29'},
        {'notes': '30'}, {'notes': '31'}, {'notes': '32'},
        {'notes': '33'}, {'notes': '34'}, {'notes': '35'},
      ];

      $scope.currentScaleOctave = 3;
      
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

      $scope.moveScaleOctave = function(amount) {
        if ($scope.currentScaleOctave + amount > 0 && $scope.currentScaleOctave + amount < 5) {
          console.log("move scale " + amount);
          $scope.scale.forEach(function(scaleNote) {
            scaleNote.notes = parseInt(scaleNote.notes) + (12 * amount);
            scaleNote.notes = scaleNote.notes.toString();
          });
          $scope.currentScaleOctave += amount;
        }
      };

      $scope.addChord = function(index) {
        $scope.chords.splice(index + 1, 0, {'notes': ''});
      };

      $scope.addChordAtEnd = function() {
        $scope.chords.push({'notes': ''});
      };

      $scope.chordAppend = function(obj) {
        $scope.chords.push(obj);
      };

      $scope.focusInControl = {};

      $scope.selectedChord = 0;

      $scope.selectChord = function(index) {
        $scope.selectedChord = index;
      };
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
              var notesArray = scope.notes.trim().split(" ");
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
          selectedChord: '=',
          control: '='
        },
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          var currentKey = 'A';  // add to scope '='
          
          var context = element[0].getContext('2d');

          scope.$watch('chords', function() {
            drawStaff(currentKey, scope.selectedChord, scope.chords, context);
            // redraw staff
          }, true);

          scope.$watch('selectedChord', function() {
            // console.log("watching selected Chord " + scope.selectedChord);
            drawStaff(currentKey, scope.selectedChord, scope.chords, context);
          }, true);

          drawStaff(currentKey, scope.selectedChord, scope.chords, context);

          // http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive
          scope.internalControl = scope.control || {};
          scope.internalControl.extendCanvas = function(width) {
            context.canvas.width += width;
            drawStaff(currentKey, scope.selectedChord, scope.chords, context);
          };

          element.bind('click', function(e) {
            var x = e.offsetX;
            var y = e.offsetY;

            console.log("global click " + x + ", " + y);
            
            var staffConstants = new Staff();
            var leftBuffer = -4;

            if (y > staffConstants.topMargin && y < staffConstants.topMargin + (13 * staffConstants.lineSpacing)) {
              var newSongIndex = Math.floor(((x - staffConstants.leftMargin - leftBuffer) / staffConstants.sectionWidth));
              scope.selectedChord = newSongIndex;
              scope.$apply();
            }
            
            /*
              scope.chords[scope.selectedChord].notes += " " + x;
              scope.chords[scope.selectedChord].notes = scope.chords[scope.selectedChord].notes.trim();
              scope.$apply();
            */
          });
        }
      }
    })

    .directive("scale", function() {
      return {
        scope: {
          notes: '=',
          chords: '=',
          selectedChord: '=',
          currentScaleOctave: '=',
        },
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          var context = element[0].getContext('2d');

          drawNoteMatrix(context, 'C');
          
          element.bind('click', function(e) {
            var x = e.offsetX;
            var y = e.offsetY;

            console.log("global click " + x + ", " + y);
            
            var staffConstants = new Staff();
            var leftBuffer = -4;

            var scaleNoteIndex = Math.floor(((x - staffConstants.leftMargin - leftBuffer) / staffConstants.sectionWidth));

            // console.log("scale clicked " + scope.notes[scaleNoteIndex].notes);
            scope.chords[scope.selectedChord].notes = toggleNote(scope.chords[scope.selectedChord].notes, scope.notes[scaleNoteIndex].notes);
            scope.$apply();
          });
        }
      };
    })
  
    .directive("scaleSubtitle", function() {
      return {
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          var context = element[0].getContext('2d');

          drawScaleSubtitle(context);
        }
      }
    })

    .directive("keySignature", function() {
      return {
        scope: {
          key: '=',
        },
        restrict: "A",
        replace: true,
        link: function(scope, element, attrs) {
          var context = element[0].getContext('2d');
          var clefWidth = 50;
          var symbolWidth = 14;
          context.canvas.width = clefWidth + (keyLetterToIndex(scope.key) * symbolWidth);
          drawKeySignature(context, scope.key);
        }
      };
    });

})();
