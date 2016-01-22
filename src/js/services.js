angular.module('services', [])

.factory('cookieService', function() {

    return {
        get: function(name) {
            console.log("hello");
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
        // set: function(name, value, expires) {
        //     var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        //     if (expires instanceof Date) {
        //         cookieText += "; expires=" + expires.toGMTString();
        //     }
        //     console.log(cookieText);
        //     document.cookie = cookieText;
        // },
        exit: function() {
            console.log("删除");
            var cookieText = encodeURIComponent("zw_username") + "=" + encodeURIComponent(" ") + "; expires=" + (new Date(0)).toGMTString();
            console.log(cookieText);
            document.cookie = cookieText;
        }
    };
})
