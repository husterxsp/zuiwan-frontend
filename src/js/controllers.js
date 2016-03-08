angular.module("RecommendModule", [])
    .controller('RecommendCtrl', ['$scope', 'httpService', function($scope, httpService) {
        $scope.loadingPage.showLoading = true;
        httpService.getData('/article/get_recommend')
            .then(function(data) {
                $scope.bannerList = data.banner;
                $scope.recommendList = data.recommend;
                $scope.loadingPage.showLoading = false;
            });
        $scope.slideIndex = 0;
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
                        $scope.slideIndex = index > 2 ? index % 3 : index;
                        $scope.$digest();
                    },
                    transitionEnd: function(index, elem) {

                    }
                });
            }, 0);
        }
    }]);

angular.module("TopicModule", ["ngSanitize"])
    .controller('TopicCtrl', ['$scope', 'httpService', function($scope, httpService) {

        $scope.loadingPage.showLoading = true;
        httpService.getData('/topic/get_topic')
            .then(function(data) {
                $scope.topicList = data;
                $scope.loadingPage.showLoading = false;
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
            httpService.getData('/article/search', {
                    query: searchText
                })
                .then(function(data) {
                    $scope.searchResult = data;
                    $scope.showResult = true;
                    $(".search > input").blur();
                });
            lastClick = +(new Date());

        }
        $scope.hideResult = function() {
            $scope.showResult = false;
            $scope.searchText = "";
        }
    }])
    .controller('TopicDetailCtrl', ['$scope', '$state', 'httpService', function($scope, $state, httpService) {
        $scope.loadingPage.showLoading = true;
        httpService.getData('/topic/get_one_topic', {
                id: $state.params.topicId
            })
            .then(function(data) {
                $scope.topicInfo = data;
                $scope.loadingPage.showLoading = false;
            });
        $scope.setEllipsis = function() {
            setTimeout(function() {
                $(".topic-article .summary").each(function(i) {
                    var divH = $(this).height();
                    var $p = $("p", $(this)).eq(0);
                    while ($p.outerHeight() > divH) {
                        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
                    };
                });
            })
        };

    }]);

angular.module("MediaModule", [])
    .controller('MediaCtrl', ['$scope', 'httpService', function($scope, httpService) {
        $scope.loadingPage.showLoading = true;
        httpService.getData('/media/get_media')
            .then(function(data) {
                $scope.mediaList = data;
                $scope.loadingPage.showLoading = false;
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
    .controller('MediaDetailCtrl', ['$scope', '$state', 'httpService', function($scope, $state, httpService) {
        $scope.isfocus = false;
        $scope.loadingPage.showLoading = true;
        httpService.getData('/media/get_one_media', {
                id: $state.params.mediaId
            })
            .then(function(data) {
                $scope.mediaInfo = data;
                $scope.isfocus = !!$scope.mediaInfo['is_focus'];
                $scope.loadingPage.showLoading = false;
            });
        $scope.focus = function() {
            var action;
            if ($scope.isfocus) {
                action = 0;
            } else {
                action = 1;
            }
            httpService.postData('/user/focus_media', {
                    media_id: $state.params.mediaId,
                    action: action
                })
                .then(function(data) {
                    if (!data.status) {
                        alert(data.message);
                    } else {
                        if (action) {
                            alert("已成功关注！");
                            $scope.isfocus = true;
                        } else {
                            alert("已取消关注！");
                            $scope.isfocus = false;
                        }
                    }
                });

        }
    }]);

angular.module("AccountModule", [])
    .controller('AccountCtrl', ['$scope', '$state', 'cookieService', 'httpService', function($scope, $state, cookieService, httpService) {
        console.log(cookieService.get("zw_username"));
        if (!cookieService.get("zw_username")) {
            console.log("go");
            $state.go("tab.me.login");
            $scope.loadingPage.showLoading = false;
            return false;
        }

        $scope.loadingPage.showLoading = true;
        httpService.getData('/user/get_detail')
            .then(function(data) {
                $scope.userInfo = data;
                $(".attention-list").css("width", (9.78 * $scope.userInfo.medias.length) + "rem");
                $scope.loadingPage.showLoading = false;
            });
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
        };

        // $scope.initScroll = function() {
        //     console.log(2);
        //     setTimeout(function() {
        //         var myScroll = new IScroll('.scroll', {
        //             scrollX: true,
        //             scrollY: false,
        //             mouseWheel: true
        //         });
        //     }, 5000);
        // }

    }])
    .controller('LoginCtrl', ['$scope', '$state', 'md5', 'httpService', function($scope, $state, md5, httpService) {
        $scope.username = "";
        $scope.password = "";
        $scope.login = function() {
            if ($scope.username == "" || $scope.password == "") {
                alert("请填写用户名或密码！");
                return false;
            }
            httpService.postData('/user/login', {
                    username: $scope.username,
                    password: md5.createHash($scope.password)
                })
                .then(function(data) {
                    if (data.status) {
                        $state.go("tab.me.account");
                    } else {
                        alert(data.message);
                    }
                });
        };
    }])
    .controller('RegisterCtrl', ['$scope', '$state', 'md5', 'httpService', function($scope, $state, md5, httpService) {
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
            httpService.postData('/user/register', {
                    username: $scope.username,
                    password: md5.createHash($scope.password)
                })
                .then(function(data) {
                    if (res.data.status) {
                        alert("注册成功");
                        $state.go("tab.me.account");
                    } else {
                        alert(data.message);
                    }
                });
        };
    }]);

angular.module("ArticleModule", ["ngSanitize"])
    .controller('ArticleCtrl', ['$scope', '$state', 'cookieService', 'httpService', function($scope, $state, cookieService, httpService) {

        $scope.hasCollect = false;
        $scope.loadingPage.showLoading = true;
        httpService.getData('/article/get_one_article', {
                id: $state.params.articleId
            })
            .then(function(data) {
                $scope.article = data;
                $scope.hasCollect = !!$scope.article['is_focus'];
                $scope.loadingPage.showLoading = false;
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

            httpService.postData('/user/collect_article', {
                article_id: $state.params.articleId,
                action: action
            });
        };

    }]);