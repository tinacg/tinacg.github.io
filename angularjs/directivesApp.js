(function() {
  var app = angular.module('directivesApp', [])
    .controller('MainCtrl', ['$scope', function($scope) {

    }])

    .directive("helloWorld", function() {
      return {
        scope: {
          color: '='
        },
        restrict: 'E',
        replace: true,
        template: '<p style="background:{{color}}">Hello world',
        link: function(scope, elem, attrs) {
          elem.bind('click', function() {
            elem.css('background', 'white');
            scope.$apply(function() {
              scope.color = 'white';
            });
          });
          elem.bind('mouseover', function() {
            elem.css('cursor', 'pointer');
          });
        }
      }
    });
})();
