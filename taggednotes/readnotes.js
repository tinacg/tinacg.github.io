var tags = {};
var availableNotes = [];

function createNote(noteObj) {
  var note = document.createElement("p");
  
  var title = document.createElement("p");

  title.innerHTML = '<span onclick="toggleNote(\'' + noteObj.id + '\')"><b>' + noteObj.title + '</b></span><hr>';

  var noteContents = document.createElement("p");
  noteContents.setAttribute("id", noteObj.id);
  noteContents.style.display = '';

  var tags = document.createElement("span");

  noteObj.tags.forEach(function(tag) {
    tags.innerHTML += "[" + createTag(tag) + "] ";
  });

  var ref = document.createElement("p");
  ref.innerHTML = noteObj.reference;
  
  var body = document.createElement("pre");

  body.innerHTML = noteObj.body;

  noteContents.appendChild(tags);
  noteContents.appendChild(ref);
  noteContents.appendChild(body);
  
  note.appendChild(title);
  note.appendChild(noteContents);
  return note;
}

function createTag(tagName) {
  return '<span onclick="createNotes(\'' + escape(tagName) + '\');">' + tagName + '</span>';
}

function createNotes(tagName) {
  availableNotes = [];
  var notesHTML = document.createElement("p");

  tags[tagName].forEach(function(noteId) {
    notesHTML.appendChild(createNote(notes[noteId]));
    availableNotes.push(noteId);
  });
  
  document.getElementById("notes").innerHTML = "<br>" + unescape(tagName) + ' <span onclick="expandAll();">(expand all)</span> <span onclick="collapseAll();">(collapse all)</span>';
  document.getElementById("notes").appendChild(notesHTML);
  document.getElementById("notes").scrollTop = 0;
}

function createAllNotes() {
  availableNotes = [];
  var notesHTML = document.createElement("p");

  for (var i = 0; i < notes.numNotes; i++) {
    noteId = "note" + i;
    console.log(noteId);
    notesHTML.appendChild(createNote(notes[noteId]));
    availableNotes.push(noteId);
  }
  
  document.getElementById("notes").innerHTML = '<br>All notes<span onclick="expandAll();"> (expand all)</span> <span onclick="collapseAll();">(collapse all)</span>';
  document.getElementById("notes").appendChild(notesHTML);

  collapseAll();
  document.getElementById("notes").scrollTop = 0;
}

function expandAll() {
  availableNotes.forEach(function(noteId) {
    document.getElementById(noteId).style.display = '';
  });
}

function collapseAll() {
  availableNotes.forEach(function(noteId) {
    document.getElementById(noteId).style.display = 'none';
  });
}

function toggleNote(noteId) {
  var note = document.getElementById(noteId);
  if (note.style.display !== 'none') {
    note.style.display = 'none';
  } else {
    note.style.display = '';
  }
}

function collectTags(notesObj) {
  var simpleTags = {};
  
  for (var i = 0; i < notesObj.numNotes; i++) {
    var note = notesObj['note' + i.toString()];
    note.tags.forEach(function(tag) {
      var escapedTag = escape(tag);
      if (!(escapedTag in tags)) {
        tags[escapedTag] = [];
        simpleTags[tag] = "";
      }
      tags[escapedTag].push(note.id);
    });
  }

  var tagsHTML = '<br><span onclick="createAllNotes()">All notes</span><br><br>';

  Object.keys(simpleTags).sort(function(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }).forEach(function(tag) {
    tagsHTML += "&nbsp;<span>" + createTag(tag) + "</span><br>";
  });

  return tagsHTML;
}
