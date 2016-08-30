angular.module('newsApp', ['ui.bootstrap', 'ui.router'])
    .constant('EVENT_SHOW_MESSAGE', 'EVENT_SHOW_MESSAGE')
    .config(
        /*@ngInject*/
        function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                rewriteLinks: false
            });
        }
    )
    .config(
        /*@ngInject*/
        function ($httpProvider) {
            $httpProvider.interceptors.push(
                /*@ngInject*/
                function ($q, $rootScope) {
                    return {
                        'responseError': function (rejection) {
                            if (rejection.data) {
                                var message = rejection.data.message ? rejection.data.message : "";
                            }
                            
                            $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                                message: "Code: " + rejection.status + " " + message
                            });
                            return $q.reject(rejection);
                        }
                    };
                }
            );
        }
    );