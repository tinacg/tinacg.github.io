var alertWindow;
var intv;

document.getElementById("clearMessage").addEventListener("click", function() {
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("message").value = "";
});

document.getElementById("testButton").addEventListener("click", function() {
  this.value = "Wait 3 seconds";
  setTimeout(function() {
    alertWindow = window.open("test window", "testWindow", "location=no,menubar=yes,resizable=yes,scrollbars=yes,height=100,width=500");
    alertWindow.document.write("<h1>Browser accepts opening windows</h1>");
  }, 3000);
});

document.getElementById("startTimer").addEventListener("click", function() {
  var startDate = (new Date()).getTime();

  var hrs = parseInt(document.getElementById("hours").value) || 0;
  var mins = parseInt(document.getElementById("minutes").value) || 0;
  var secs = (3600 * hrs) + (60 * mins);

  document.title = "Start...";
  
  clearInterval(intv);
  
  intv = setInterval(function () {
    document.title = secstohms(secs - secsDiff(startDate));
    document.getElementById("secondsLeft").innerHTML = secstohms(secs - secsDiff(startDate));
    if ((secs - secsDiff(startDate)) <= 0) {
      clearInterval(intv);
      if (alertWindow) {
        alertWindow.close();
      }
      alertWindow = window.open("alert window", "alertWindow", "location=no,menubar=yes,resizable=yes,scrollbars=yes,height=100,width=500");
      var msg = document.getElementById("message").value || "TiNAlert time's up";
      alertWindow.document.write("<h1>" + msg + "</h1>");
      alertWindow.document.close();

      document.title = "Time's up!";
    }
  }, 1000);
});

function secsDiff(start) {
  return Math.floor(((new Date()).getTime() - start) / 1000);
}

function secstomins(s) {
  var secsdisp = s % 60;
  var minsdisp = Math.floor(s / 60);
  if (minsdisp < 10) {
    minsdisp = "0" + minsdisp;
  }
  if (secsdisp < 10) {
	secsdisp = "0" + secsdisp;
  }
  return minsdisp + ":" + secsdisp;
}

function secstohms(s) {
  // s < 3600 is 0:59:59
  var hoursdisp = Math.floor(s / 3600);
  var secsleft = s - hoursdisp * 3600;
  return hoursdisp + ":" + secstomins(secsleft);
}

var now = new Date();

document.getElementById("currentTime").innerHTML = now.toString();

