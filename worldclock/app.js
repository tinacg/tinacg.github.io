moment.tz.load({
  zones: [],
  links: [],
  version: "2014e",
});

// Display all names
// moment.tz.names();

var localtime = document.getElementById("local");
var chi = document.getElementById("chi");
var tw = document.getElementById("tw");
var ro = document.getElementById("ro");
var bei = document.getElementById("bei");

localtime.innerText = moment().tz("America/Sao_Paulo").format("HH:mm");
ny.innerText = moment().tz("America/New_York").format("HH:mm");
tw.innerText = moment().tz("Asia/Taipei").format("HH:mm");
ro.innerText = moment().tz("Europe/Rome").format("HH:mm");
bei.innerText = moment().tz("Asia/Shanghai").format("HH:mm");
