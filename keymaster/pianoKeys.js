function Key(i) {
  var blacks = [1, 3, 6, 8, 10];
  var names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  var offsets = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  var leftMargin = 15;
  var topMargin = 15;

  var whiteWidth = 28;
  var whiteHeight = 110;
  var blackWidth = 18;
  var blackHeight = 62;
  var blackWidthOffset = 4;

  this.blackHeight = blackHeight;
  
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
  var whiteSelectedColor = "#AAFFAA";
  var blackColor = "#000000";
  var blackSelectedColor = "#22CC99";

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

function drawPiano(keys, context) {
  // draw white keys first, then blacks
  keys.forEach(function(key) {
    if (!key.isBlack) {
      key.draw(context);
    }
  });

  keys.forEach(function(key) {
    if (key.isBlack) {
      key.draw(context);
    }
  });
}
