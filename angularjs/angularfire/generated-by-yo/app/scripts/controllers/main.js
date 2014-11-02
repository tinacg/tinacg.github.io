'use strict';

/**
 * @ngdoc function
 * @name zucchiniStoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zucchiniStoreApp
 */
angular.module('zucchiniStoreApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
