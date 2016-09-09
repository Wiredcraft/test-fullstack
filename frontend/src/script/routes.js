angular.module('newsApp').config(
    /*@ngInject*/
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                url: "/",
                views: {
                    'content@': {
                        templateUrl: "layout/talkList.html",
                        controller: 'TalkListController'
                    }
                }
            });
    });
