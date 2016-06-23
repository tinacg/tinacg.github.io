var intp = new BiwaScheme.Interpreter();

document.getElementById("clear").addEventListener("click", function () {
  document.getElementById("singleLineCode").value = "";
});

document.getElementById("eval").addEventListener("click", function () {
  var bsConsole = document.getElementById("bs-console");

  bsConsole.innerHTML = "";
  intp.evaluate("(print (" + document.getElementById("singleLineCode").value + "))");

  if (bsConsole.innerHTML === "") {
    bsConsole.innerHTML = "error";
  }
});

document.getElementById("bksp").addEventListener("click", function () {
  var focused = document.getElementById("singleLineCode");
  var removedSelection = removeSelection();
  var caretPos = focused.selectionStart;
  var newCaretPos = caretPos;

  if (!removedSelection) {
    var textBeforeBackspace = focused.value;
    focused.value = textBeforeBackspace.slice(0, Math.max(0, caretPos-1)) + textBeforeBackspace.slice(caretPos);
    newCaretPos = Math.max(0, caretPos - 1);
  }
  focused.setSelectionRange(newCaretPos, newCaretPos);
});

function removeSelection() {
  var answerElem = document.getElementById("singleLineCode");
  
  var selectStart = answerElem.selectionStart;
  var selectEnd = answerElem.selectionEnd

  if (selectEnd - selectStart > 0) {
    var text = answerElem.val();
    answerElem.val(text.slice(0, selectStart) + text.slice(selectEnd));
    answerElem.setSelectionRange(selectStart, selectStart);
    return true;
  }
}

function addToInput(str) {
  var focused = document.getElementById("singleLineCode");

  // remove selection, if any
  var removedSelection = removeSelection();
  var caretPos = focused.selectionStart;
  var text = focused.value;

  text = text.slice(0, caretPos) + str + text.slice(caretPos);

  focused.value = text;

  var strLen = str.length;
  // move caret position forward
  focused.setSelectionRange(caretPos + strLen, caretPos + strLen);
}

function addClickListener(id, str) {
  document.getElementById(id).addEventListener("click", function () {
    addToInput(str);
  });
}

addClickListener("one", "1");
addClickListener("two", "2");
addClickListener("three", "3");
addClickListener("four", "4");
addClickListener("five", "5");
addClickListener("six", "6");
addClickListener("seven", "7");
addClickListener("eight", "8");
addClickListener("nine", "9");
addClickListener("zero", "0");
addClickListener("dot", ".");

addClickListener("leftParen", "(");
addClickListener("rightParen", ")");
addClickListener("space", " ");

addClickListener("divide", "/ ");
addClickListener("multiply", "* ");
addClickListener("subtract", "- ");
addClickListener("add", "+ ");

addClickListener("sqrt", "sqrt ");
addClickListener("expt", "expt ");
addClickListener("log", "log ");
addClickListener("exp", "exp ");
