var localtime = document.getElementById("local");
var chi = document.getElementById("chi");
var tw = document.getElementById("tw");
// var hk = document.getElementById("hk");

moment.tz.load({
  zones: [],
  links: [],
  version: "2014e",
});

moment.tz.names();

localtime.innerHTML = moment().tz("America/Sao_Paulo").format("HH:mm");
chi.innerHTML = moment().tz("America/Chicago").format("HH:mm");
tw.innerHTML = moment().tz("Asia/Taipei").format("HH:mm");
// hk.innerHTML = moment().tz("Asia/Hong_Kong").format("HH:mm");
