var intp = new BiwaScheme.Interpreter();

document.getElementById("evalSingle").addEventListener("click", function () {
  intp.evaluate("(print (" + document.getElementById("singleLineCode").value + "))");
});

document.getElementById("clearSingle").addEventListener("click", function() {
  document.getElementById("singleLineCode").value = "";
  document.getElementById("singleLineCode").focus();
});

document.getElementById("eval").addEventListener("click", function () {
  intp.evaluate(document.getElementById("code").value);
});

document.getElementById("clearCode").addEventListener("click", function() {
  document.getElementById("code").value = "";
});

document.getElementById("clearOutput").addEventListener("click", function() {
  document.getElementById("bs-console").innerHTML = "";
});

