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

            scope.toggleExpanded = function() {
                scope.expanded = !scope.expanded;
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
            };

            function keyComparator(a, b) {
                if (a.key < b.key) return -1;
                if (a.key > b.key) return 1;
                return 0;
            };
        }
    };
};
