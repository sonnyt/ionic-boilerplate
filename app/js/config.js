(function() {
    'use strict';

    /**
     * App Config
     */
    function Config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');
    }

    angular
        .module('App')
        .config([
            '$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
            Config,
        ]);
})();