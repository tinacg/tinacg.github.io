var sampleWindow = null;

function loadReviewPage(numWords, secNum) {
    if (sampleWindow) {
      unLoadPage();
    }

    var gotWord = 0;

    sampleWindow = window.open("", "chineseReview", "location=no,menubar=yes,resizable=yes,height=480,width=600");
    sampleWindow.document.writeln("<html><head>");
    sampleWindow.document.writeln("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">");
    sampleWindow.document.writeln("</head><body>");
    sampleWindow.document.writeln("<b>2nd Yr. Chinese - ");
    sampleWindow.document.writeln(secNum + " Vocabulary Review</b><br>");

    sampleWindow.document.writeln("<table border=\"1\" cellpadding=\"5\" cellspacing=\"1\" width=\"100%\">");
    for (var i = 1; i < numWords; i++) {
	var name = "Box" + String(i);
	var cur = document.images[name].src;

	//r tradIndex = "anstrad" + String(i);
	//r pinyIndex = "anspinyin" + String(i);
	//r englIndex = "ansenglish" + String(i);
	
	//alert(
	if (cur.indexOf("red") > -1) {
	    gotWord = 1;
	    var firstIndex = "ans" + document.reviewPg.selectCol1.options[document.reviewPg.selectCol1.selectedIndex].value + String(i);
	    var secondIndex = "ans" + document.reviewPg.selectCol2.options[document.reviewPg.selectCol2.selectedIndex].value + String(i);
	    var thirdIndex = "ans" + document.reviewPg.selectCol3.options[document.reviewPg.selectCol3.selectedIndex].value + String(i);
	    var bookIndex = "ansbookNum" + String(i);

	    sampleWindow.document.writeln("<tr>\n");
	    sampleWindow.document.writeln("<td width=\"10%\">" + document.response.elements[bookIndex].value + "</td>");
	    sampleWindow.document.writeln("<td width=\"20%\"><font size=\"+2\">" + document.response.elements[firstIndex].value + "</font></td>");
	    sampleWindow.document.writeln("<td width=\"30%\">" + document.response.elements[secondIndex].value + "</td>");
	    sampleWindow.document.writeln("<td width=\"40%\">" + document.response.elements[thirdIndex].value + "</td>");
	    sampleWindow.document.writeln("</tr>");
	}
    }
    sampleWindow.document.writeln("</table>");

    if (gotWord == 0) {
	sampleWindow.document.writeln("<br><b>Please mark at least one word by clicking on the small square in its row.</b>");
    }

    sampleWindow.document.writeln("<hr width=\"50%\" align=\"left\"><i>http://cgi.stanford.edu/~hc10/cgi-bin/chinese/main.pl</i>");
    sampleWindow.document.writeln("<br><br></body></html>");
}

function unLoadPage() {
    if (sampleWindow) {
       sampleWindow.close();
       sampleWindow = null;
    }
}

function replace(string,text,by) {
    // Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;
    
    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}

function reveal(index) {
    var ansindex = "ans" + String(index);
    var ansbox = String(index);
    var display = document.response.elements[ansindex].value;
    display = replace(display, '#', '/');
    document.answer.elements[ansbox].value = display;
}

function give(index) {
    var ansindex = "ans" + String(index);
    var ansbox = String(index);
    var display = document.response.elements[ansindex].value;
    display = replace(display, '#', '/');
    document.response.elements[ansbox].value = display;
}

function check(index) {
    reveal(index);
    var textbox = String(index);
    var hiddenanswer = "ans" + String(index);

    var rawans = document.response.elements[hiddenanswer].value;
    var altans = "BLANK";
    var divider = rawans.indexOf("#");

    if (divider > -1) {
	altans = rawans.substr(divider + 1, rawans.length);
	rawans = rawans.substr(0, divider);
    }

    var yourans_nospc = replace(document.response.elements[textbox].value, ' ', '');
    var rawans_nospc = replace(rawans, ' ', '');
    var altans_nospc = replace(altans, ' ', '');

    //if(document.response.elements[textbox].value == rawans || document.response.elements[textbox].value == altans) {
    if(yourans_nospc == rawans_nospc || yourans_nospc == altans_nospc) {
	// green
	document.response.elements[textbox].style.backgroundColor = "#AAFFAA";
    }
    else {
	if(document.response.elements[textbox].value == "") {
	    // leave white
	    document.response.elements[textbox].style.backgroundColor = "#FFFFFF";
	}
	else {
	    // red
	    document.response.elements[textbox].style.backgroundColor = "#FFAAAA";
	}
    }
}

function cleanForm(formIndex) {
    document.forms[formIndex].reset();
    var cleanColor = 16777215 - ((parseInt(formIndex) - 2) * 1118481);
    var size = parseInt(document.answer.length) / 3;

    for (var i = 1; i <= size; i++) {
	var tradbox = "trad" + String(i);
	//	var simpbox = "simp" + String(i);
	var pinyinbox = "pinyin" + String(i);
	var englishbox = "english" + String(i);
	document.forms[formIndex].elements[tradbox].style.backgroundColor = "#" + cleanColor.toString(16);
	//	document.forms[formIndex].elements[simpbox].style.backgroundColor = "#" + cleanColor.toString(16);
	document.forms[formIndex].elements[pinyinbox].style.backgroundColor = "#" + cleanColor.toString(16);
	document.forms[formIndex].elements[englishbox].style.backgroundColor = "#" + cleanColor.toString(16);
	document.forms[formIndex].elements[tradbox].value = "";
	//	document.forms[formIndex].elements[simpbox].value = "";
	document.forms[formIndex].elements[pinyinbox].value = "";
	document.forms[formIndex].elements[englishbox].value = "";
    }
}

function setBoxes(onOff) {
    var size = parseInt(document.answer.length) / 3;
    if (parseInt(onOff) == 0) {
	var boxName = "emptybox.gif";
    }
    else {
	var boxName = "redbox.gif";
    }
    for (var i = 1; i <= size; i++) {
	var name= "Box" + String(i);
	document.images[name].src =
	    "http://www.stanford.edu/~hc10/greek/images/" + boxName;
    }
}

function checkAll(category) {
    var size = parseInt(document.answer.length) / 3;

    if (size < 1) {
        size = 1;
    }

    for (var i = 1; i <= size; i++) {
	check(category + String(i));
    }
}

function giveAll(category) {
    var size = parseInt(document.answer.length) / 3;

    if (size < 1) {
        size = 1;
    }

    for (var i = 1; i <= size; i++) {
	give(category + String(i));
    }
}

function checkRange(begin, end) {
    if (parseInt(end) < parseInt(begin)) {
	end = begin;
    }
    for (var i = parseInt(begin); i <= parseInt(end); i++) {
	check(i);
    }
}

function py2utf(index) { 
    var textbox = "pinyin" + String(index);
    text = document.response.elements[textbox].value;
    var key = document.all ? event.keyCode : 0;
    if (key == 8 || key == 16 || key == 17 || key == 18 || key == 20 || key == 33 || key == 34 || key == 36 || key == 37 || key == 38 || key == 39 || key == 40 || key == 45 || key == 46) {
	return;
    }
    
    text = replace(text,'u:an1','üān');
    text = replace(text,'u:an2','üán');
    text = replace(text,'u:an3','üǎn');
    text = replace(text,'u:an4','üàn');
    text = replace(text,'u:e1','üē');
    text = replace(text,'u:e2','üé');
    text = replace(text,'u:e3','üě');
    text = replace(text,'u:e4','üè');
    text = replace(text,'a1','ā');
    text = replace(text,'a2','á');
    text = replace(text,'a3','ǎ');
    text = replace(text,'a4','à');
    text = replace(text,'ai1','āi');
    text = replace(text,'ai2','ái');
    text = replace(text,'ai3','ǎi');
    text = replace(text,'ai4','ài');
    text = replace(text,'an1','ān');
    text = replace(text,'an2','án');
    text = replace(text,'an3','ǎn');
    text = replace(text,'an4','àn');
    text = replace(text,'ang1','āng');
    text = replace(text,'ang2','áng');
    text = replace(text,'ang3','ǎng');
    text = replace(text,'ang4','àng');
    text = replace(text,'ao1','āo');
    text = replace(text,'ao2','áo');
    text = replace(text,'ao3','ǎo');
    text = replace(text,'ao4','ào');
    text = replace(text,'ar1','ār');
    text = replace(text,'ar2','ár');
    text = replace(text,'ar3','ǎr');
    text = replace(text,'ar4','àr');
    text = replace(text,'e1','ē');
    text = replace(text,'e2','é');
    text = replace(text,'e3','ě');
    text = replace(text,'e4','è');
    text = replace(text,'ei1','ēi');
    text = replace(text,'ei2','éi');
    text = replace(text,'ei3','ěi');
    text = replace(text,'ei4','èi');
    text = replace(text,'en1','ēn');
    text = replace(text,'en2','én');
    text = replace(text,'en3','ěn');
    text = replace(text,'en4','èn');
    text = replace(text,'eng1','ēng');
    text = replace(text,'eng2','éng');
    text = replace(text,'eng3','ěng');
    text = replace(text,'eng4','èng');
    text = replace(text,'er1','ēr');
    text = replace(text,'er2','ér');
    text = replace(text,'er3','ěr');
    text = replace(text,'er4','èr');
    text = replace(text,'i1','ī');
    text = replace(text,'i2','í');
    text = replace(text,'i3','ǐ');
    text = replace(text,'i4','ì');
    text = replace(text,'in1','īn');
    text = replace(text,'in2','ín');
    text = replace(text,'in3','ǐn');
    text = replace(text,'in4','ìn');
    text = replace(text,'ing1','īng');
    text = replace(text,'ing2','íng');
    text = replace(text,'ing3','ǐng');
    text = replace(text,'ing4','ìng');
    text = replace(text,'ir1','īr');
    text = replace(text,'ir2','ír');
    text = replace(text,'ir3','ǐr');
    text = replace(text,'ir4','ìr');
    text = replace(text,'o1','ō');
    text = replace(text,'o2','ó');
    text = replace(text,'o3','ǒ');
    text = replace(text,'o4','ò');
    text = replace(text,'ong1','ōng');
    text = replace(text,'ong2','óng');
    text = replace(text,'ong3','ǒng');
    text = replace(text,'ong4','òng');
    text = replace(text,'ou1','ōu');
    text = replace(text,'ou2','óu');
    text = replace(text,'ou3','ǒu');
    text = replace(text,'ou4','òu');
    text = replace(text,'u1','ū');
    text = replace(text,'u2','ú');
    text = replace(text,'u3','ǔ');
    text = replace(text,'u4','ù');
    text = replace(text,'un1','ūn');
    text = replace(text,'un2','ún');
    text = replace(text,'un3','ǔn');
    text = replace(text,'un4','ùn');
    text = replace(text,'u:1','ǖ');
    text = replace(text,'u:2','ǘ');
    text = replace(text,'u:3','ǚ');
    text = replace(text,'u:4','ǜ');
    document.response.elements[textbox].value = text;  
}
