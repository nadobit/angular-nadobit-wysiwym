module.exports = /*@ngInject*/ function($compile) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            config: '<nbConfig',
        },
        link: function(scope, element, attrs, model) {

            scope.$watch('value', function(value) {
                model.$setViewValue(value);
            });

            if (angular.isString(scope.config.template)) {
                element.html(scope.config.template);
                $compile(element.contents())(scope);
            }

            model.$render = function() {
                scope.value = model.$viewValue;
                if (angular.isFunction(scope.config.template)) {
                    element.html(scope.config.template(scope, scope.value));
                    $compile(element.contents())(scope);
                }
            };
        }
    }
};
