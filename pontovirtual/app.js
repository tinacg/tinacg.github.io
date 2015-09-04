(function() {
  var btn = document.getElementById("registrar");
  var marcacoes = load();
  updateDisplay();

  function currentTimestamp() {
    return (new Date()).toString().substr(0, 21);
  }
  
  btn.addEventListener("click", function() {
    marcacoes.unshift(currentTimestamp());
    save();
    updateDisplay();
  });

  function updateDisplay() {
    document.getElementById("marcacoes").innerHTML = marcacoes.toString().replace(/,/g, '\n');
  }
  
  function load() {
    if (localStorage.tinacg_pontovirtual_marcacoes) {
      return localStorage.tinacg_pontovirtual_marcacoes.split(",");
    } else {
      return [];
    }
  }

  function save() {
    localStorage.tinacg_pontovirtual_marcacoes = marcacoes.toString();
  }
})();
