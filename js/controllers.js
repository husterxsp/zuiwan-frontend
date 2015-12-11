//暂时先这样写。。之后再考虑模块分离
angular.module('starter.controllers', [])

.controller('RecommendCtrl', function($scope) {

})
.controller('TopicCtrl', function($scope) {

})
.controller('MediaCtrl', function($scope) {

})
.controller('AccountCtrl', function($scope, $http, $state) {
    var storage = window.localStorage;
    var userInfo = JSON.parse(storage.getItem("userInfo")) || undefined;
    if (!userInfo){
        $state.go("tab.login");
    }

    $scope.login = function(){
        $http.post("/zuiwan-backend/index.php/user/login", {
                username: $scope.username,
                password: $scope.password
            }, {
                withCredentials: true
            })
            .then(function() {
                alert("登录成功！");
                $state.go("tab.acount");
            }, function() {
                alert("注册失败！");
            })
    };

    $scope.register = function() {
        console.log($scope.username);
        console.log($scope.password);
        console.log($scope.email);
        $http.post("/zuiwan-backend/index.php/user/register", {
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            }, {
                withCredentials: true
            })
            .then(function(res) {
                alert("注册成功！");
            }, function(res) {
                console.log(res);
                alert("注册失败！");
            })
    };

})
.controller('MediaDetailCtrl', function($scope) {
    
});
