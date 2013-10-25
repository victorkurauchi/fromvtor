'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewlist', {templateUrl: 'partials/viewlist.html', controller: 'listController'});
  $routeProvider.when('/viewgrid', {templateUrl: 'partials/viewgrid.html', controller: 'gridController'});
  $routeProvider.when('/viewtext', {templateUrl: 'partials/viewtext.html', controller: 'textController'});
  $routeProvider.when('/viewdefault', {templateUrl: 'partials/viewdefault.html', controller: 'defaultController'});
  $routeProvider.otherwise({redirectTo: '/viewdefault'})
}]);