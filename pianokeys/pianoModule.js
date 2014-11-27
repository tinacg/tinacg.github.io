function Key(i) {
  var blacks = [1, 3, 6, 8, 10];
  var names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  var offsets = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  var leftMargin = 15;
  var topMargin = 15;

  var whiteWidth = 20;
  var whiteHeight = 120;
  var blackWidth = 14;
  var blackHeight = 75;
  var blackWidthOffset = 2;
  
  this.index = i;
  this.name = names[i % 12];
  this.selected = false;
  
  this.isBlack = blacks.indexOf(this.index % 12) > -1;

  this.left = leftMargin + (offsets[i % 12] * whiteWidth) + (Math.floor(i / 12) * 7 * whiteWidth);
  this.top = topMargin;

  if (this.isBlack) {
    this.left += blackWidthOffset;
    this.width = blackWidth;
    this.height = blackHeight;
  } else {
    this.width = whiteWidth;
    this.height = whiteHeight;
  }
}

Key.prototype.draw = function(context) {
  var whiteColor = "#FFFFFF";
  var whiteSelectedColor = "#AAEE99";
  var blackColor = "#000000";
  var blackSelectedColor = "#229911";

  var strokeColor = "#CCCCCC";
  var fillColor = "#FFFFFF";

  if (this.isBlack) {
    if (this.selected) {
      fillColor = blackSelectedColor;
    } else {
      fillColor = blackColor;
    }
  } else {
    if (this.selected) {
      fillColor = whiteSelectedColor;
    } else {
      fillColor = whiteColor;
    }
  }

  context.beginPath();
  context.rect(this.left, this.top, this.width, this.height);
  context.fillStyle = fillColor;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = strokeColor;
  context.stroke();
}

/*

function Piano(pianoElem) {
  this.pianoElem = pianoElem;
  this.keys = [];

  for (var i = 0; i < 48; i++) {
    this.keys.push(new Key(i));
  }

  //  this.context = this.pianoElem.getContext('2d');
  this.context = null;

  this.redraw = function() {
    // draw white keys first, then blacks
    this.keys.forEach(function(key) {
      if (!key.isBlack) {
        key.draw(this.context);
      }
    });

    this.keys.forEach(function(key) {
      if (key.isBlack) {
        key.draw(this.context);
      }
    });
  }

  
  this.pianoElem.addEventListener('click', function(e) {
    var x = e.pageX - pianoOffsetLeft;
    var y = e.pageY - pianoOffsetTop;

    this.keys.forEach(function(key) {
      // blacks
      if (y > key.top && y < key.top + blackHeight && key.isBlack && 
          x > key.left && x < key.left + key.width) {
        key.selected = !key.selected;
      } else if (y > key.top + blackHeight && y < key.top + key.height && x > key.left && x < key.left + key.width) {
        key.selected = !key.selected;
      }
    });

    this.redraw();
  }, false);
  
}

*/



/*
  
  var pianoElem = document.getElementById('piano');
  var pianoOffsetLeft = pianoElem.offsetLeft;
  var pianoOffsetTop = pianoElem.offsetTop;
  var whiteWidth = 20;
  var whiteHeight = 120;
  var blackWidth = 14;
  var blackHeight = 75;
  var blackWidthOffset = 2;

  var songTranspose = 0;


  for (var i = 0; i < 48; i++) {
  keys.push(new Key(i));
  }


  redraw();


  function transpose(steps) {
  var newSelected = [];
  for (var i = 0; i < keys.length; i++) {
  newSelected[i+steps] = keys[i].selected;
  keys[i].selected = false;
  }
  for (var i = 0; i < keys.length; i++) {
  keys[i].selected = newSelected[i];
  }
  redraw();
  }

  function clearSelection() {
  keys.forEach(function(key) {
  key.selected = false;
  });
  }

  function selectFromIndices(keyIndicesString) {
  var keyIndices = keyIndicesString.split(",");
  clearSelection();
  keyIndices.forEach(function(val) {
  var i = Number(val);
  // keys[i].selected = true;
  if (i+songTranspose >= 0 && i+songTranspose < keys.length) {
  keys[i+songTranspose].selected = true;

  }
  });
  redraw();
  }

  var currentChord = document.getElementById("currentChord");

  currentChord.onkeyup = function(e) {
  parseChord(this.value);
  };


  var songTransposeInput = document.getElementById("songTransposeInput");

  function setSongTranspose(offset) {
  songTranspose = parseInt(songTransposeInput.value) + offset;
  songTransposeInput.value = songTranspose;
  redraw();
  }

  songTransposeInput.onkeyup = function(e) {
  songTranspose = parseInt(this.value);
  parseChord(currentChord.value);
  };



  var songLineInput = document.getElementById("songLineInput");

  songLineInput.onkeyup = function(e) {
  currentChord.value = readSongLine(song.value, parseInt(this.value));
  parseChord(currentChord.value);
  };

  function readSongLine(songText, line) {
  var songLines = songText.split('\n');
  return songLines[line-1];
  }

  // http://stackoverflow.com/questions/12886286/addeventlistener-for-keydown-on-canvas
  var lastDownTarget;
  document.addEventListener('mousedown', function(e) {
  lastDownTarget = e.target;
  displayKeyboardStatus();
  }, false);

  window.onkeypress = function(e) {
  if (lastDownTarget == pianoElem) {
  keyboardHighlight(e);
  }
  }

  function displayKeyboardStatus() {
  var keyboardStatus = document.getElementById('keyboardStatus');
  keyboardStatus.innerHTML = (lastDownTarget == pianoElem) ? "Keyboard active" : "(click inside piano area to activate keyboard controls)";
  }

  var transposeUpButton = document.getElementById("transposeUpButton");
  var transposeDownButton = document.getElementById("transposeDownButton");
  transposeUpButton.onclick = function(e) {
  songTranspose = songTranspose + 1;
  songTransposeInput.value = songTranspose;
  parseChord(currentChord.value);
  }
  transposeDownButton.onclick = function(e) {
  songTranspose = songTranspose - 1;
  songTransposeInput.value = songTranspose;
  parseChord(currentChord.value);
  }

  var previousLineButton = document.getElementById("previousLineButton");
  var nextLineButton = document.getElementById("nextLineButton");
  nextLineButton.onclick = function(e) {
  songLineInput.value = parseInt(songLineInput.value) + 1;
  currentChord.value = readSongLine(song.value, parseInt(songLineInput.value));
  parseChord(currentChord.value);
  }
  previousLineButton.onclick = function(e) {
  songLineInput.value = parseInt(songLineInput.value) - 1;
  currentChord.value = readSongLine(song.value, parseInt(songLineInput.value));
  parseChord(currentChord.value);
  }


  var addToSongButton = document.getElementById("addToSongButton");
  addToSongButton.onclick = function(e) {
  addToSong();
  }

  function highlightedToChordString() {
  var indexToName = {
  0: 'C,',
  1: 'C,#',
  2: 'D,',
  3: 'D,#',
  4: 'E,',
  5: 'F,',
  6: 'F,#',
  7: 'G,',
  8: 'G,#',
  9: 'A,',
  10: 'A,#',
  11: 'B,',
  12: 'C',
  13: 'C#',
  14: 'D',
  15: 'D#',
  16: 'E',
  17: 'F',
  18: 'F#',
  19: 'G',
  20: 'G#',
  21: 'A',
  22: 'A#',
  23: 'B',
  24: 'c',
  25: 'c#',
  26: 'd',
  27: 'd#',
  28: 'e',
  29: 'f',
  30: 'f#',
  31: 'g',
  32: 'g#',
  33: 'a',
  34: 'a#',
  35: 'b',
  36: "c'",
  37: "c'#",
  38: "d'",
  39: "d'#",
  40: "e'",
  41: "f'",
  42: "f'#",
  43: "g'",
  44: "g'#",
  45: "a'",
  46: "a'#",
  47: "b'",
  };            
  var indices = "";
  keys.forEach(function(key) {
  if (key.selected) {
  var name = indexToName[key.index] || "";
  indices += name + " ";
  }
  });
  return indices;
  }

  var song = document.getElementById("songText");

  function addToSong() {
  song.value += highlightedToChordString() + "\n";
  }

  function parseChord(s) {
  var nameToIndex = {
  'C,': 0,
  'C,#': 1,
  'D,b': 1,
  'D,': 2,
  'D,#': 3,
  'E,b': 3,
  'E,': 4,
  'F,': 5,
  'F,#': 6,
  'G,b': 6,
  'G,': 7,
  'G,#': 8,
  'A,b': 8,
  'A,': 9,
  'A,#': 10,
  'B,b': 10,
  'B,': 11,

  'C,+': 1,
  'D,+': 3,
  'F,+': 6,
  'G,+': 8,
  'A,+': 10,

  'C': 12,
  'C#': 13,
  'Db': 13,
  'D': 14,
  'D#': 15,
  'Eb': 15,
  'E': 16,
  'F': 17,
  'F#': 18,
  'Gb': 18,
  'G': 19,
  'G#': 20,
  'Ab': 20,
  'A': 21,
  'A#': 22,
  'Bb': 22,
  'B': 23,

  'C+': 13,
  'D+': 15,
  'F+': 18,
  'G+': 20,
  'A+': 22,
  
  'c': 24,
  'c#': 25,
  'db': 25,
  'd': 26,
  'd#': 27,
  'eb': 27,
  'e': 28,
  'f': 29,
  'f#': 30,
  'gb': 30,
  'g': 31,
  'g#': 32,
  'ab': 32,
  'a': 33,
  'a#': 34,
  'bb': 34,
  'b': 35,

  'c+': 25,
  'd+': 27,
  'f+': 30,
  'g+': 32,
  'a+': 34,

  "c'": 36,
  "c'#": 37,
  "d'b": 37,
  "d'": 38,
  "d'#": 39,
  "e'b": 39,
  "e'": 40,
  "f'": 41,
  "f'#": 42,
  "g'b": 42,
  "g'": 43,
  "g'#": 44,
  "a'b": 44,
  "a'": 45,
  "a'#": 46,
  "b'b": 46,
  "b'": 47,

  "c'+": 37,
  "d'+": 39,
  "f'+": 42,
  "g'+": 44,
  "a'+": 46,
  }
  if (s === '') {
  clearSelection();
  redraw();
  return 0;
  }
  var notes = s.trim().split(" ");
  var indices = notes.map(function(note) {
  return nameToIndex[note].toString();
  }).join(",");
  selectFromIndices(indices);
  }

*/
