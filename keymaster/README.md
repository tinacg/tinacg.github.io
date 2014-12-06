# TASKS

* Clicking on scale should automatically take current key into account and
assign the flat or sharp (no need to compute the assignment by hand)

* Scale should display a natural note that negates the current key's modifier

* chord: D D# E (tone cluster), how to mark?
* distinguish between pianoKey, songKey, and keySignature

Create a Module

var sheet = (function() {
  var myConstant = 12;

  function drawStaff(context, topLeftCorner, clef, key) {
    // draw lines
  }

  function drawKeySignature(staff, key) {
    // where key is "C", "C#", "Db", etc, (major keys)
    // or "Am", "A#m"... (minor keys)
    // staff.clef determines vertical location
  }

  function drawTrebleClef(staff, ...) {
    var context = staff.context;
  }

  function drawNote(staff, representation) {
    // where representation is "C", "d'", "e''", etc.
    // vertical offset depends on staff.clef
  }
  
  return {
    drawStaff: drawStaff,
    drawGrandStaff: drawGrandStaff,
    drawScale: drawScale
  }
})();

Each drawing function takes a 2d context as an argument

* BoldEllipse
* Sharp
* Flat
* Note (a BoldEllipse possibly with Sharp or Flat and ledger line)
* Notes (string or array of notes, possibly offset due to overlap)
* TrebleClef
* BassClef
* Staff (5 lines and a Clef)
* GrandStaff (TrebleStaff and BassStaff with brace, vertical line on left)
* Scale (two TrebleStaffs and two BassStaffs with predefined scale notes)

Navigation tabs for:
* key control (large buttons or images to transpose) above the
sheet music and 4-staff scale containing the 48 notes
* sequence of piano keys

Note range: C, c, c', c'', b''

Add an argument (+/-1) to drawNote, so that it is drawn with a sharp or flat and shifts a line
