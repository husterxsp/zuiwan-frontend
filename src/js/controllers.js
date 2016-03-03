angular.module("RecommendModule", [])
    .controller('RecommendCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingPage.showLoading = true;
        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/article/get_recommend'
        }).then(function successCallback(res) {
            console.log(res);
            $scope.bannerList = res.data.banner;
            $scope.recommendList = res.data.recommend;
            $scope.loadingPage.showLoading = false;
        }, function errorCallback(res) {
            console.log(res);
        });

        $scope.renderFinish = function() {
            setTimeout(function() {
                new Swipe($(".recommend #slide")[0], {
                    startSlide: 0,
                    speed: 400,
                    auto: 3000,
                    continuous: true,
                    disableScroll: false,
                    stopPropagation: false,
                    callback: function(index, elem) {
                        var index = index > 2 ? index % 3 : index;
                        $("#slide .dot > span").eq(index).addClass("active").siblings().removeClass("active");
                    },
                    transitionEnd: function(index, elem) {

                    }
                });
            }, 0);
        }
    }]);

angular.module("TopicModule", ["ngSanitize"])
    .controller('TopicCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingPage.showLoading = true;

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/topic/get_topic',
        }).then(function successCallback(res) {
            console.log(res);
            $scope.topicList = res.data;
            $scope.loadingPage.showLoading = false;

        }, function errorCallback(res) {
            console.log(res);
        });

        $scope.myKeyup = function(e) {
            if (e.keyCode == 13) {
                $scope.search($scope.searchText);
            }
        };
        var lastClick = 0;
        $scope.search = function(searchText) {
            if (lastClick) {
                console.log(lastClick);
                var gap = +(new Date()) - lastClick;
                console.log(gap);
                if (gap < 1000) {
                    return false;
                }
                lastClick = +(new Date());
            }

            $http({
                method: 'GET',
                url: '/zuiwan-backend/index.php/article/search',
                params: {
                    query: searchText
                }
            }).then(function successCallback(res) {

                console.log(res.data);
                $scope.searchResult = res.data;
                $scope.showResult = true;
                $(".search > input").blur();
            }, function errorCallback(res) {
                console.log(res);
            });
            lastClick = +(new Date());

        }
        $scope.hideResult = function() {
            $scope.showResult = false;
            $scope.searchText = "";
        }
    }])
    .controller('TopicDetailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        $scope.loadingPage.showLoading = true;

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/topic/get_one_topic',
            params: {
                id: $state.params.topicId
            }
        }).then(function successCallback(res) {
            console.log(res);
            $scope.topicInfo = res.data;
            $scope.date = new Date();
            $scope.loadingPage.showLoading = false;

        }, function errorCallback(res) {
            console.log(res);
        });

    }]);

angular.module("MediaModule", [])
    .controller('MediaCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.loadingPage.showLoading = true;

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/media/get_media',
        }).then(function successCallback(res) {
            console.log(res.data);
            $scope.mediaList = res.data;
            $scope.loadingPage.showLoading = false;
        }, function errorCallback(res) {
            console.log(res);
        });

        $scope.setEllipsis = function() {
            setTimeout(function() {
                $(".media .intro").each(function(i) {
                    var divH = $(this).height();
                    var $p = $("p", $(this)).eq(0);
                    while ($p.outerHeight() > divH) {
                        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
                    };
                });
            })
        };

    }])
    .controller('MediaDetailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        $scope.isfocus = false;
        $scope.loadingPage.showLoading = true;

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/media/get_one_media',
            params: {
                id: $state.params.mediaId
            }
        }).then(function successCallback(res) {
            console.log(res);
            $scope.mediaInfo = res.data;
            $scope.isfocus = !!$scope.mediaInfo['is_focus'];
            $scope.loadingPage.showLoading = false;

        }, function errorCallback(res) {
            console.log(res);
        });

        $scope.focus = function() {
            var action;
            if ($scope.isfocus) {
                action = 0;
            } else {
                action = 1;
            }
            $http({
                method: 'POST',
                url: '/zuiwan-backend/index.php/user/focus_media',
                data: {
                    media_id: $state.params.mediaId,
                    action: action
                }
            }).then(function successCallback(res) {
                if (!res.data.status) {
                    alert(res.data.message);
                } else {
                    if (action) {
                        alert("已成功关注！");
                        $scope.isfocus = true;
                    } else {
                        alert("已取消关注！");
                        $scope.isfocus = false;

                    }
                }
            }, function errorCallback(res) {

            });

        }
    }]);

angular.module("AccountModule", [])
    .controller('AccountCtrl', ['$scope', '$http', '$state', 'cookieService', function($scope, $http, $state, cookieService) {
        $scope.loadingPage.showLoading = true;
        if (!cookieService.get("zw_username")) {
            console.log("go");
            $state.go("tab.me.login");
            $scope.loadingPage.showLoading = false;
            return false;
        }

        $scope.switchMode = function() {
            $scope.mode.day = !$scope.mode.day;
            if ($scope.mode.day) {
                $scope.mode.name = "日间";
            } else {
                $scope.mode.name = "夜间";
            }

        }

        $scope.exit = function() {
            cookieService.exit();
            $state.go("tab.me.login");
        }

        $scope.feedback = function() {
            $scope.showFeed = true;
        }

        $scope.sendFeed = function() {
            alert("感谢您的反馈！我们会努力做的更好！")
            $scope.showFeed = false;
        }
        $scope.initScroll = function() {
            setTimeout(function() {
                var myScroll = new IScroll('.scroll', {
                    scrollX: true,
                    scrollY: false,
                    mouseWheel: true
                });
            }, 0);
        }

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/user/get_detail'
        }).then(function successCallback(res) {
            console.log(res);
            $scope.userInfo = res.data;
            $(".attention-list").css("width", (9.78 * $scope.userInfo.medias.length) + "rem");
            $scope.loadingPage.showLoading = false;
        }, function errorCallback(res) {
            console.log(res);
        });

    }])
    .controller('LoginCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5) {
        $scope.username = "";
        $scope.password = "";
        $scope.login = function() {
            if ($scope.username == "" || $scope.password == "") {
                alert("请填写用户名或密码！");
                return false;
            }

            $http({
                method: 'POST',
                url: '/zuiwan-backend/index.php/user/login',
                data: {
                    username: $scope.username,
                    password: md5.createHash($scope.password)
                }
            }).then(function successCallback(res) {
                console.log(res.data);
                if (res.data.status) {
                    $state.go("tab.me.account");
                } else {
                    alert(res.data.message);
                }
            }, function errorCallback(res) {
                console.log(res);
            });
        };
    }])
    .controller('RegisterCtrl', ['$scope', '$http', '$state', 'md5', function($scope, $http, $state, md5) {
        $scope.username = "";
        $scope.password = "";
        $scope.register = function() {
            if ($scope.username == "" || $scope.password == "") {
                alert("请填写用户名或密码！");
                return false;
            }
            if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.username)) {
                alert("请填写正确的邮箱格式！");
                return false;
            }

            $http({
                method: 'POST',
                url: '/zuiwan-backend/index.php/user/register',
                data: {
                    username: $scope.username,
                    password: md5.createHash($scope.password)
                }
            }).then(function successCallback(res) {
                console.log(res.data);
                if (res.data.status) {
                    alert("注册成功");
                    $state.go("tab.me.account");
                } else {
                    alert(res.data.message);
                }
            }, function errorCallback(res) {
                alert("请求失败");
            });
        };
    }]);

angular.module("ArticleModule", ["ngSanitize"])
    .controller('ArticleCtrl', ['$scope', '$http', '$state', 'cookieService', function($scope, $http, $state, cookieService) {

        $scope.hasCollect = false;
        $scope.loadingPage.showLoading = true;

        $http({
            method: 'GET',
            url: '/zuiwan-backend/index.php/article/get_one_article',
            params: {
                id: $state.params.articleId
            }
        }).then(function successCallback(res) {
            console.log(res);
            $scope.article = res.data;
            $scope.hasCollect = !!$scope.article['is_focus'];
            $scope.loadingPage.showLoading = false;

        }, function errorCallback(res) {

        });

        $scope.collect = function() {
            if (!cookieService.get('zw_username')) {
                alert("收藏文章请先登录！");
                return false;
            }
            $scope.hasCollect = !$scope.hasCollect;
            var action;
            if ($scope.hasCollect) {
                action = 1;
            } else {
                action = 0;
            }
            $http({
                method: 'POST',
                url: '/zuiwan-backend/index.php/user/collect_article',
                data: {
                    article_id: $state.params.articleId,
                    action: action
                }
            }).then(function successCallback(res) {
                console.log(res);
            }, function errorCallback(res) {

            });
        };

    }]);