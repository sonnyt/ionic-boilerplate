(function() {
    'use strict';

    function Run($rootScope, $location, $ionicPlatform) {
        /**
         * Ready the app
         */
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        /**
         * Change <body> class
         * it sets state name and action
         */
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if (toState.name) {
                var pieces = toState.name.split('.');

                $rootScope.pageClass = pieces.join(' ');
            }
        });
    }

    angular
        .module('App', [
            'ionic', 'ngCookies', 'ngResource',
        ])
        .run([
            '$rootScope', '$location', '$ionicPlatform',
            Run,
        ]);
})();
