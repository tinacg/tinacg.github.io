var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope) {
  $scope.phones = [
    {'name': 'Nexus 5',
     'snippet': 'Fast got faster'},
    {'name': 'Xoom',
     'snippet': 'next tablet'},
    {'name': 'galaxy',
     'snippet': 'larger screens'},
  ];
});
