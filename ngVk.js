angular
    .module('ngVk', [
        'angularLoad'
    ])
    .factory('vkSimplekHash', function () {
        return function (str) {
            str.split("").reduce(function (a, b) {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a
            }, 0);
        }
    })
    .run(function (vkAppId, angularLoad, vkApi) {
        angularLoad.loadScript('//vk.com/js/api/openapi.js').then(function () {
            VK.init({apiId: vkAppId, onlyWidgets: true});
            vkApi.set(VK);
        }).catch(function () {
            console.log('can\'t load vk api, please report this here https://github.com/shekspir55/ngVk')
        });
    })
    .factory('vkApi', function () {
        var factoryCallback = function () {

        };
        return {
            set: function (vkApi) {
                factoryCallback(vkApi);
            },
            onSet: function (callback) {
                factoryCallback = callback;
            }
        };
    })
    .directive('vkComments',
        function ($window, $timeout, $location, vkApi, vkSimplekHash) {
            return {
                restrict: 'E',
                scope: {
                    readyToBind: '@',
                    url: '@'
                },
                replace: !0,
                transclude: !0,
                link: function (scope, $element, $attr) {
                    vkApi.onSet(function (vkApi) {
                        scope.$watch('readyToBind', function () {
                            $timeout(function () {
                                $element.html('');
                                $window.vkComment = vkApi.Widgets.Comments('vk_comments', {
                                    limit: 10,
                                    attach: '*',
                                    autoPublish: 1,
                                    mini: 1
                                }, vkSimplekHash(scope.url || $location.path()));
                            }, 100);
                        });
                    });
                },
                template: '<div id="vk_comments" ng-transclude post-url="{{url}}"></div>'
            }
        });
