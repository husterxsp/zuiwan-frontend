angular.module('directives', [])

.directive('historyBack', ['$rootScope', '$state', function($rootScope, $state) {
    return {
        restrict: 'E',
        template: '<a class="history-back"><i class="icon-back"></i></a>',
        replace: true,
        link: function(scope, element, attr) {
            element.on('click', function() {
                var previous = $rootScope.$previousState;
                if (!!previous.from.name) {
                    // $state.go(previous.from.name, previous.fromParams);
                    window.history.back();
                } else {
                    $state.go("tab.recommend");
                }
            })
        }
    }
}])

.directive('repeatFinish', function() {
    return {
        link: function(scope, element, attr) {
            if (scope.$last == true) {
                scope.$eval(attr.repeatFinish)
            }
        }
    }
})

.directive('scroll', ['$window', function($window) {

    return function(scope, element, attr) {
        angular.element($window).bind("scroll", function() {
            if ($(this).height() + this.pageYOffset > $(".container").height() - 250) {
                if (scope.hasGetData) {
                    scope.$eval(attr.scroll);
                    scope.hasGetData = false;
                }
            }
        });
    };
}])

;