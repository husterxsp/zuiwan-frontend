//推荐模块
var recommendModule = angular.module("RecommendModule", []);
recommendModule.controller('RecommendCtrl', function($scope, $http) {

    $scope.slideIndex = 0;
    $scope.mySwipe = new Swipe($(".recommend #slide")[0], {
        startSlide: 0,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {
            //这里有点问题
            // $scope.slideIndex = index;
            // console.log($scope);
            $(".recommend #slide .dot span").eq(index).addClass('active').siblings().removeClass('active');
        },
        transitionEnd: function(index, elem) {

        }
    });

    $scope.recommendList = [];
    $http.get("http://115.28.75.190/zuiwan-backend/index.php/article/get_article")
        .then(function(res) {
            console.log(res.data);
            $scope.recommendList = res.data;
        }, function(res) {
            console.log(res);
        })

});

//专题模块
var topicModule = angular.module("TopicModule", []);
topicModule.controller('TopicCtrl', function($scope, $http) {

    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/topic/get_topic',
    }).then(function successCallback(res) {
        console.log(res);
        $scope.topicList = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });
})
.controller('TopicDetailCtrl', function($scope, $http, $state) {
    //考虑复用
    $scope.back = function() {
        window.history.back();
    }

    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/topic/get_one_topic',
        params: {id: $state.params.topicId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.topic = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });

    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/article/get_article',
        params: {type: 2, id: $state.params.topicId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.articleList = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });

});

//媒体模块
var mediaModule = angular.module("MediaModule", []);
mediaModule.controller('MediaCtrl', function($scope, $http) {

    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/media/get_media',
    }).then(function successCallback(res) {
        console.log(res.data);
        $scope.mediaList = res.data;
    }, function errorCallback(res) {

    });

})
.controller('MediaDetailCtrl', function($scope, $http, $state, Storage) {

    //收藏媒体
    $scope.hasCollect = false;
    $scope.collect = function(){
        $scope.hasCollect = !$scope.hasCollect;
        $http({
            method: 'POST',
            url: 'http://115.28.75.190/zuiwan-backend/index.php/user/collect_media',
            data: {media_id: $state.params.mediaId, username: Storage.get().username}
        }).then(function successCallback(res) {
            console.log(res);
        }, function errorCallback(res) {

        }); 
        
    }


    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/article/get_article',
        params: {type: 1, id: $state.params.mediaId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.articleList = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });


});
//个人模块
var accountModule = angular.module("AccountModule", []);
accountModule.controller('AccountCtrl', function($scope, $http, $state, Storage) {
    //个人信息
    $scope.switchMode = function(){
        $scope.mode.day = !$scope.mode.day;
    }
    //此处需要一个获取用户信息的请求

    //考虑此处的关注列表的宽度如何初始化
    // $(".attention-list").css("width", "800px");

    if (!Storage.get()) {
        $state.go("tab.login");
    }else {
        $scope.userInfo = Storage.get();
        console.log($scope.userInfo);
    }

    //初始化滑动列表
    $scope.myScroll = new IScroll('.scroll', {
        scrollX: true,
        scrollY: false,
        mouseWheel: true
    });

})
.controller('LoginCtrl', ['$scope', '$http', '$state', 'md5', 'Storage', function($scope, $http, $state, md5, Storage) {
    //登录
    $scope.login = function() {
        $http.post("http://115.28.75.190/zuiwan-backend/index.php/user/login", {
                username: $scope.username,
                password: md5.createHash($scope.password)
            })
            .then(function(res) {
                if (res.data.status == "success") {
                    Storage.save(res.data.user_detail);
                    $state.go("tab.account");
                } else {
                    alert(res.data.message);
                }

            }, function(res) {
                alert("登录失败！");
            })
    };
}])
.controller('RegisterCtrl', ['$scope', '$http', '$state', 'md5', 'Storage', function($scope, $http, $state, md5, Storage) {
    // 注册
    $scope.register = function() {
        console.log(md5.createHash($scope.password || ""));
        $http.post("http://115.28.75.190/zuiwan-backend/index.php/user/register", {
                username: $scope.username,
                password: md5.createHash($scope.password),
            })
            .then(function(res) {
                console.log(res);
                if (res.data.message == "success") {
                    Storage.save(res.data.user_detail);
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
articleModule.controller('ArticleCtrl', function($scope, $http, $state, Storage) {

    //考虑复用   
    $scope.back = function() {
        window.history.back();
    }
    //点击收藏
    $scope.hasCollect = false;
    $scope.collect = function() {
        $scope.hasCollect = !$scope.hasCollect;

        $http({
            method: 'POST',
            url: 'http://115.28.75.190/zuiwan-backend/index.php/user/collect_article',
            data: {article_id: $state.params.articleId, username: Storage.get().username}
        }).then(function successCallback(res) {
            console.log(res);
        }, function errorCallback(res) {

        });  
    };

    //获取文章信息
    $http({
        method: 'GET',
        url: 'http://115.28.75.190/zuiwan-backend/index.php/article/get_one_article',
        params: {id: $state.params.articleId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.article = res.data;
    }, function errorCallback(res) {

    });

});
