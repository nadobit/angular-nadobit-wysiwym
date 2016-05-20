module.exports = /*@ngInject*/ function($compile, nbWysiwymRegistry) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            config: '<nbConfig',
        },
        link: function(scope, element, attrs, model) {

            console.log(nbWysiwymRegistry);

            // scope.$watch('value.value', function() {
            //     model.$setViewValue(scope.value);
            // });

            // if (angular.isString(scope.config.template)) {
            //     element.html(scope.config.template);
            //     $compile(element.contents())(scope);
            // }

            // model.$render = function() {
            //     scope.value = model.$viewValue;
            //     if (angular.isFunction(scope.config.template)) {
            //         element.html(scope.config.template(scope));
            //         $compile(element.contents())(scope);
            //     }
            // };
        }
    }
};
