module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym/object.html',
        require: 'ngModel',
        scope: {
            schema: '=nbSchema',
        },
        link: function(scope, element, attrs, model) {

            scope.value = null;
            scope.schemaAttributes = null;
            scope.schemaAttributesByKey = {};

            scope.$watch('schema.attributes', function(attributes) {
                scope.schemaAttributesByKey = {};
                scope.schemaAttributes = attributes.map(function(attribute) {
                    var clone = angular.copy(attribute);
                    scope.schemaAttributesByKey[clone.key] = clone;
                    return clone;
                });
                scope.schemaAttributes.sort(keyComparator);
                updateUsedFlag();
            });

            scope.onAddAttributeClick = function(schemaAttribute) {
                scope.value.push({
                    key: schemaAttribute.key,
                    value: null,
                    schema: schemaAttribute,
                });
                scope.value.sort(keyComparator);
                schemaAttribute.used = true;
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onDeleteAttributeClick = function(attribute) {
                var index = scope.value.indexOf(attribute);
                scope.value.splice(index, 1);
                scope.schemaAttributes.some(function(schemaAttribute) {
                    if (schemaAttribute.key === attribute.key) {
                        schemaAttribute.used = false;
                        return true;
                    }
                });
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onChildChanged = function() {
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
                updateUsedFlag();
            };

            function updateUsedFlag() {
                var usedAttributeKeys = {};

                if (angular.isArray(scope.value)) {
                    angular.forEach(scope.value, function(attribute) {
                        usedAttributeKeys[attribute.key] = true;
                    });
                }

                if (angular.isArray(scope.schemaAttributes)) {
                    scope.schemaAttributes.forEach(function(attribute) {
                        attribute.used = attribute.key in usedAttributeKeys;
                    });
                }
            }

            function keyComparator(a, b) {
                if (a.key < b.key) return -1;
                if (a.key > b.key) return 1;
                return 0;
            };
        }
    };
};
