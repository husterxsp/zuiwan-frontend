angular.module('starter', ['ionic', 'starter.controllers'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(5);

        //ionic的tab在ios默认在下部，在android默认在上部，加上以下这一句修正android的tab位置
        $ionicConfigProvider.tabs.position("bottom");

        $stateProvider.state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        }).state('tab.recommend', {
            url: '/recommend',
            views: {
                'recommend': {
                    templateUrl: 'templates/recommend.html',
                    controller: 'RecommendCtrl'
                }
            }
        }).state('tab.topic', {
            url: '/topic',
            views: {
                'topic': {
                    templateUrl: 'templates/topic.html',
                    controller: 'TopicCtrl'
                }
            }
        }).state('tab.media', {
            url: '/media',
            views: {
                'media': {
                    templateUrl: 'templates/media.html',
                    controller: 'MediaCtrl'
                }
            }
        //1. 关于如何深层嵌套？？比如tab.media.detai??
        //2. 为什么直接输入链接无法访问这个视图？
        }).state('media-detail', {
            url: '/media/:mediaId',
            templateUrl: 'templates/media-detail.html',
            controller: 'MediaCtrl'
        }).state('topic-detail', {
            url: '/topic/:topicId',
            templateUrl: 'templates/topic-detail.html',
            controller: 'TopicCtrl'
        }).state('tab.account', {
            url: '/account',
            views: {
                'account': {
                    templateUrl: 'templates/account.html',
                    controller: 'AccountCtrl'
                }
            }
        }).state('tab.login', {
            url: '/login',
            views: {
                'account': {
                    templateUrl: 'templates/login.html',
                    controller: 'AccountCtrl'
                }
            }
        }).state('tab.register', {
            url: '/register',
            views: {
                'account': {
                    templateUrl: 'templates/register.html',
                    controller: 'AccountCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise('/tab/account');
    });
