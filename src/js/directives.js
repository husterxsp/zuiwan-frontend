angular.module('directives', [])

.directive('historyBack', ['$rootScope', '$state', function($rootScope, $state) {
    return {
        restrict: 'E',
        template: '<div class="history-back"><i class="icon-back"></i></div>',
        replace: true,
        link: function(scope, element, attr) {
            element.on('click', function() {
                var previous = $rootScope.$previousState;
                console.log($rootScope.$previousState);
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
            console.log("hello");
            if (scope.$last == true) {
                scope.$eval(attr.repeatFinish)
            }
        }
    }
})

.directive('scroll', ['$window', function($window) {

    return function(scope, element, attr) {
        angular.element($window).bind("scroll", function() {
            // console.log($(element)[0].clientHeight);
            // console.log($(".container").height(), '------');
            // console.log($(element).height(), 'element------');
            if ($(this).height() + this.pageYOffset > $(".container").height() - 250) {
                console.log(scope.hasGetData);
                if (scope.hasGetData) {
                    scope.$eval(attr.scroll);
                    scope.hasGetData = false;
                }
            }
        });
    };
}])