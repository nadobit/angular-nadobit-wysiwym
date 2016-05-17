module.exports = function($compile) {
    return {
        restrict: 'E',
        require: 'ngModel',
        templateUrl: function(element, attrs) {
            if ('nbTemplateUrl' in attrs) {
                return attrs.nbTemplateUrl;
            }
            return '/tpl/nadobit/wysiwym/array.html';
        },
        scope: {
            config: '<nbConfig',
        },
        link: function(scope, element, attrs, model) {

            scope.expanded = true;

            scope.deleteElement = function(element) {
                var index = scope.value.indexOf(element);
                scope.value.splice(index, 1);
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onChildChanged = function() {
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.addElement = function(type) {
                var newElement = null;
                if (angular.isFunction(scope.config.createElement)) {
                    newElement = scope.config.createElement(type);
                }
                scope.value.push({
                    value: newElement,
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
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.toggleExpanded = function() {
                scope.expanded = !scope.expanded;
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
