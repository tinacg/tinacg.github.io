(function() {
  var start = document.getElementById('startDatepicker');
  var picker = new Pikaday({field: start, format: 'YYYY-MM-DD'});

  var end = document.getElementById('endDatepicker');
  var picker = new Pikaday({field: end, format: 'YYYY-MM-DD'});

  var dateDiffElem = document.getElementById('dateDiff');
  
  var operations = document.getElementsByName('operation');

  var yearsElem = document.getElementById('numYears');
  var monthsElem = document.getElementById('numMonths');
  var weeksElem = document.getElementById('numWeeks');
  var daysElem = document.getElementById('numDays');
  var repeatElem = document.getElementById('numRepeat');
  
  // var runCalc = document.getElementById('runCalc');
  var clear = document.getElementById('clear');
  var resultArea = document.getElementById('result');

  start.value = moment().format("YYYY-MM-DD");
  end.value = moment().format("YYYY-MM-DD");
  
  function calculate(start) {
    var years = parseInt(document.getElementById('numYears').value);
    var months = parseInt(document.getElementById('numMonths').value);
    var weeks = parseInt(document.getElementById('numWeeks').value);
    var days = parseInt(document.getElementById('numDays').value);

    // var resultFormat = document.getElementById('resultFormat').value;
    // var resultFormat = "DD MMM YYYY";
    var resultFormat = "YYYY-MM-DD";
    
    var momentOperation = 'add';
    if (operations[1].checked) {
      momentOperation = 'subtract';
    }
    return moment(start)[momentOperation]({
      days: days,
      weeks: weeks,
      months: months,
      years: years,
    }).format(resultFormat);
  }

  function repeatCalc(times, start, numiter) {
    if (times > 0) {
      var result = calculate(start);
      if (start !== result) {
        resultArea.innerHTML += moment(result).format("D MMM YYYY") + "<br>";
      }
      repeatCalc(times - 1, result);
    }
  }

  function calculateDateDiff(start, end) {
    dateDiffElem.innerHTML = moment(end).diff(start, 'days');
  }
  
  function updateResult() {
    resultArea.innerHTML = "";
    var repeatTimes = parseInt(document.getElementById('numRepeat').value);
    repeatCalc(repeatTimes, start.value);
    calculateDateDiff(start.value, end.value);
  }

  for (var i = 0; i < operations.length; i++) {
    operations[i].onclick = updateResult;
  }
  
  start.onchange = updateResult;
  end.onchange = updateResult;

  // runCalc.onclick = updateResult;
  clear.onclick = function() {
    yearsElem.value = "";
    monthsElem.value = "";
    weeksElem.value = "";
    daysElem.value = "";
    resultArea.innerHTML = "";
  };

  yearsElem.onkeyup = updateResult;
  monthsElem.onkeyup = updateResult;
  weeksElem.onkeyup = updateResult;
  daysElem.onkeyup = updateResult;
  repeatElem.onkeyup = updateResult;
  
})();
