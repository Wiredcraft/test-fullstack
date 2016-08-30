angular.module('newsApp')
    .controller('loginController',
        /*@ngInject*/
        function ($scope, $rootScope, $state, $uibModal, $uibModalInstance, AuthService) {
            $scope.login = function () {
                AuthService.login($scope.user).then(
                    function(res) {
                        $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                            message: "User logged in"
                        });
                        $uibModalInstance.dismiss();
                        $state.go($state.current, {}, {reload: true});
                    },
                    function(res) {
                        $uibModalInstance.dismiss();
                    }
                );
            };

        }
    )
    .controller('registerController',
        /*@ngInject*/
        function ($scope, $rootScope, $state, $uibModal, $uibModalInstance, AuthService) {
            $scope.register = function() {
                AuthService.register($scope.user).then(
                    function(res) {
                        $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                            message: "Registration succeeded. Please login"
                        });
                        $uibModalInstance.dismiss();
                        $state.go($state.current, {}, {reload: true});
                    },
                    function(res) {
                        $uibModalInstance.dismiss();
                    }
                );
            };
        }
    );