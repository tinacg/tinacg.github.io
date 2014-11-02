angular.module('firebase.config', [])
  .constant('FBURL', 'https://faia.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');