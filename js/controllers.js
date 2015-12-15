//推荐模块
var recommendModule = angular.module("RecommendModule", []);
recommendModule.controller('RecommendCtrl', function($scope) {

    console.log(document.getElementById('slide'));
    $scope.mySwipe = new Swipe(document.getElementById('slide'), {
        startSlide: 2,
        speed: 400,
        auto: 3000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {},
        transitionEnd: function(index, elem) {}
    });

});

//专题模块
var topicModule = angular.module("TopicModule", []);
topicModule.controller('TopicCtrl', function($scope) {


});

//媒体模块
var mediaModule = angular.module("MediaModule", []);
mediaModule.controller('MediaCtrl', function($scope) {

}).controller('MediaDetailCtrl', function($scope) {

});
//个人模块
var accountModule = angular.module("AccountModule", []);
accountModule.controller('AccountCtrl', function($scope, $http, $state, Storage) {

        if (!Storage.get()){
            $state.go("login");
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
                    if (res.data.status == "success"){
                        Storage.save(res.data.user_detail[0]);
                        $state.go("account");                        
                    }else {
                        alert(res.data.message);
                    }

                }, function(res) {
                    alert("登录失败！");
                })
        };
    }).controller('RegisterCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5, Storage) {

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
                        $state.go("account");
                    } else {
                        alert(res.data.message);
                    }
                }, function(res) {
                    alert("注册失败！");
                })
        };
    }]);
//文章
var articleModule = angular.module("ArticleModule", []);
articleModule.controller('ArticleCtrl', function($scope) {

});
