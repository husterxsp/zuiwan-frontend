angular.module('filters', [])

.filter('dateObj', function() {
    return function(date) {
        if (!date) {
            return;
        }
        // console.log(date);
        // var date = new Date(date);
        var t = date.split(/[- :]/);
        // console.log(t);
        // Apply each element to the Date function
        var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
        // console.log(d);
        var actiondate = new Date(d);
        return actiondate;
    }
})

.filter('month', function() {
    return function(date) {
        if (!date) {
            return;
        }
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return month[date.getMonth()] + ', ' + date.getFullYear();
    }
})

.filter('day', function() {
    return function(date) {
        if (!date) {
            return;
        }
        var month = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'Aguest', 'September', 'October', 'November', 'December'
        ];
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return month[date.getMonth()] + ', ' + day + ', ' + date.getFullYear();;
    }
})