angular.module("RecommendModule", [])
.controller('RecommendCtrl', ['$scope', '$http', function($scope, $http) {

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

    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/article/get_recommend'
    }).then(function successCallback(res) {
        console.log(res);
        $scope.bannerList = res.data.banner;
        $scope.recommendList = res.data.recommend;
    }, function errorCallback(res) {
        console.log(res);
    });

}]);

angular.module("TopicModule", [])
.controller('TopicCtrl', ['$scope', '$http', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/topic/get_topic',
    }).then(function successCallback(res) {
        console.log(res);
        $scope.topicList = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });
}])
.controller('TopicDetailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/topic/get_one_topic',
        params: {id: $state.params.topicId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.topicInfo = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });

}]);

angular.module("MediaModule", [])
.controller('MediaCtrl', ['$scope', '$http', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/media/get_media',
    }).then(function successCallback(res) {
        console.log(res.data);
        $scope.mediaList = res.data;
    }, function errorCallback(res) {
        console.log(res);
    });

}])
.controller('MediaDetailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.isfocus = false;
    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/media/get_one_media',
        params: {id: $state.params.mediaId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.mediaInfo = res.data;
        $scope.isfocus = !!$scope.mediaInfo['is_focus'];
    }, function errorCallback(res) {
        console.log(res);
    });

    $scope.focus = function(){
        $scope.isfocus = !$scope.isfocus;
        var action;
        if ($scope.isfocus){
            action = 1;
        }else {
            action = 0;
        }
        $http({
            method: 'POST',
            url: '/zuiwan-backend/index.php/user/focus_media',
            data: {media_id: $state.params.mediaId, action: action}
        }).then(function successCallback(res) {
            console.log(res.data);
        }, function errorCallback(res) {

        }); 
        
    }
}]);

angular.module("AccountModule", [])
.controller('AccountCtrl', ['$scope', '$http', '$state', 'cookieService', function($scope, $http, $state, cookieService) {

    if (!cookieService.get("zw_username")){
        $state.go("tab.login");
    }

    $scope.switchMode = function(){
        $scope.mode.day = !$scope.mode.day;
    }
    $scope.exit = function(){
        cookieService.exit();
        console.log(document.cookie);
    }
    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/user/get_detail'
    }).then(function successCallback(res) {
        console.log(res);
        $scope.userInfo = res.data;

        $(".attention-list").css("width", (9.78*$scope.userInfo.medias.length)+"rem");
        var myScroll = new IScroll('.scroll', {
            scrollX: true,
            scrollY: false,
            mouseWheel: true
        });
    }, function errorCallback(res) {
        console.log(res);
    });

}])
.controller('LoginCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5) {
    $scope.login = function() {
        $http.post("/zuiwan-backend/index.php/user/login", {
                username: $scope.username,
                password: md5.createHash($scope.password)
            })
            .then(function(res) {
                console.log(res.data);
                if (!res.data.status) {
                    alert(res.data.message);
                } else {
                    $state.go("tab.account");
                }
            }, function(res) {
                console.log(res.data);
            })
    };
}])
.controller('RegisterCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5) {
    $scope.register = function() {
        console.log(md5.createHash($scope.password || ""));
        $http.post("/zuiwan-backend/index.php/user/register", {
                username: $scope.username,
                password: md5.createHash($scope.password),
            })
            .then(function(res) {
                console.log(res);
                if (res.data.message == "success") {
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

angular.module("ArticleModule", ["ngSanitize"])
.controller('ArticleCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

    $scope.hasCollect = false;
    $http({
        method: 'GET',
        url: '/zuiwan-backend/index.php/article/get_one_article',
        params: {id: $state.params.articleId}
    }).then(function successCallback(res) {
        console.log(res);
        $scope.article = res.data;
        $scope.hasCollect = !!$scope.article['is_focus'];
    }, function errorCallback(res) {

    });

    $scope.collect = function() {
        $scope.hasCollect = !$scope.hasCollect;
        var action;
        if ($scope.hasCollect){
            action = 1;
        }else {
            action = 0;
        }
        $http({
            method: 'POST',
            url: '/zuiwan-backend/index.php/user/collect_article',
            data: {article_id: $state.params.articleId, action: action}
        }).then(function successCallback(res) {
            console.log(res);
        }, function errorCallback(res) {

        });  
    };


}]);
