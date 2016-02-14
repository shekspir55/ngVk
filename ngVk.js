angular
    .module('ngVk', [
        'angularLoad'
    ])
    .factory('vkSimplekHash', function () {
        return function (str) {
            var hash = 0;
            if (str.length == 0) return hash;
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
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
        var factoryCallbacksArray = [];
        return {
            set: function (vkApi) {
                angular.forEach(factoryCallbacksArray, function (factoryCallback) {
                    factoryCallback(vkApi);
                });
            },
            onSet: function (callback) {
                factoryCallbacksArray.push(callback);
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
                                scope.idRand = Math.floor(Math.random() * (9999999 - 1 + 1) + 1).toString(10);
                                $element.html('');
                                $window.vkComment = vkApi.Widgets.Comments('vk-comments-' + scope.idRand, {
                                    limit: 10,
                                    attach: '*',
                                    autoPublish: 1,
                                    mini: 1
                                }, vkSimplekHash(scope.url || $location.path()));
                            }, 10);
                        });
                    });
                },
                template: '<div class="ngVk ngVkComments" id="vk-comments-{{idRand}}" ng-transclude post-url="{{url}}"></div>'
            }
        });
