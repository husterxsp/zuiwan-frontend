angular.module('filters', [])

.filter('dateObj', function() {
    return function(date) {
        var date = new Date(date);
        return date;
    }
})

.filter('month', function() {
    return function(date) {
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return month[date.getMonth()] + ', ' + date.getFullYear();
    }
})

.filter('day', function() {
    return function(date) {
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
