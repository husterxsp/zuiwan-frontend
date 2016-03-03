angular.module('directives', [])

.directive('historyBack', function() {
    return {
        restrict: 'E',
        template: '<div class="history-back"><i class="icon-back"></i></div>',
        replace: true,
        link: function(scope, element, attr) {
            element.on('click', function() {
                window.history.back();
            })
        }
    }
})

.directive('repeatFinish', function() {
    return {
        link: function(scope, element, attr) {
            if (scope.$last == true) {
                scope.$eval(attr.repeatFinish)
            }
        }
    }
})