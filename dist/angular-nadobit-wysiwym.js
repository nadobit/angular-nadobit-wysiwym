(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

            scope.addElement = function() {
                var newElement = null;
                if (angular.isFunction(scope.config.createElement)) {
                    newElement = scope.config.createElement();
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = /*@ngInject*/ ["$compile", function($compile) {
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
}];

},{}],4:[function(require,module,exports){
angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbWysiwymArray', require('./directives/nb-wysiwym-array'))
.directive('nbWysiwymObject', require('./directives/nb-wysiwym-object'))
.directive('nbWysiwymWidget', require('./directives/nb-wysiwym-widget'))

;

},{"./directives/nb-wysiwym-array":1,"./directives/nb-wysiwym-object":2,"./directives/nb-wysiwym-widget":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS1hcnJheS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS1vYmplY3QuanMiLCIvbWVkaWEva2Flc2Vicm90L3dvcmsvcHJvamVjdHMvZ2l0aHViL2FuZ3VsYXItbmFkb2JpdC13eXNpd3ltL3NyYy9kaXJlY3RpdmVzL25iLXd5c2l3eW0td2lkZ2V0LmpzIiwiL21lZGlhL2thZXNlYnJvdC93b3JrL3Byb2plY3RzL2dpdGh1Yi9hbmd1bGFyLW5hZG9iaXQtd3lzaXd5bS9zcmMvZmFrZV9hMWEzZTY4Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBmdW5jdGlvbihlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgaWYgKCduYlRlbXBsYXRlVXJsJyBpbiBhdHRycykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdHRycy5uYlRlbXBsYXRlVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcvdHBsL25hZG9iaXQvd3lzaXd5bS9hcnJheS5odG1sJztcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGNvbmZpZzogJzxuYkNvbmZpZycsXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWwpIHtcblxuICAgICAgICAgICAgc2NvcGUuZXhwYW5kZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBzY29wZS5kZWxldGVFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNjb3BlLnZhbHVlLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBtb2RlbC4kc2V0Vmlld1ZhbHVlKGFuZ3VsYXIuY29weShzY29wZS52YWx1ZSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUub25DaGlsZENoYW5nZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBtb2RlbC4kc2V0Vmlld1ZhbHVlKGFuZ3VsYXIuY29weShzY29wZS52YWx1ZSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUuYWRkRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHNjb3BlLmNvbmZpZy5jcmVhdGVFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdFbGVtZW50ID0gc2NvcGUuY29uZmlnLmNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXdFbGVtZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUoYW5ndWxhci5jb3B5KHNjb3BlLnZhbHVlKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5jdXRFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnBhc3RlU291cmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNjb3BlLnZhbHVlLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzY29wZS5wYXN0ZVNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLnBhc3RlRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNjb3BlLnZhbHVlLmluZGV4T2YoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmFyIHBhc3RlRWxlbWVudCA9IHNjb3BlLnBhc3RlU291cmNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IHBhc3RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS52YWx1ZS5zcGxpY2UoaW5kZXgsIDAsIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2NvcGUudmFsdWUuaW5kZXhPZihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudmFsdWUuc3BsaWNlKGluZGV4ICsgb2Zmc2V0LCAwLCBwYXN0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb2RlbC4kc2V0Vmlld1ZhbHVlKGFuZ3VsYXIuY29weShzY29wZS52YWx1ZSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUudG9nZ2xlRXhwYW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5leHBhbmRlZCA9ICFzY29wZS5leHBhbmRlZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1vZGVsLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uKGVsZW1lbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt2YWx1ZTogZWxlbWVudFZhbHVlfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kZWwuJHBhcnNlcnMucHVzaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS52YWx1ZS5tYXAoZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSBtb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy90cGwvbmFkb2JpdC93eXNpd3ltL29iamVjdC5odG1sJyxcbiAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgY29uZmlnOiAnPG5iQ29uZmlnJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbCkge1xuXG4gICAgICAgICAgICBzY29wZS5leHBhbmRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHNjb3BlLnRvZ2dsZUV4cGFuZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuZXhwYW5kZWQgPSAhc2NvcGUuZXhwYW5kZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5vbkNoaWxkQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUoYW5ndWxhci5jb3B5KHNjb3BlLnZhbHVlKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBtb2RlbC4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbHVlLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5zb3J0KGtleUNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbC4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24oYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbYXR0cmlidXRlLmtleV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RlbC4kcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUudmFsdWUgPSBtb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5Q29tcGFyYXRvcihhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEua2V5IDwgYi5rZXkpIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICBpZiAoYS5rZXkgPiBiLmtleSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IC8qQG5nSW5qZWN0Ki8gZnVuY3Rpb24oJGNvbXBpbGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBjb25maWc6ICc8bmJDb25maWcnLFxuICAgICAgICB9LFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsKSB7XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgndmFsdWUnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG1vZGVsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjb3BlLmNvbmZpZy50ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoc2NvcGUuY29uZmlnLnRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnZhbHVlID0gbW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHNjb3BlLmNvbmZpZy50ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKHNjb3BlLmNvbmZpZy50ZW1wbGF0ZShzY29wZSwgc2NvcGUudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJhbmd1bGFyLm1vZHVsZSgnbmFkb2JpdC53eXNpd3ltJywgW1xuICAgICd1aS5ib290c3RyYXAnLFxuXSlcblxuLmRpcmVjdGl2ZSgnbmJXeXNpd3ltQXJyYXknLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS1hcnJheScpKVxuLmRpcmVjdGl2ZSgnbmJXeXNpd3ltT2JqZWN0JywgcmVxdWlyZSgnLi9kaXJlY3RpdmVzL25iLXd5c2l3eW0tb2JqZWN0JykpXG4uZGlyZWN0aXZlKCduYld5c2l3eW1XaWRnZXQnLCByZXF1aXJlKCcuL2RpcmVjdGl2ZXMvbmItd3lzaXd5bS13aWRnZXQnKSlcblxuO1xuIl19
