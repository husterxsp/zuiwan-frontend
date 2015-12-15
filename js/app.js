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
    $urlRouterProvider.otherwise('/recommend');

    $stateProvider.state('recommend', {
        url: '/recommend',
        templateUrl: 'tpl/recommend.html'
    }).state('topic', {
        url: '/topic',
        templateUrl: 'tpl/topic.html'
    }).state('topicDetail', {
        url: '/topic/:topicId',
        templateUrl: 'tpl/topic-detail.html'
    }).state('media', {
        url: '/media',
        templateUrl: 'tpl/media.html'
    }).state('mediaDetail', {
        url: '/media/:mediaId',
        templateUrl: 'tpl/media-detail.html'
    }).state('account', {
        url: '/account',
        templateUrl: 'tpl/account.html'
    }).state('login', {
        url: '/login',
        templateUrl: 'tpl/login.html'
    }).state('register', {
        url: '/register',
        templateUrl: 'tpl/register.html'
    }).state('article',{
        url: '/article/:articleId',
        templateUrl: 'tpl/article.html'
    }).state('tab',{
        templateUrl: 'tpl/tab.html'
    })
});