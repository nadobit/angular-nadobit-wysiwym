module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym/object.html',
        require: 'ngModel',
        scope: {
            config: '<nbConfig',
        },
        link: function(scope, element, attrs, model) {

            scope.expanded = true;

            scope.attributesByKey = {};
            scope.config.attributes.forEach(function(attribute) {
                scope.attributesByKey[attribute.key] = attribute;
            });

            scope.toggleExpanded = function() {
                scope.expanded = !scope.expanded;
            };

            scope.onChildChanged = function() {
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.addElement = function(attribute, type) {
                var newElement = null;
                if (angular.isFunction(scope.config.createElement)) {
                    newElement = scope.config.createElement(type);
                }
                scope.value.push({
                    key: attribute.key,
                    value: newElement,
                });
                scope.value.sort(keyComparator);
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.replaceElement = function(element, type) {
                scope.deleteElement(element);
                scope.addElement(scope.attributesByKey[element.key], type);
            };

            scope.deleteElement = function(element) {
                var index = scope.value.indexOf(element);
                scope.value.splice(index, 1);
                model.$setViewValue(angular.copy(scope.value));
            };

            model.$formatters.push(function(value) {
                var attributes = [];
                if (angular.isObject(value)) {
                    angular.forEach(value, function(value, key) {
                        attributes.push({
                            key: key,
                            value: value,
                        });
                    });
                    attributes.sort(keyComparator);
                }
                return attributes;
            });

            model.$parsers.push(function(value) {
                var obj = {};
                if (angular.isArray(value)) {
                    value.forEach(function(attribute) {
                        obj[attribute.key] = attribute.value;
                    });
                };
                return obj;
            });

            model.$render = function() {
                scope.value = model.$viewValue;
            };

            function keyComparator(a, b) {
                if (a.key < b.key) return -1;
                if (a.key > b.key) return 1;
                return 0;
            };
        }
    };
};
