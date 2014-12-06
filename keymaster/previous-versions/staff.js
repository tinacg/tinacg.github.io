function drawStaff(key, song, context) {
  // key is number from 0 to 11, 0 = C major, 11 = B major
  // song is an array of objects with property "notes", a string of integers separated by spaces

  var lineThickness = 1;
  var lineSpacing = 12;
  var lineColor = "#000000";
  
  var noteHeight = 12;
  var noteWidth = 16;
  var noteColor = "#000000";
  
  var staffSeparation = 12;
  var sectionWidth = 64;

  var leftMargin = 10;
  var rightMargin = 10;
  var topMargin = 10 + (2 * lineSpacing);
  
  var trebleCorner = {x: leftMargin, y: topMargin};
  var bassCornerY = trebleCorner.y + (5 * lineSpacing) + staffSeparation;
  var bassCorner = {x: leftMargin, y: bassCornerY};

  // http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

  function drawBoldEllipse(ctx, x, y, w, h) {
    var sqrt2 = 1.4142;
    var center = {x: x + (w / 2), y: y + (h / 2) };
    var topRight = {x: center.x + ((w / 2) / sqrt2), y: center.y - ((h / 2) / sqrt2)};
    var bottomLeft = {x: center.x - ((w / 2) / sqrt2), y: center.y + ((h / 2) / sqrt2)};

    var xOffset = w / 5;
    var yOffset = h / 5;
    var xOffsetWider = w / 2;
    var yOffsetWider = h / 2;

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
  
  function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
    ox = (w / 2) * kappa, // control point offset horizontal
    oy = (h / 2) * kappa, // control point offset vertical
    xe = x + w,           // x-end
    ye = y + h,           // y-end
    xm = x + w / 2,       // x-middle
    ym = y + h / 2;       // y-middle

    var kappaPrime = 0;
    var px = (w / 2) * kappaPrime;
    var py = (h / 2) * kappaPrime;

    ctx.strokeStyle = noteColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, ym);

    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    // ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - py, xm - px, y, x, ym);
    ctx.fillStyle = noteColor;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(xm, y);

    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);

    
    //    ctx.moveTo(xe, ym);
    
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);    
    ctx.bezierCurveTo(xe, ym + py, xm + px, ye, xe, ym);
//    ctx.fill();
    ctx.moveTo(xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    
    //ctx.closePath(); // not used correctly, see comments (use to close off open path)
    ctx.stroke();
  }


  
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
    var jumps = [0,  0,  1,  1,  2,  3,  3,  4,  4,  5,  5,  6,
                 7,  7,  8,  8,  9, 10, 10, 11, 11, 12, 12, 13,
                 14, 14, 15, 15, 16, 17, 17, 18, 18, 19, 19, 20,
                 21, 21, 22, 22, 23, 24, 24, 25, 25, 26, 26, 27];
    var left = offset.x;
    var top = offset.y;

    var baseline = top + staffSeparation + (12.5 * lineSpacing);  // Bass C

    var noteTop = baseline - (jumps[index] * (noteHeight / 2));
    
    context.beginPath();
    // context.rect(left, noteTop, noteWidth, noteHeight)
    drawBoldEllipse(context, left, noteTop, noteWidth, noteHeight);
    context.lineWidth = 1;
    context.strokeStyle = noteColor;
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

//  drawBoldEllipse(context, 50, 50, 60, 40);
//  drawEllipse(context, 50, 50, 60, 40);
  
  song.forEach(function(chordObj, i) {
    // console.log("draw notes " + notes);
    drawNotes(chordObj.notes, i);
  });
  
  //drawLines(song.length * sectionWidth, {x: 10, y: 10});
  //song.forEach(function(notes) {
  //  drawNotes(notes);
  //}
}

