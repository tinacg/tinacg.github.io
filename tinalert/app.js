var alertWindow;
var intv;

document.getElementById("testButton").addEventListener("click", function() {
  this.value = "Wait 3 seconds";
  setTimeout(function() {
    alertWindow = window.open("test window", "testWindow", "location=no,menubar=yes,resizable=yes,scrollbars=yes,height=100,width=500");
    alertWindow.document.write("<h1>Browser accepts opening windows</h1>");
  }, 3000);
});

document.getElementById("startTimer").addEventListener("click", function() {
  var startDate = (new Date()).getTime();
  
  var mins = parseInt(document.getElementById("minutes").value);
  var secs = 60 * mins;

  document.title = "Start...";
  
  clearInterval(intv);
  
  intv = setInterval(function () {
    document.title = secstomins(secs - secsDiff(startDate));
    document.getElementById("secondsLeft").innerHTML = secstomins(secs - secsDiff(startDate));
    if ((secs - secsDiff(startDate)) <= 0) {
      clearInterval(intv);
      if (alertWindow) {
        alertWindow.close();
      }
      alertWindow = window.open("alert window", "alertWindow", "location=no,menubar=yes,resizable=yes,scrollbars=yes,height=100,width=500");
      var msg = document.getElementById("message").value || "TiNAlert time's up";
      alertWindow.document.write("<h1>" + msg + "</h1>");
      alertWindow.document.close();
    }
  }, 1000);
});

function secsDiff(start) {
  return Math.floor(((new Date()).getTime() - start) / 1000);
}

function secstomins(s) {
  var secsdisp = s % 60;
  var minsdisp = Math.floor(s / 60);
  if (secsdisp < 10) {
	secsdisp = "0" + secsdisp;
  }
  return minsdisp + ":" + secsdisp;
}

var now = new Date();

document.getElementById("currentTime").innerHTML = now.toString();

