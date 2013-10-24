// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module("switchableGrid", ['ngResource']);

// Create and register the new "instagram" service
app.factory('instagram', function($resource) {

    return {
        fetchPopular: function(token, tag, userid, callback) {

            // The ngResource module gives us the $resource service. It makes working with
            // AJAX easy. Here I am using a client_id of a test app. Replace it with yours.

            var api = $resource('https://api.instagram.com/v1/users/' + userid + '/media/recent?count=-1&client_id=:client_id&access_token=:token_id&callback=JSON_CALLBACK',{
                client_id: '4f9122151c4a45b887421a2afaa8efc1',
                token_id : token
            },{
                // This creates an action which we've chosen to name "fetch". It issues
                // an JSONP request to the URL of the resource. JSONP requires that the
                // callback=JSON_CALLBACK part is added to the URL.

                fetch:{method:'JSONP'}
            });

            api.fetch(function(response){

                // Call the supplied callback function
                callback(response.data);

            });
        }
    }

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

function SwitchableGridController($scope, $http, instagram){

    // Default layout of the app. Clicking the buttons in the toolbar
    // changes this value.

    $scope.layout = 'grid';

    $scope.pics = [];
    var arr = [];

    if (getHashValue('access_token') !== null) {
        var token = getHashValue('access_token');
    }

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

    $scope.getText = function() {

        console.log('called');
        
        $http.get('text/text.json').success(function(data) {
          $scope.texts = data;
        });

        $scope.layout = 'text';
     
        $scope.orderProp = 'since';
    }

}

function getHashValue(key) {
    return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
}
