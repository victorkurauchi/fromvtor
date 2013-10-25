'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('diHref', ['$location', '$route',
        function($location, $route) {
    return function(scope, element, attrs) {
        scope.$watch('diHref', function() {
            if(attrs.diHref) {
                element.attr('href', attrs.diHref);
                element.bind('click', function(event) {
                    console.log('clied');
                    scope.$apply(function(){
                        if($location.path() == attrs.diHref) $route.reload();
                    });
                });
            }
        });
    }
}]);
