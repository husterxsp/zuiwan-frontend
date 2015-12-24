//推荐模块
var recommendModule = angular.module("RecommendModule", []);
recommendModule.controller('RecommendCtrl', function($scope, $http, ArticleService) {
    $scope.mySwipe = new Swipe($(".recommend #slide")[0], {
        startSlide: 0,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {

        },
        transitionEnd: function(index, elem) {

        }
    });

    // $scope.set_articles = ArticleService.set_articles;

    // var promiseOrArticles = ArticleService.get_articles();
    // if (promiseOrArticles.then){
    //     promiseOrArticles.then(function(data) {
    //         $scope.articles = data;
    //         $scope.set_articles($scope.articles);
    //     });
    // } else {
    //     $scope.articles = promiseOrArticles;
    // }

});

//专题模块
var topicModule = angular.module("TopicModule", []);
topicModule.controller('TopicCtrl', function($scope) {

}).controller('TopicDetailCtrl', function($scope) {

    //考虑复用   
    $scope.back = function(){
        window.history.back();
    }

});

//媒体模块
var mediaModule = angular.module("MediaModule", []);
mediaModule.controller('MediaCtrl', function($scope) {

}).controller('MediaDetailCtrl', function($scope) {
    
    //考虑复用   
    $scope.back = function(){
        window.history.back();
    }
});
//个人模块
var accountModule = angular.module("AccountModule", []);
accountModule.controller('AccountCtrl', function($scope, $http, $state, Storage) {

        //考虑此处的关注列表的宽度如何初始化
        $(".attention-list").css("width", "800px");

        if (!Storage.get()) {
            $state.go("tab.login");
        }

        //初始化滑动列表
        $scope.myScroll = new IScroll('.scroll', {
            scrollX: true,
            scrollY: false,
            mouseWheel: true
        });

    })
    .controller('LoginCtrl', function($scope, $http, $state, Storage) {
        $scope.login = function() {
            $http.post("/zuiwan-backend/index.php/user/login", {
                    username: $scope.username,
                    password: $scope.password
                }, {
                    withCredentials: true
                })
                .then(function(res) {
                    if (res.data.status == "success") {
                        Storage.save(res.data.user_detail[0]);
                        $state.go("tab.account");
                    } else {
                        alert(res.data.message);
                    }

                }, function(res) {
                    alert("登录失败！");
                })
        };
    })
    .controller('RegisterCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5, Storage) {

        $scope.register = function() {
            console.log(md5.createHash($scope.password || ""));
            $http.post("/zuiwan-backend/index.php/user/register", {
                    username: $scope.username,
                    password: md5.createHash($scope.password),
                    // email: $scope.email
                }, {
                    withCredentials: true
                })
                .then(function(res) {
                    console.log(res);
                    if (res.data.message == "success") {
                        Storage.save(res.data.user_detail[0]);
                        alert("注册成功！");
                        $state.go("tab.account");
                    } else {
                        alert(res.data.message);
                    }
                }, function(res) {
                    alert("注册失败！");
                })
        };
    }]);

//文章
var articleModule = angular.module("ArticleModule", ["ngSanitize"]);
articleModule.controller('ArticleCtrl', function($scope, $http, $state, Storage, ArticleService) {

    //考虑复用   
    $scope.back = function(){
        window.history.back();
    }


    var id = $state.params.articleId;
    console.log("id ", id);
    $scope.set_articles = ArticleService.set_articles;

    var promiseOrArticles = ArticleService.get_articles();
    if (promiseOrArticles.then) {
        promiseOrArticles.then(function(data) {
            $scope.articles = data;
            $scope.article = $scope.articles[id];
            $scope.set_articles($scope.articles);
        });
    } else {
        $scope.articles = promiseOrArticles;
        $scope.article = $scope.articles[id];
    }

    $scope.collect = function() {
        /**
         * @todo user不存在时，collect按钮不应该显示
         */
        var user = Storage.get();
        if (!user) {
            return;
        }
        $http.post("/zuiwan-backend/index.php/user/collect_article", {
                username: Storage.get().username,
                article_id: $scope.article.id
            }, {
                withCredentials: true
            })
            .then(function(res) {
                if (res.data.message == "success") {
                    //提示收藏文章成功
                } else {
                    //收藏文章失败
                }
            }, function(res) {
                alert("注册失败！");
            })
    }
});
