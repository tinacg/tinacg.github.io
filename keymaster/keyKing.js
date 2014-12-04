function drawKeySignature(context, keyIndex) {
  var staffConstants = new Staff();

  drawLines(context, {x: staffConstants.leftMargin, y: staffConstants.topMargin});

  for (var i = 0; i < keyIndex; i++) {
    context.beginPath();
    context.moveTo(i * 5, 0);
    context.lineTo(i * 5, 40);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    
  }
}

function keyLetterToIndex(letter) {
  var indices = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11,
  };
  return indices[letter];
}
