function Staff() {
  this.lineThickness = 1;
  this.lineSpacing = 12;
  this.lineColor = "#000000";

  this.noteHeight = 12;
  this.noteWidth = 16;
  this.noteColor = "#000000";

  this.staffSeparation = 12;
  this.sectionWidth = 76;

  this.leftMargin = 10;
  this.rightMargin = 10;
  this.topMargin = 10 + (2 * this.lineSpacing);

  this.clefWidth = 50;
  this.signWidth = 14;
}

// http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

function drawBoldEllipse(ctx, x, y, w, h) {
  var staff = new Staff();
  var sqrt2 = 1.4142;
  var center = {x: x + (w / 2), y: y + (h / 2) };
  var topRight = {x: center.x + ((w / 2) / sqrt2), y: center.y - ((h / 2) / sqrt2)};
  var bottomLeft = {x: center.x - ((w / 2) / sqrt2), y: center.y + ((h / 2) / sqrt2)};

  var xOffset = w / 5;
  var yOffset = h / 5;
  var xOffsetWider = w / 2;
  var yOffsetWider = h / 2;

  var noteColor = staff.noteColor;
  ctx.beginPath();
  ctx.moveTo(bottomLeft.x, bottomLeft.y);
  ctx.bezierCurveTo(x - xOffset, center.y,
                    center.x, y - yOffset,
                    topRight.x, topRight.y);
  ctx.bezierCurveTo(center.x, y - yOffsetWider,
                    x - xOffsetWider, center.y,
                    bottomLeft.x, bottomLeft.y);
  ctx.lineWidth = 1;
  ctx.strokeStyle = noteColor;
  ctx.fillStyle = noteColor;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(topRight.x, topRight.y);
  ctx.bezierCurveTo(x + xOffset + w, center.y,
                    center.x, y + yOffset + h,
                    bottomLeft.x, bottomLeft.y);
  ctx.bezierCurveTo(center.x, y + yOffsetWider + h,
                    x + xOffsetWider + w, center.y,
                    topRight.x, topRight.y);
  ctx.fill();
  

}


function drawLines(context, startPoint) {
  var staff = new Staff();

  var lineThickness = staff.lineThickness;
  var lineSpacing = staff.lineSpacing;
  var lineColor = staff.lineColor;
  
  var noteHeight = staff.noteHeight;
  var noteWidth = staff.noteWidth;
  var noteColor = staff.noteColor;
  
  var staffSeparation = staff.staffSeparation;
  var sectionWidth = staff.sectionWidth;

  var leftMargin = staff.leftMargin;
  var rightMargin = staff.rightMargin;
  var topMargin = staff.topMargin;
  
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

  for (var i = 0; i < 5; i++) {
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y + (i * lineSpacing));
    context.lineTo(context.canvas.width - rightMargin, startPoint.y + (i * lineSpacing));
    context.lineWidth = lineThickness;
    context.strokeStyle = lineColor;
    context.stroke();
  }
}

function drawSharp(ctx, x, y, w, h) {
  var horizontalSpacing = 5;
  var verticalSpacing = 8;
  var rise = 6;
  var topRightOffset = 2;
  var leftOffset = 4;

  var lineColor = "#000000";
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.lineWidth = 1;
  ctx.strokeStyle = lineColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + horizontalSpacing, y - topRightOffset);
  ctx.lineTo(x + horizontalSpacing, y - topRightOffset + h);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - leftOffset, y + (h / 2.5));
  ctx.lineTo(x - leftOffset + w, y + (h / 2.5) - rise);
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - leftOffset, y + (h / 2.5) + verticalSpacing);
  ctx.lineTo(x - leftOffset + w, y + (h / 2.5) + verticalSpacing - rise);
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawNote(context, index, offset, signatureWidth) {
  var staff = new Staff();

  var lineThickness = staff.lineThickness;
  var lineSpacing = staff.lineSpacing;
  var lineColor = staff.lineColor;
  
  var noteHeight = staff.noteHeight;
  var noteWidth = staff.noteWidth;
  var noteColor = staff.noteColor;
  
  var staffSeparation = staff.staffSeparation;
  var sectionWidth = staff.sectionWidth;

  var leftMargin = staff.leftMargin;
  var rightMargin = staff.rightMargin;
  var topMargin = staff.topMargin;
  
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

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
  // context.rect(left, noteTop, noteWidth, noteHeight)
  drawBoldEllipse(context, left, noteTop, noteWidth, noteHeight);
  
  context.lineWidth = 1;
  context.strokeStyle = noteColor;
  context.stroke();

  var sharpLeftOffset = 12;
  var sharpTopOffset = 8;
  var sharpWidth = 14;
  var sharpHeight = noteHeight * 2.7;
  if (sharps[index]) {
    // draw sharp symbol
    
    drawSharp(context, left - sharpLeftOffset, noteTop - sharpTopOffset, sharpWidth, sharpHeight );
  }

  
}

function drawNotes(context, notesString, index, signatureWidth) {
  var staff = new Staff();

  var lineThickness = staff.lineThickness;
  var lineSpacing = staff.lineSpacing;
  var lineColor = staff.lineColor;
  
  var noteHeight = staff.noteHeight;
  var noteWidth = staff.noteWidth;
  var noteColor = staff.noteColor;
  
  var staffSeparation = staff.staffSeparation;
  var sectionWidth = staff.sectionWidth;

  var leftMargin = staff.leftMargin;
  var rightMargin = staff.rightMargin;
  var topMargin = staff.topMargin;
  
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

  var notes = notesString.trim().split(" ");
  var leftMargin = 20;
  var left = leftMargin + (index * sectionWidth);
  notes.forEach(function(note) {
    drawNote(context, parseInt(note), {x: left, y: 10}, signatureWidth);
  });
}

function drawTrebleClef() {

}

function drawBassClef() {

}


function drawStaff(key, songChordIndex, song, context) {
  // key is number from 0 to 11, 0 = C major, 11 = B major
  // song is an array of objects with property "notes", a string of integers separated by spaces

  var staff = new Staff();

  var lineThickness = staff.lineThickness;
  var lineSpacing = staff.lineSpacing;
  var lineColor = staff.lineColor;
  
  var noteHeight = staff.noteHeight;
  var noteWidth = staff.noteWidth;
  var noteColor = staff.noteColor;
  
  var staffSeparation = staff.staffSeparation;
  var sectionWidth = staff.sectionWidth;

  var leftMargin = staff.leftMargin;
  var rightMargin = staff.rightMargin;
  var topMargin = staff.topMargin;
  
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

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
  
  drawLines(context, trebleCorner);
  drawLines(context, bassCorner);

  song.forEach(function(chordObj, i) {
    // console.log(key);
    drawNotes(context, chordObj.notes, i, staff.clefWidth + (keyLetterToIndex(key) * staff.signWidth));
  });
  
  //drawLines(song.length * sectionWidth, {x: 10, y: 10});
  //song.forEach(function(notes) {
  //  drawNotes(notes);
  //}
}

function drawScaleSubtitle(context) {
  var staffConstants = new Staff();
  var topMargin = 18;
  var leftOffset = 21;
  context.font = "20px sans-serif";
  var noteName = ['C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B'];
  for (var i = 0; i < 12; i++) {
    context.fillText(noteName[i], staffConstants.leftMargin + leftOffset + (i * staffConstants.sectionWidth), topMargin);
  }
}

function drawSingleStaff(context, key, octave) {
  // IF OCTAVE > 1, A TREBLE CLEF IS DRAWN
  var staff = new Staff();

  var lineThickness = staff.lineThickness;
  var lineSpacing = staff.lineSpacing;
  var lineColor = staff.lineColor;
  
  var noteHeight = staff.noteHeight;
  var noteWidth = staff.noteWidth;
  var noteColor = staff.noteColor;
  
  var staffSeparation = staff.staffSeparation;
  var sectionWidth = staff.sectionWidth;

  var leftMargin = staff.leftMargin;
  var rightMargin = staff.rightMargin;
  var topMargin = staff.topMargin;
  
  var trebleCorner = {x: leftMargin, y: topMargin};

  drawLines(context, trebleCorner);

  for (var i = 0; i < 12; i++) {
    drawNotes(context, (i + (octave * 12)).toString(), i, (keyLetterToIndex(key) * staff.signWidth));
  }
}

function drawNoteMatrix(context, key) {
  for (var octave = 0; octave < 4; octave++) {
    drawSingleStaff(context, key, octave);
  }
}
