angular.module('myApp', ['ui.router', 'angular-md5', 'directives', 'services', 'RecommendModule', 'TopicModule', 'MediaModule', 'AccountModule', 'ArticleModule'])
.run(['$rootScope', '$state', '$stateParams',function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])
.config(['$httpProvider', function($httpProvider) {
    //request payload, 转换成form data
    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    $httpProvider.defaults.transformRequest = function(obj) {
        var str = [];
        for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    };
}])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab/recommend');

    $stateProvider.state('tab', {
            url: '/tab',
            templateUrl: 'dist/tpl/tab.html',
        })
        .state('tab.recommend', {
            url: '/recommend',
            templateUrl: 'dist/tpl/recommend.html',
            controller: 'RecommendCtrl'
        })
        .state('tab.topic', {
            url: '/topic',
            templateUrl: 'dist/tpl/topic.html',
            controller: 'TopicCtrl'
        })
        .state('tab.media', {
            url: '/media',
            templateUrl: 'dist/tpl/media.html',
            controller: 'MediaCtrl'
        })
        .state('tab.account', {
            url: '/account',
            templateUrl: 'dist/tpl/account.html',
            controller: 'AccountCtrl'
        })
        .state('topicDetail', {
            url: '/topic/:topicId',
            templateUrl: 'dist/tpl/topicDetail.html',
            controller: 'TopicDetailCtrl'
        })
        .state('mediaDetail', {
            url: '/media/:mediaId',
            templateUrl: 'dist/tpl/mediaDetail.html',
            controller: 'MediaDetailCtrl'
        })
        .state('tab.login', {
            url: '/login',
            templateUrl: 'dist/tpl/login.html',
            controller: 'LoginCtrl'
        })
        .state('tab.register', {
            url: '/register',
            templateUrl: 'dist/tpl/register.html',
            controller: 'RegisterCtrl'
        })
        .state('article', {
            url: '/article/:articleId',
            templateUrl: 'dist/tpl/article.html',
            controller: 'ArticleCtrl'
        })
}])
.controller('AppCtrl', ['$scope', function($scope){

    var hour = (new Date()).getHours();
    $scope.mode = {};
    if ( hour > 7 && hour < 23) {
        $scope.mode.day = true;
    }else {
        $scope.mode.day = false;
    }

}])