function drawStaff(key, song, context) {
  // key is number from 0 to 11, 0 = C major, 11 = B major
  // song is an array of objects with property "notes", a string of integers separated by spaces

  var lineThickness = 1;
  var lineSpacing = 12;
  var noteHeight = 10;
  var noteWidth = 14;
  var staffSeparation = 30;
  var lineColor = "#000000";
  var sectionWidth = 35;
  var leftMargin = 10;
  var rightMargin = 10;
  var topMargin = 10;
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

  function drawLines(startPoint) {
    for (var i = 0; i < 5; i++) {
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y + (i * lineSpacing));
      context.lineTo(context.canvas.width - rightMargin, startPoint.y + (i * lineSpacing));
      context.lineWidth = lineThickness;
      context.strokeStyle = lineColor;
      context.stroke();
    }
  }
  
  function drawNote(index, offset) {
    var left = offset.x;
    var top = offset.y;
    
    context.beginPath();
    context.rect(left, top + (index * (noteHeight / 2)), noteWidth, noteHeight)
    context.lineWidth = 1;
    context.strokeStyle = lineColor;
    context.stroke();
  }

  function drawNotes(notesString, index) {
    var notes = notesString.trim().split(" ");
    var leftMargin = 20;
    var left = leftMargin + (index * sectionWidth);
    notes.forEach(function(note) {
      drawNote(parseInt(note), {x: left, y: 10});
    });
  }

  function drawTrebleClef() {

  }

  function drawBassClef() {

  }

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  drawLines(trebleCorner);

  drawLines(bassCorner);

  song.forEach(function(chordObj, i) {
    // console.log("draw notes " + notes);
    drawNotes(chordObj.notes, i);
  });
  
  //drawLines(song.length * sectionWidth, {x: 10, y: 10});
  //song.forEach(function(notes) {
  //  drawNotes(notes);
  //}
}

