angular.module('newsApp')
    .controller('TalkListController',
        /*@ngInject*/
        function ($scope, $rootScope, $uibModal, AuthService, TalkService) {
            $scope.talks = [];

            $scope.isAuthenticated = AuthService.authenticated();

            $scope.logout = function() {
                AuthService.logout();
                $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                    message: "Logged out"
                });
                $scope.talks = [];
                $scope.isAuthenticated = AuthService.authenticated();
            };

            $scope.updateTalkList = function() {
                TalkService.getTalks().then(
                    function(res) {
                        $scope.talks = res.data;
                    }
                );
            };

            if (AuthService.authenticated()) $scope.updateTalkList();

            $scope.rateTalk = function(talkId, value) {
                value = parseInt(value);
                if (value !== 1 && value !== -1) {
                    return;
                }

                var payload = {rating: value};
                console.log(payload);
                TalkService.rateTalk(talkId, payload).then(
                    function(res) {
                        $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                            message: "A talk rated"
                        });
                        $scope.updateTalkList();
                    }
                );
            };


            // Modal popup
            $scope.openModal = function (modal) {
                var modal_mapping = {
                    'login' : {
                        templateUrl: "loginModal",
                        controller: 'loginController'
                    },
                    'register' : {
                        templateUrl: "registerModal",
                        controller: 'registerController'
                    },
                    'createTalk' : {
                        templateUrl: "newTalkModal",
                        controller: 'TalkCreateController'
                    }
                };
                var modalInstance = $uibModal.open({
                    templateUrl: modal_mapping[modal].templateUrl,
                    controller: modal_mapping[modal].controller
                });
            };
        }
    )
    .controller('TalkCreateController',
        /*@ngInject*/
        function ($scope, $rootScope, $state, $uibModal, $uibModalInstance, TalkService) {
            $scope.createTalk = function() {
                TalkService.createTalk($scope.talk).then(
                    function(res) {
                        $rootScope.$broadcast('EVENT_SHOW_MESSAGE', {
                            message: "New talk created"
                        });
                        $uibModalInstance.dismiss();
                        $state.go($state.current, {}, {reload: true});
                    }
                );
            };

        }
    );

