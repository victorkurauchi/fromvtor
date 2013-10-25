'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []).
  controller('listController', function listController($scope, $http, instagram) {

  })
  .controller('gridController', function gridController($scope, $http, instagram) {

    

  })
  .controller('textController', function textController($scope, $http) {


        $http.get('text/text.json').success(function(data) {
          $scope.texts = data;
        });

        $scope.layout = 'text';
     
        $scope.orderProp = 'since';

  })
  .service('instagram', function () {

    var token = getHashValue('access_token');

    if (typeof token != 'undefined') {

        var userid = [223060785, 196583629];

        for (var i = 0; i < userid.length; i++) {
            // Use the instagram service and fetch a list of the popular pics
            instagram.fetchPopular(token, 'love', userid[i], function(data) {

                // Assigning the pics array will cause the view
                $scope.pics = data;
                
            }); 
        }
    }  

  })
  .controller('defaultController', ['instagram', function ($scope, $http, instagram) {

    $scope.layout = 'grid';
    $scope.pics   = [];

  }]);

function getHashValue(key) {
    return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
}