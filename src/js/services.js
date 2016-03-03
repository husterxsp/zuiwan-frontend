angular.module('services', [])

.factory('cookieService', function() {

    return {
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
})