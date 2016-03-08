angular.module('services', [])

.factory('cookieService', function() {
        var service = {
            get: function(name) {
                var cookieName = encodeURIComponent(name) + "=";
                var cookieStart = document.cookie.indexOf(cookieName);
                var cookieValue = "";

                if (cookieStart > -1) {
                    var cookieEnd = document.cookie.indexOf(";", cookieStart);
                    if (cookieEnd == -1) {
                        cookieEnd = document.cookie.length;
                    }
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
                }
                return cookieValue;
            },
            exit: function() {
                document.cookie = 'zw_username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
            }
        };
        return service;
    })
    .service('httpService', ['$q', '$http', function($q, $http) {
        this.getData = function(url, params) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'GET',
                url: '/zuiwan-backend/index.php' + url,
                params: params
            }).then(function successCallback(res) {
                // console.log(res.data);
                deferred.resolve(res.data);
            }, function errorCallback(res) {
                console.log(res.data);
                deferred.reject(res.data);
            });
            return promise;
        };
        this.postData = function(url, data) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http({
                method: 'POST',
                url: '/zuiwan-backend/index.php' + url,
                data: data
            }).then(function successCallback(res) {
                // console.log(res.data);
                deferred.resolve(res.data);
            }, function errorCallback(res) {
                console.log(res.data);
                deferred.reject(res.data);
            });
            return promise;
        }
    }]);