(function() {
  var buttonEncrypt = document.getElementById("buttonEncrypt");
  var buttonDecrypt = document.getElementById("buttonDecrypt");

  var password = document.getElementById("password");
  var plaintext = document.getElementById("plaintext");
  var encrypted = document.getElementById("encrypted");

  buttonEncrypt.addEventListener('click', function() {
    encrypted.value = sjcl.encrypt(password.value, plaintext.value);
  });

  buttonDecrypt.addEventListener('click', function() {
    plaintext.value = sjcl.decrypt(password.value, encrypted.value);
  });

})();
