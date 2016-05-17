var _ = require('lodash');

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

            scope.availableAttributes = null;
            scope.attributesByKey = _.keyBy(scope.config.attributes, 'key');

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
                _.sortBy(scope.value, 'key');
                _.pull(scope.availableAttributes, attribute);
                model.$setViewValue(_.clone(scope.value));
            };

            scope.replaceElement = function(element, type) {
                _.pull(scope.value, element);
                scope.addElement(scope.attributesByKey[element.key], type);
            };

            scope.deleteElement = function(element) {
                _.pull(scope.value, element);
                scope.availableAttributes.push(scope.attributesByKey[element.key]);
                _.sortBy(scope.availableAttributes, 'key');
            };

            model.$formatters.push(function(value) {

                scope.availableAttributes = _.chain(scope.config.attributes)
                    .clone()
                    .sortBy('key')
                    .value();

                // expexted type
                if (angular.isObject(value)) {
                    return _.chain(value)
                        .map(function(value, key) {
                            _.pull(
                                scope.availableAttributes,
                                scope.attributesByKey[key]
                            );
                            return {
                                key: key,
                                value: value,
                            };
                        })
                        .value();
                }

                // fallback
                return [];
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
        }
    };
};
