angular.module('services', [])

.factory('Storage', function() {
    var storage = window.localStorage;

    return {
        get: function() {
            if (storage.getItem("userInfo")) {
                var userInfo = JSON.parse(storage.getItem("userInfo"));
            } else {
                userInfo = null;
            }
            return userInfo;
        },
        save: function(userInfo) {
            storage.setItem('userInfo', JSON.stringify(userInfo));
        },
        exit: function() {
            storage.removeItem('userInfo');
        }
    };
})
