(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$compile", function($compile) {
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
}];

},{}],2:[function(require,module,exports){
module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym/array.html',
        require: 'ngModel',
        scope: {
            schema: '=nbSchema',
        },
        link: function(scope, element, attrs, model) {

            scope.onDeleteElementClick = function(element) {
                var index = scope.value.indexOf(element);
                scope.value.splice(index, 1);
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onChildChanged = function() {
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onAddElementClick = function() {
                scope.value.push({
                    value: null,
                });
                model.$setViewValue(angular.copy(scope.value));
            };

            scope.onCutElementClick = function(element) {
                scope.pasteSource = function() {
                    var index = scope.value.indexOf(element);
                    scope.value.splice(index, 1);
                    delete scope.pasteSource;
                    return element;
                };
            };

            scope.onPasteElementClick = function(element, offset) {
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbCompile', require('./directives/nb-compile'))
.directive('nbWysiwymArray', require('./directives/nb-wysiwym-array'))
.directive('nbWysiwymObject', require('./directives/nb-wysiwym-object'))

;

},{"./directives/nb-compile":1,"./directives/nb-wysiwym-array":2,"./directives/nb-wysiwym-object":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2RpcmVjdGl2ZXMvbmItY29tcGlsZS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS1hcnJheS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS1vYmplY3QuanMiLCIvbWVkaWEva2Flc2Vicm90L3dvcmsvcHJvamVjdHMvZ2l0aHViL2FuZ3VsYXItbmFkb2JpdC13eXNpd3ltL3NyYy9mYWtlX2RkNjBlNWRkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gLypAbmdJbmplY3QqLyBmdW5jdGlvbigkY29tcGlsZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgIC8vIHZhbHVlID0gc2NvcGUuJGV2YWwoYXR0cnMubmJDb21waWxlKTtcbiAgICAgICAgICAgIC8vIHZhciBjaGlsZHMgPSAkY29tcGlsZSh2YWx1ZSkoc2NvcGUpO1xuICAgICAgICAgICAgLy8gZWxlbWVudC5lbXB0eSgpLmFwcGVuZChjaGlsZHMpO1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKGF0dHJzLm5iQ29tcGlsZSwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRzID0gJGNvbXBpbGUodmFsdWUpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmVtcHR5KCkuYXBwZW5kKGNoaWxkcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL3RwbC9uYWRvYml0L3d5c2l3eW0vYXJyYXkuaHRtbCcsXG4gICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHNjaGVtYTogJz1uYlNjaGVtYScsXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWwpIHtcblxuICAgICAgICAgICAgc2NvcGUub25EZWxldGVFbGVtZW50Q2xpY2sgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2NvcGUudmFsdWUuaW5kZXhPZihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUoYW5ndWxhci5jb3B5KHNjb3BlLnZhbHVlKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5vbkNoaWxkQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUoYW5ndWxhci5jb3B5KHNjb3BlLnZhbHVlKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5vbkFkZEVsZW1lbnRDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtb2RlbC4kc2V0Vmlld1ZhbHVlKGFuZ3VsYXIuY29weShzY29wZS52YWx1ZSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUub25DdXRFbGVtZW50Q2xpY2sgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUucGFzdGVTb3VyY2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2NvcGUudmFsdWUuaW5kZXhPZihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNjb3BlLnBhc3RlU291cmNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUub25QYXN0ZUVsZW1lbnRDbGljayA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNjb3BlLnZhbHVlLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHBhc3RlRWxlbWVudCA9IHNjb3BlLnBhc3RlU291cmNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IHBhc3RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS52YWx1ZS5zcGxpY2UoaW5kZXgsIDAsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2NvcGUudmFsdWUuaW5kZXhPZihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUuc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBwYXN0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1vZGVsLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt2YWx1ZTogZWxlbWVudFZhbHVlfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kZWwuJHBhcnNlcnMucHVzaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS52YWx1ZS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSBtb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90cGwvbmFkb2JpdC93eXNpd3ltL29iamVjdC5odG1sJyxcbiAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgc2NoZW1hOiAnPW5iU2NoZW1hJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbCkge1xuXG4gICAgICAgICAgICBzY29wZS52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICBzY29wZS5zY2hlbWFBdHRyaWJ1dGVzID0gbnVsbDtcbiAgICAgICAgICAgIHNjb3BlLnNjaGVtYUF0dHJpYnV0ZXNCeUtleSA9IHt9O1xuXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3NjaGVtYS5hdHRyaWJ1dGVzJywgZnVuY3Rpb24oYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLnNjaGVtYUF0dHJpYnV0ZXNCeUtleSA9IHt9O1xuICAgICAgICAgICAgICAgIHNjb3BlLnNjaGVtYUF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLm1hcChmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsb25lID0gYW5ndWxhci5jb3B5KGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNjaGVtYUF0dHJpYnV0ZXNCeUtleVtjbG9uZS5rZXldID0gY2xvbmU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzY29wZS5zY2hlbWFBdHRyaWJ1dGVzLnNvcnQoa2V5Q29tcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgdXBkYXRlVXNlZEZsYWcoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzY29wZS5vbkFkZEF0dHJpYnV0ZUNsaWNrID0gZnVuY3Rpb24oc2NoZW1hQXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogc2NoZW1hQXR0cmlidXRlLmtleSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlLnNvcnQoa2V5Q29tcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgc2NoZW1hQXR0cmlidXRlLnVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUoYW5ndWxhci5jb3B5KHNjb3BlLnZhbHVlKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5vbkRlbGV0ZUF0dHJpYnV0ZUNsaWNrID0gZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2NvcGUudmFsdWUuaW5kZXhPZihhdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgc2NvcGUuc2NoZW1hQXR0cmlidXRlcy5zb21lKGZ1bmN0aW9uKHNjaGVtYUF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hQXR0cmlidXRlLmtleSA9PT0gYXR0cmlidXRlLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hQXR0cmlidXRlLnVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbW9kZWwuJHNldFZpZXdWYWx1ZShhbmd1bGFyLmNvcHkoc2NvcGUudmFsdWUpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLm9uQ2hpbGRDaGFuZ2VkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuJHNldFZpZXdWYWx1ZShhbmd1bGFyLmNvcHkoc2NvcGUudmFsdWUpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1vZGVsLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnNvcnQoa2V5Q29tcGFyYXRvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGVsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialthdHRyaWJ1dGUua2V5XSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzY29wZS52YWx1ZSA9IG1vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlVXNlZEZsYWcoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZWRGbGFnKCkge1xuICAgICAgICAgICAgICAgIHZhciB1c2VkQXR0cmlidXRlS2V5cyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShzY29wZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLnZhbHVlLCBmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRBdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZS5rZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShzY29wZS5zY2hlbWFBdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zY2hlbWFBdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUudXNlZCA9IGF0dHJpYnV0ZS5rZXkgaW4gdXNlZEF0dHJpYnV0ZUtleXM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5Q29tcGFyYXRvcihhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEua2V5IDwgYi5rZXkpIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoYS5rZXkgPiBiLmtleSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCJhbmd1bGFyLm1vZHVsZSgnbmFkb2JpdC53eXNpd3ltJywgW1xuICAgICd1aS5ib290c3RyYXAnLFxuXSlcblxuLmRpcmVjdGl2ZSgnbmJDb21waWxlJywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL25iLWNvbXBpbGUnKSlcbi5kaXJlY3RpdmUoJ25iV3lzaXd5bUFycmF5JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL25iLXd5c2l3eW0tYXJyYXknKSlcbi5kaXJlY3RpdmUoJ25iV3lzaXd5bU9iamVjdCcsIHJlcXVpcmUoJy4vZGlyZWN0aXZlcy9uYi13eXNpd3ltLW9iamVjdCcpKVxuXG47XG4iXX0=
