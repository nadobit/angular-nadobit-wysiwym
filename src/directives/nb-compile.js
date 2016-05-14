module.exports = /*@ngInject*/ function($compile) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            // value = scope.$eval(attrs.nbCompile);
            // var childs = $compile(value)(scope);
            // element.empty().append(childs);
            scope.$watch(attrs.nbCompile, function(value) {
                var childs = $compile(value)(scope);
                element.empty().append(childs);
            });
        }
    }
};
