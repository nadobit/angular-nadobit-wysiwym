module.exports = function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        template: '<div class="elements" ng-repeat="element in value"><div class="element" nb-inject-slot="element">{{element}}</div></div>',
        scope: {},
        link: function(scope, element, attrs, model) {

            scope.deleteElement = function(element) {
                var index = scope.value.indexOf(element);
                scope.value.splice(index, 1);
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onChildChanged = function() {
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.addElement = function() {
                scope.value.push({
                    value: null,
                });
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.cutElement = function(element) {
                scope.pasteSource = function() {
                    var index = scope.value.indexOf(element);
                    scope.value.splice(index, 1);
                    delete scope.pasteSource;
                    return element;
                };
            };

            scope.pasteElement = function(element, offset) {
                var index = scope.value.indexOf(element);
                var pasteElement = scope.pasteSource();
                if (element === pasteElement) {
                    scope.value.splice(index, 0, element);
                } else {
                    index = scope.value.indexOf(element);
                    scope.value.splice(index + offset, 0, pasteElement);
                }
            };

            model.$formatters.push(function(value) {
                if (angular.isArray(value)) {
                    return value.map(function(elementValue) {
                        return {value: elementValue};
                    });
                } else {
                    return [];
                };
            });

            model.$parsers.push(function(value) {
                if (angular.isArray(value)) {
                    return scope.value.map(function(element) {
                        return element.value;
                    });
                } else {
                    return [];
                }
                return arr;
            });

            model.$render = function() {
                scope.value = model.$viewValue;
            };
        }
    };
};
