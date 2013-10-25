'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory('instagram', function($resource) {

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
