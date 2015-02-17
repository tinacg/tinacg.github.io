function buildTable(orderByLeft) {
  var sortFunction;
  
  if (orderByLeft) {
    sortFunction = function(a, b) {
      return a.left.localeCompare(b.left, 'pt');
    };
  } else {
    sortFunction = function(a, b) {
      return a.right.localeCompare(b.right, 'pt');
    };
  }

  //var table = document.createElement("table");
  //table.insertRow()

  var vocabularyParts = [];

  vocabulary.forEach(function(line) {
    var parts = line.split(";");
    vocabularyParts.push({
      left: parts[0],
      right: parts[1],
      reference: parts[2]
    });
  });
  
  vocabularyParts.sort(sortFunction);

  var table = '<table>';

  vocabularyParts.forEach(function(line) {
    var left = line.left;
    var right = line.right;
    var reference = line.reference;
    
    table += "<tr><td>" + left + "</td><td>" + right + "</td><td>" + reference + "</td></tr>";
  });
  
  table += "</table>";

  return table
}

function placeTable(table) {
  document.getElementById("tableDiv").innerHTML = table;
}

function listSources() {
  sources.forEach(function(source) {
    document.getElementById("sourcesDiv").innerHTML += source + "<br>";
  });
}

document.getElementById("switchButton").addEventListener("click", function() {
  orderByLeft = !orderByLeft;
  placeTable(buildTable(orderByLeft));
});

var orderByLeft = true;
placeTable(buildTable(orderByLeft));
listSources();
