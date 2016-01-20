var myApp = angular.module('myApp', ['ui.router', 'angular-md5', 'services', 'RecommendModule', 'TopicModule', 'MediaModule', 'AccountModule', 'ArticleModule']);

myApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

myApp.config(['$httpProvider', function($httpProvider) {
    //request payload, 转换成form data
    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    $httpProvider.defaults.transformRequest = function(obj) {
        var str = [];
        for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };
}]);

myApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab/recommend');

    $stateProvider.state('tab', {
            url: '/tab',
            templateUrl: 'tpl/tab.html',
        })
        .state('tab.recommend', {
            url: '/recommend',
            templateUrl: 'tpl/recommend.html',
            controller: 'RecommendCtrl'
        })
        .state('tab.topic', {
            url: '/topic',
            templateUrl: 'tpl/topic.html',
            controller: 'TopicCtrl'
        })
        .state('tab.media', {
            url: '/media',
            templateUrl: 'tpl/media.html',
            controller: 'MediaCtrl'
        })
        .state('tab.account', {
            url: '/account',
            templateUrl: 'tpl/account.html',
            controller: 'AccountCtrl'
        })
        .state('topicDetail', {
            url: '/topic/:topicId',
            templateUrl: 'tpl/topicDetail.html',
            controller: 'TopicDetailCtrl'
        })
        .state('mediaDetail', {
            url: '/media/:mediaId',
            templateUrl: 'tpl/mediaDetail.html',
            controller: 'MediaDetailCtrl'
        })
        .state('tab.login', {
            url: '/login',
            templateUrl: 'tpl/login.html',
            controller: 'LoginCtrl'
        })
        .state('tab.register', {
            url: '/register',
            templateUrl: 'tpl/register.html',
            controller: 'RegisterCtrl'
        })
        .state('article', {
            url: '/article/:articleId',
            templateUrl: 'tpl/article.html',
            controller: 'ArticleCtrl'
        })
})

myApp.controller('AppCtrl', function($scope){

    var hour = (new Date()).getHours();
    $scope.mode = {};
    if ( hour > -1 && hour < 23) {
        $scope.mode.day = true;
    }else {
        $scope.mode.day = false;
    }

})