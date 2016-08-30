angular.module('newsApp')
    .directive('enterDown', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.enterDown);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('globalNotify',
        /*@ngInject*/
        function(EVENT_SHOW_MESSAGE) {
            return {
                restrict: "AE",
                template: '<p class="text"></p>',
                link: function(scope, element) {
                    element.hide();
                    var show = function(message) {
                        element.find('.text').text(message);
                        element.fadeIn();

                        setTimeout(function() {
                            element.fadeOut();
                        }, 3000);
                    };
                    scope.$on(EVENT_SHOW_MESSAGE, function(event, args) {
                        show(args.message);
                    });
                }
            };
        }
    );