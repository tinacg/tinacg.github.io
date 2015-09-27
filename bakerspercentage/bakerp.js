




/*
     FILE ARCHIVED ON 14:54:38 Dec 11, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 0:33:42 Sep 27, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var sampleWindow = null;

function trim(str)
{  while(str.charAt(0) == (" ") )
  {  str = str.substring(1);
  }
  while(str.charAt(str.length-1) == " " )
  {  str = str.substring(0,str.length-1);
  }
  return str;
}

function removeNL(s){ 
  r = "";
  for (i=0; i < s.length; i++) {
    if (s.charAt(i) != '\n' &&
        s.charAt(i) != '\r' &&
        s.charAt(i) != '\t') {
      r += s.charAt(i);
      }
    }
  return r;
}

function printable() {
  var len = parseFloat(document.myform.length) / 4;
  if (sampleWindow) {
    unLoadPage();
  }
  var wtindex = 0;
  var wtval = "";
  var wtfl = 0;
  var normindex = 0;

  for (var i = 1; i <= len; i++) {
    wtindex = "wt" + String(i);
    wtval = document.myform.elements[wtindex].value;
    if (wtval == "") {
      wtval = "0";
    }
    var wtfl = parseFloat(wtval);
    if (wtfl > 0) {
      normindex = i;
      normwt = wtval;
    }
  }
  if (normindex == 0) {
    alert ("Weigh one ingredient, enter it in the table, and press Tab or click on another text box to compute the weights.");
    return 0;
  }

  if (document.totals.tpc.value == "0") {
    alert ("Make sure the weights in every row is filled in.");
    return 0;
  }
  sampleWindow = window.open("", "bakerPrintable", "location=no,menubar=yes,resizable=yes,scrollbars=yes,height=640,width=800");
  sampleWindow.document.writeln("<html><head>");
  sampleWindow.document.writeln("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">");
  sampleWindow.document.writeln("</head><body>");
  sampleWindow.document.writeln("<b>Baker's percentage calculator<br><br>");
  sampleWindow.document.writeln(document.myform.recipename.value);
  sampleWindow.document.writeln("</b><br><br><table border=\"1\" cellpadding=\"5\" cellspacing=\"1\">");
  sampleWindow.document.writeln("<tr><td align=\"center\"><i>ingredient</i></td><td align=\"center\"><i>%</i></td><td align=\"center\"><i>weight, g</i></td>");
  for (var i = 1; i <= len; i++) {
    var iindex = "i" + String(i);
    var isindex = "is" + String(i);
    var pcindex = "pc" + String(i);
    var wtindex = "wt" + String(i);
    if (document.myform.elements[wtindex].value != "") {
      sampleWindow.document.writeln("<tr>\n");
      sampleWindow.document.writeln("<td align=\"right\">" + document.myform.elements[iindex].value + "&nbsp;" + document.myform.elements[isindex].value + "</td>");
      sampleWindow.document.writeln("<td align=\"right\">" + document.myform.elements[pcindex].value + "</td>");
      sampleWindow.document.writeln("<td align=\"right\">" + document.myform.elements[wtindex].value + "</td>");
      sampleWindow.document.writeln("</tr>");
    }
  }
  sampleWindow.document.writeln("</table>");
  sampleWindow.document.writeln("<br>Total %: " + document.totals.tpc.value);
  sampleWindow.document.writeln("; Total weight: " + document.totals.twt.value + " grams");
  if (document.notes.misc.value != "") {
    sampleWindow.document.writeln("<br><br><b>Additional notes:</b><br><pre>" + document.notes.misc.value + "</pre>");
  }
  sampleWindow.document.writeln("<hr width=\"90%\" align=\"left\"><i>Baker's Percentage Calculator by Heitor Chang<br>/web/20131211145438/http://homepages.nyu.edu/~hc742/bakerspercentage.html</i>");
  sampleWindow.document.writeln("<br><br></body></html>");
  sampleWindow.document.close();
}

function unLoadPage() {
  if (sampleWindow) {
     sampleWindow.close();
     sampleWindow = null;
  }
}

function clearCol(colname) {
  var len = parseFloat(document.myform.length) / 4;
  for (var i = 1; i <= len; i++) {
    var index = colname + String(i);
    document.myform.elements[index].value = "";
    if (colname == "i") {
      var dropindex = "is" + String(i);
      document.myform.elements[dropindex].options[0].selected=1;
    }
  }
  if (colname == "wt") {
    document.totals.twt.value="0";
    document.totals.tpc.value="0";
  }
}

function computeWeights(normindex) {
  var len = parseFloat(document.myform.length) / 4;
  var wtindex = "";
  var wtval = "";
  var wtfl = 0.0;
  var pcindex = "";
  var pcval = "";
  var pcfl = 0.0;
  // var normindex = 0;
  var normwt = 0;
  var normpc = 0;
  var newval = 0;
  //identify non-zero weight
  //for (var i = 1; i <= len; i++) {
    //wtindex = "wt" + String(i);
    //wtval = document.myform.elements[wtindex].value;
    //if (wtval == "") {
    //  wtval = "0";
    //}
    //wtfl = parseFloat(wtval);
    //if (wtfl > 0) {
    //  normindex = i;
    //  normwt = wtval;
    //}
  //}
  //if (normindex == 0) {
  wtindex = "wt" + String(normindex);
  wtval = document.myform.elements[wtindex].value;
  normwt = wtval;
  if (wtval == "") {
    // alert ("Weigh one ingredient, enter it in the table, and press Tab or click on another text box.");
    return 0;
  }

  pcindex = "pc" + String(normindex);
  normpc = parseFloat(document.myform.elements[pcindex].value);

  for (i = 1; i <= len; i++) {
    pcindex = "pc" + String(i);
    pcval = document.myform.elements[pcindex].value;
    pcfl = parseFloat(pcval);

    wtindex = "wt" + String(i);
    newval = (pcval/normpc) * normwt;
    if (newval > 0) {
      document.myform.elements[wtindex].value = newval.toFixed(1);
    }
  }

  var totalwt=0.0;
  var totalpc=0.0;

  for (i = 1; i <= len; i++) {
    pcindex = "pc" + String(i);
    pcval = document.myform.elements[pcindex].value;
    if (pcval == "") {
      pcval = "0";
    }
    pcfl = parseFloat(pcval);

    wtindex = "wt" + String(i);
    wtval = document.myform.elements[wtindex].value;
    if (wtval == "") {
      wtval = "0";
    }
    wtfl = parseFloat(wtval);
    totalwt += wtfl;
    totalpc += pcfl;
  }
  document.totals.tpc.value=totalpc.toFixed(4);
  document.totals.twt.value=totalwt.toFixed(1);
}

function saverecipe() {
  var len = parseFloat(document.myform.length) / 4;
  var statestr = document.myform.recipename.value;

  for (var i = 1; i <= len; i++) {
    var iindex = "i" + String(i);
    var isindex = "is" + String(i);
    var pcindex = "pc" + String(i);
    if (document.myform.elements[pcindex].value != "") {
      statestr = statestr + "|" + document.myform.elements[iindex].value + " " + document.myform.elements[isindex].value + "|" + document.myform.elements[pcindex].value;
    }
  }
  statestr = statestr + "|" + document.notes.misc.value;

  document.savestate.state.value = statestr;  
}

function loadrecipe() {
  if (document.savestate.state.value=="") {
    alert("Nothing to load! Paste a saved recipe from your computer, or go to the Additional Recipes page for examples.");
    return 0;
  }
  document.myform.reset();
  clearCol('i');
  clearCol('is');
  clearCol('pc');
  clearCol('wt');
  document.notes.reset();
  document.totals.reset();
  var data = document.savestate.state.value.split("|");
  document.myform.recipename.value=removeNL(data[0]);
  var rowindex = 1;
  if(((data.length-2)/2) > 12 && document.myform.islong.value!="T") {
    alert("Your recipe has more than 12 ingredients. Make sure you are using the long version of the page or information will be lost.");
  }
  for (var i = 1; i < data.length/2; i++) {
    var iindex = "i" + String(rowindex);
    var pcindex = "pc" + String(rowindex);
    document.myform.elements[iindex].value = trim(removeNL(data[2*(i-1)+1]));
    document.myform.elements[pcindex].value = removeNL(data[2*i]);
    rowindex++;
  }
  document.notes.misc.value=data[data.length-1];
}