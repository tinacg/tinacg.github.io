var staff = (function() {
  var lineThickness = 1;
  var lineSpacing = 12;
  var lineColor = "#000000";

  var noteHeight = 12;
  var noteWidth = 16;
  var noteColor = "#000000";

  var staffSeparation = 12;
  var sectionWidth = 76;

  var leftMargin = 10;
  var rightMargin = 10;
  var topMargin = 10 + (2 * lineSpacing);

  var clefWidth = 0;
  var signWidth = 14;

  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

  function StaffConstants() {
    this.lineThickness = lineThickness;
    this.lineSpacing = lineSpacing;
    this.lineColor = lineColor;

    this.noteHeight = noteHeight;
    this.noteWidth = noteWidth;
    this.noteColor = noteColor;

    this.staffSeparation = staffSeparation;
    this.sectionWidth = sectionWidth;

    this.leftMargin = leftMargin;
    this.rightMargin = rightMargin;
    this.topMargin = topMargin;

    this.clefWidth = clefWidth;
    this.signWidth = signWidth;

    this.trebleCorner = {x: leftMargin, y: topMargin};
    this.bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
    this.bassCorner = {x: leftMargin, y: bassCornerY};
  }
  
  // http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

  function drawBoldEllipse(context, x, y, w, h) {
    var sqrt2 = 1.4142;
    var center = {x: x + (w / 2), y: y + (h / 2) };
    var topRight = {x: center.x + ((w / 2) / sqrt2), y: center.y - ((h / 2) / sqrt2)};
    var bottomLeft = {x: center.x - ((w / 2) / sqrt2), y: center.y + ((h / 2) / sqrt2)};

    var xOffset = w / 5;
    var yOffset = h / 5;
    var xOffsetWider = w / 2;
    var yOffsetWider = h / 2;

    var noteColor = noteColor;
    context.beginPath();
    context.moveTo(bottomLeft.x, bottomLeft.y);
    context.bezierCurveTo(x - xOffset, center.y,
                          center.x, y - yOffset,
                          topRight.x, topRight.y);
    context.bezierCurveTo(center.x, y - yOffsetWider,
                          x - xOffsetWider, center.y,
                          bottomLeft.x, bottomLeft.y);
    context.lineWidth = 1;
    context.strokeStyle = noteColor;
    context.fillStyle = noteColor;
    context.fill();

    context.beginPath();
    context.moveTo(topRight.x, topRight.y);
    context.bezierCurveTo(x + xOffset + w, center.y,
                          center.x, y + yOffset + h,
                          bottomLeft.x, bottomLeft.y);
    context.bezierCurveTo(center.x, y + yOffsetWider + h,
                          x + xOffsetWider + w, center.y,
                          topRight.x, topRight.y);
    context.strokeStyle = noteColor;
    context.fillStyle = noteColor;
    context.fill();
  }


  function drawStaff(context, startPoint) {

    for (var i = 0; i < 5; i++) {
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y + (i * lineSpacing));
      context.lineTo(context.canvas.width - rightMargin, startPoint.y + (i * lineSpacing));
      context.lineWidth = lineThickness;
      context.strokeStyle = lineColor;
      context.stroke();
    }
  }

  function drawSharp(context, position) {
    var sharpLeftOffset = 12;
    var sharpTopOffset = 8;
    var sharpWidth = 14;
    var sharpHeight = noteHeight * 2.7;

    var horizontalSpacing = 5;
    var verticalSpacing = 8;
    var rise = 6;
    var topRightOffset = 2;
    var leftOffset = 4;

    var x = position.x - sharpLeftOffset;
    var y = position.y - sharpTopOffset;
    
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + sharpHeight);
    context.lineWidth = 1;
    context.strokeStyle = lineColor;
    context.stroke();

    context.beginPath();
    context.moveTo(x + horizontalSpacing, y - topRightOffset);
    context.lineTo(x + horizontalSpacing, y - topRightOffset + sharpHeight);
    context.stroke();

    context.beginPath();
    context.moveTo(x - leftOffset, y + (sharpHeight / 2.5));
    context.lineTo(x - leftOffset + sharpWidth, y + (sharpHeight / 2.5) - rise);
    context.lineWidth = 3;
    context.stroke();

    context.beginPath();
    context.moveTo(x - leftOffset, y + (sharpHeight / 2.5) + verticalSpacing);
    context.lineTo(x - leftOffset + sharpWidth, y + (sharpHeight / 2.5) + verticalSpacing - rise);
    context.lineWidth = 3;
    context.stroke();
  }

  function drawFlat(context, position) {
    var flatLeftOffset = 14;
    var flatTopOffset = 15;
    var flatWidth = 14;
    var flatHeight = lineSpacing * 2.5;

    var x = position.x - flatLeftOffset;
    var y = position.y - flatTopOffset;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + flatHeight);
    context.linewidth = 2;
    context.strokeStyle = lineColor;
    context.stroke();

    context.beginPath();
    context.moveTo(x, y + flatHeight);
    context.bezierCurveTo(x + flatWidth, y + flatHeight - (0.5 * lineSpacing),
                          x + (0.8 * flatWidth), y,
                          x, y + flatHeight - (0.7 * lineSpacing));

    context.moveTo(x, y + flatHeight - 2);
    context.bezierCurveTo(x + (0.2 * flatWidth), y + 4,
                          x + flatWidth, y + flatHeight - (0.5 * lineSpacing),
                          x, y + flatHeight - 2)
    context.fill();
  }
  
  function drawNote(context, index, offset, signatureWidth) {
    var jumps = [0,  0,  1,  1,  2,  3,  3,  4,  4,  5,  5,  6,
                 7,  7,  8,  8,  9, 10, 10, 11, 11, 12, 12, 13,
                 14, 14, 15, 15, 16, 17, 17, 18, 18, 19, 19, 20,
                 21, 21, 22, 22, 23, 24, 24, 25, 25, 26, 26, 27];
    var sharps = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
                  0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
                  0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
                  0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

    var left = offset.x + 10 + signatureWidth;
    //console.log(left);
    var top = offset.y;

    var baseline = top + staffSeparation + (12.5 * lineSpacing);  // Bass C

    var noteTop = baseline - (jumps[index] * (noteHeight / 2));
    
    context.beginPath();
    context.strokeStyle = noteColor;
    context.fillStyle = noteColor;

    // context.rect(left, noteTop, noteWidth, noteHeight)
    drawBoldEllipse(context, left, noteTop, noteWidth, noteHeight);

    var sharpLeftOffset = 12;
    var sharpTopOffset = 8;
    var sharpWidth = 14;
    var sharpHeight = noteHeight * 2.7;
    if (sharps[index]) {
      drawSharp(context, {x: left, y: noteTop});
    }

    
  }

  function drawNotes(context, notesString, index, signatureWidth) {
    var notes = notesString.trim().split(" ");
    var leftMargin = 20;
    var left = leftMargin + (index * sectionWidth);
    notes.forEach(function(note) {
      drawNote(context, parseInt(note), {x: left, y: 10}, signatureWidth);
    });
  }

  function drawTrebleClef(context, key) {
    var a = 1;
    return 50;
  }

  function drawBassClef() {

  }


  function drawGrandStaff(key, songChordIndex, song, context) {
    // key is number from 0 to 11, 0 = C major, 11 = B major
    // song is an array of objects with property "notes", a string of integers separated by spaces

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    /* FILL STAFF
       context.beginPath();
       context.rect(0, 0, context.canvas.width, context.canvas.height);
       context.fillStyle = "#DDDDFF";
       context.fill();
    */

    // RECTANGLE SURROUNDING ACTIVE CHORD
    var rectTopMargin = 5;
    var rectCorner = {x: leftMargin + (songChordIndex * sectionWidth), y: rectTopMargin };
    var rectWidth = sectionWidth - 10;
    var rectHeight = rectTopMargin + (15 * lineSpacing);
    var rectOutlineColor = "#339955";

    if(songChordIndex >= 0) {
      context.beginPath();
      context.rect(rectCorner.x, rectCorner.y, rectWidth, rectHeight);
      context.fillStyle = "#FFFF99";
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = rectOutlineColor;
      context.stroke();
    }
    
    drawStaff(context, trebleCorner);
    drawStaff(context, bassCorner);

    // join staffs
    context.beginPath();
    context.moveTo(trebleCorner.x, trebleCorner.y);
    context.lineTo(trebleCorner.x, trebleCorner.y + staffSeparation + (9 * lineSpacing));
    context.lineWidth = lineThickness;
    context.strokeStyle = lineColor;
    context.stroke();

    song.forEach(function(chordObj, i) {
      // console.log(key);
      // drawNotes(context, chordObj.notes, i, clefWidth + (keyLetterToIndex(key) * signWidth));
      drawNotes(context, chordObj.notes, i, 0);
    });
    
    //drawStaff(song.length * sectionWidth, {x: 10, y: 10});
    //song.forEach(function(notes) {
    //  drawNotes(notes);
    //}
  }

  function drawScaleSubtitle(context) {
    var topMargin = 18;
    var leftOffset = 21;
    context.font = "20px sans-serif";
    var noteName = ['C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B'];
    for (var i = 0; i < 12; i++) {
      context.fillText(noteName[i], leftMargin + leftOffset + (i * sectionWidth), topMargin);
    }
  }

  function drawSketch(context) {
    var topMargin = 18;
    var leftOffset = 21;
    var corner = {x: topMargin, y: leftOffset};
    drawStaff(context, corner);

    drawGenericNote(context, corner, -4, -1);
  }
  
  // draw note based on steps at or above middle C
  // modifier adds sharp +1 or flat -1
  function drawGenericNote(context, corner, steps, modifier) {
    var top = corner.y;

    var left = corner.x + 10 + leftMargin;

    var baseline = top + lineSpacing; // above C
    var noteTop = baseline - (steps * (noteHeight / 2));
    
    context.beginPath();
    context.strokeStyle = noteColor;
    context.fillStyle = noteColor;
    drawBoldEllipse(context, left, noteTop, noteWidth, noteHeight);
    
    var sharpLeftOffset = 12;
    var sharpTopOffset = 8;
    var sharpWidth = 14;
    var sharpHeight = noteHeight * 2.7;
    if (modifier === 1) {
      drawSharp(context, {x: left, y: noteTop}); // - sharpLeftOffset, noteTop - sharpTopOffset, sharpWidth, sharpHeight );
    }
    
    if (modifier === -1) {
      drawFlat(context, {x: left, y: noteTop});
    }

  }
  
  function drawScale(context, key, octave) {
    // CONSTANTS FOR SCALE

    // SHARPS
    // var cScalePositions = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
    // var cScaleModifiers = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

    // FLATS
    var cScalePositions = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
    var cScaleModifiers = [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0];
    
    // IF OCTAVE > 1, A TREBLE CLEF IS DRAWN
    var staffCorner = {x: trebleCorner.x, y: trebleCorner.y + (octave * 5 * staffSeparation) + (octave * 5 * lineSpacing)};
    drawStaff(context, staffCorner);

    for (var i = 0; i < 12; i++) {
      if (octave < 2) {
        // TREBLE
        drawGenericNote(context, {x: staffCorner.x + (i * sectionWidth), y: staffCorner.y}, cScalePositions[i] - (7 * octave), cScaleModifiers[i]);
      } else {
        // BASS
        drawGenericNote(context, {x: staffCorner.x + (i * sectionWidth), y: staffCorner.y}, cScalePositions[i] - (7 * octave) + 12, cScaleModifiers[i]);
      }
    }
  }

  function drawNoteMatrix(context, key) {
    for (var octave = 0; octave < 4; octave++) {
      drawScale(context, key, octave);
    }
  }

  return {
    staffConstants: StaffConstants,
    drawGrandStaff: drawGrandStaff,
    drawScaleSubtitle: drawScaleSubtitle,
    drawNoteMatrix: drawNoteMatrix,
    drawStaff: drawStaff,
    drawSketch: drawSketch,

    // constants
    topMargin: topMargin,
    leftMargin: leftMargin,
    lineSpacing: lineSpacing,
    sectionWidth: sectionWidth,    
  };

})();
