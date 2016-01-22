angular.module('directives', [])

.directive('historyBack', function() {
    return {
        restrict: 'E',
        template: '<div class="history-back"><i class="icon-left-open-big"></i></div>',
        replace: true,
        link: function(scope, element, attr){
            element.on('click', function(){
                window.history.back();
            })
        }
    }
})