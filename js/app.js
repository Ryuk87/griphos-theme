(function(){

    // Angular bootstrap
    angular.module('griphos', ['ngRoute']);

    // Angular route config
    angular.module('griphos').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/about', {
                templateUrl: '/js/views/about.html'
            })
            .when('/contacts', {
                templateUrl: '/js/views/contacts.html'
            })
            .otherwise({
               templateUrl: '/js/views/main.html'
            });
    }]);
})();