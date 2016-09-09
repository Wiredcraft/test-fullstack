angular.module('newsApp')

    .factory('TalkService',
        /*@ngInject*/
        function ($http, conf) {
            var getTalks = function () {
                return $http.get(
                    conf.apiUrl + '/talk'
                );
            };

            var createTalk = function(talk) {
                return $http.post(
                    conf.apiUrl + '/talk',
                    talk
                );
            };

            var rateTalk = function(talkId, rating) {
                return $http.post(
                    conf.apiUrl + '/talk/' + talkId + '/rating',
                    rating
                );
            };

            return {
                getTalks: getTalks,
                createTalk: createTalk,
                rateTalk: rateTalk
            };
        });