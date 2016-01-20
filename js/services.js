angular.module('services', [])

.factory('Storage', function() {
    var storage = window.localStorage;

    return {
        get: function() {
            if (storage.getItem("userInfo")) {
                var userInfo = JSON.parse(storage.getItem("userInfo"));
            } else {
                userInfo = null;
            }
            return userInfo;
        },
        save: function(userInfo) {
            storage.setItem('userInfo', JSON.stringify(userInfo));
        },
        exit: function() {
            storage.removeItem('userInfo');
        }
    };
})

.factory('ArticleService', ['$http', '$q', function ($http, $q) {
    var service = {
        articles: {},
        get_articles: function(){
            if (service.articles.length){
                return service.articles;
            }
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http({method: 'GET', url: 'http://115.28.75.190/zuiwan-backend/index.php/article/get_article'})
            .success(function(data) {
                console.log(data);
                deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
            })
            .error(function(data) {
                console.log(data);
                deferred.reject(data);   // 声明执行失败，即服务器返回错误
            });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        },
        set_articles: function(articles){
            service.articles = articles;
        }
    };
    return service;
}]);
