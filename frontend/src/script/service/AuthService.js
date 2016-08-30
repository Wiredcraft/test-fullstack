angular.module('newsApp')
    .factory('AuthService',
        /*@ngInject*/
        function ($http, conf) {
            var LOCAL_TOKEN_KEY = '';
            var isAuthenticated = false;
            var authToken;

            var loadUserCredentials = function () {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
                if (token) {
                    useCredentials(token);
                }
            };

            var storeUserCredentials = function (token) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                useCredentials(token);
            };

            var useCredentials = function (token) {
                isAuthenticated = true;
                authToken = token;
                $http.defaults.headers.common.Authorization = authToken;
            };

            var destroyUserCredentials = function () {
                authToken = undefined;
                isAuthenticated = false;
                $http.defaults.headers.common.Authorization = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            };

            var register = function (user) {
                return $http.post(
                    conf.apiUrl + '/user',
                    user
                );
            };

            var login = function (user) {
                return $http.post(
                    conf.apiUrl + '/session',
                    user
                ).then(
                    function(res) {
                        storeUserCredentials(res.data.token);
                    }
                );
            };

            var logout = function () {
                destroyUserCredentials();
            };

            var authenticated = function () {
                return isAuthenticated;
            };

            loadUserCredentials();

            return {
                login: login,
                register: register,
                logout: logout,
                authenticated: authenticated
            };
        });