(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbWysiwymEditor', function() {
    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym-editor.html',
        require: 'ngModel',
        scope: {
            schema: '=nbSchema',
        },
        link: function(scope, element, attrs, model) {
            scope.rootNode = null;

            scope.$watch('rootNode', function(newValue) {
                model.$setViewValue(scope.rootNode);
            });

            scope.onCreateClick = function() {
                scope.rootNode = {
                    type: scope.schema.rootType,
                };
            };

            scope.deleteNode = function(node) {
                scope.rootNode = null;
            };

            model.$render = function() {
                scope.rootNode = model.$viewValue;
            };
        }
    }
})

.directive('nbWysiwymEditorNode', ["$compile", function($compile) {

    var childsTpl = '<nb-wysiwym-editor-node-list ng-model="node.childs"></nb-wysiwym-editor-node-list>';

    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym-editor-node.html',
        require: 'ngModel',
        link: function(scope, element, attrs, model) {

            var childsElement = null;

            scope.expanded = true;
            scope.$watch(attrs.nbTypeChoices, function(value) {
                scope.typeChoices = value;
            });

            scope.onDeleteClick = function() {
                scope.deleteNode(scope.node);
            };

            scope.deleteChilds = function() {
                if (scope.node) {
                    delete scope.node.childs;
                }
            };

            scope.onToggleExpandedClick = function() {
                scope.expanded = !scope.expanded;
            };

            scope.onAppendChildClick = function(type) {
                if (!angular.isArray(scope.node.childs)) {
                    scope.node.childs = [];
                }
                scope.node.childs.push({
                    type: type,
                });
            };

            scope.onAddAttributeClick = function(attribute) {
                if (!angular.isObject(scope.node.attributes)) {
                    scope.node.attributes = {};
                }
                scope.node.attributes[attribute] = '';

                var index = scope.availableAttributes.indexOf(attribute);
                scope.availableAttributes.splice(index, 1);
                scope.hasAttributes = true;
            };

            model.$render = function() {
                scope.node = model.$viewValue;
                scope.type = scope.schema.types[scope.node.type];
                if (angular.isArray(scope.type.attributes)) {
                    attrs = scope.node.attrs || {};
                    scope.availableAttributes = scope.type.attributes.filter(function(attribute) {
                        return !(attribute in attrs);
                    });
                } else {
                    scope.availableAttributes = [];
                }
                scope.hasAttributes = !angular.equals({}, scope.node.attributes);
            };

            scope.$watchGroup(['expanded', 'node.childs'], function(values) {
                if (childsElement) {
                     childsElement.remove();
                }

                if (values[0] && angular.isArray(values[1])) {
                    $compile(childsTpl)(scope.$new(), function(clonedElement, scope) {
                        childsElement = clonedElement;
                        element.find('nb-childs-marker').after(childsElement);
                    });
                }
            });

        }
    }
}])

.directive('nbWysiwymEditorNodeList', function() {
    return {
        restrict: 'E',
        templateUrl: '/tpl/nadobit/wysiwym-editor-node-list.html',
        require: 'ngModel',
        link: function(scope, element, attrs, model) {

            model.$render = function() {
                scope.nodes = model.$viewValue;
            };

            scope.deleteNode = function(node) {
                var index = scope.nodes.indexOf(node);
                if (index !== -1) {
                    scope.nodes.splice(index, 1);
                }

                if (scope.nodes.length === 0) {
                    scope.deleteChilds();
                }
            };
        }
    }
})

;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9tZWRpYS9rYWVzZWJyb3Qvd29yay9wcm9qZWN0cy9naXRodWIvYW5ndWxhci1uYWRvYml0LXd5c2l3eW0vc3JjL2Zha2VfZmJlZGNmNTQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJhbmd1bGFyLm1vZHVsZSgnbmFkb2JpdC53eXNpd3ltJywgW1xuICAgICd1aS5ib290c3RyYXAnLFxuXSlcblxuLmRpcmVjdGl2ZSgnbmJXeXNpd3ltRWRpdG9yJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvdHBsL25hZG9iaXQvd3lzaXd5bS1lZGl0b3IuaHRtbCcsXG4gICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIHNjaGVtYTogJz1uYlNjaGVtYScsXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWwpIHtcbiAgICAgICAgICAgIHNjb3BlLnJvb3ROb2RlID0gbnVsbDtcblxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdyb290Tm9kZScsIGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwuJHNldFZpZXdWYWx1ZShzY29wZS5yb290Tm9kZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUub25DcmVhdGVDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnJvb3ROb2RlID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBzY29wZS5zY2hlbWEucm9vdFR5cGUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLmRlbGV0ZU5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUucm9vdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnJvb3ROb2RlID0gbW9kZWwuJHZpZXdWYWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4uZGlyZWN0aXZlKCduYld5c2l3eW1FZGl0b3JOb2RlJywgZnVuY3Rpb24oJGNvbXBpbGUpIHtcblxuICAgIHZhciBjaGlsZHNUcGwgPSAnPG5iLXd5c2l3eW0tZWRpdG9yLW5vZGUtbGlzdCBuZy1tb2RlbD1cIm5vZGUuY2hpbGRzXCI+PC9uYi13eXNpd3ltLWVkaXRvci1ub2RlLWxpc3Q+JztcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL3RwbC9uYWRvYml0L3d5c2l3eW0tZWRpdG9yLW5vZGUuaHRtbCcsXG4gICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbCkge1xuXG4gICAgICAgICAgICB2YXIgY2hpbGRzRWxlbWVudCA9IG51bGw7XG5cbiAgICAgICAgICAgIHNjb3BlLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChhdHRycy5uYlR5cGVDaG9pY2VzLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnR5cGVDaG9pY2VzID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2NvcGUub25EZWxldGVDbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmRlbGV0ZU5vZGUoc2NvcGUubm9kZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5kZWxldGVDaGlsZHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc2NvcGUubm9kZS5jaGlsZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUub25Ub2dnbGVFeHBhbmRlZENsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuZXhwYW5kZWQgPSAhc2NvcGUuZXhwYW5kZWQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5vbkFwcGVuZENoaWxkQ2xpY2sgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkoc2NvcGUubm9kZS5jaGlsZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm5vZGUuY2hpbGRzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjb3BlLm5vZGUuY2hpbGRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUub25BZGRBdHRyaWJ1dGVDbGljayA9IGZ1bmN0aW9uKGF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghYW5ndWxhci5pc09iamVjdChzY29wZS5ub2RlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm5vZGUuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY29wZS5ub2RlLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2NvcGUuYXZhaWxhYmxlQXR0cmlidXRlcy5pbmRleE9mKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgc2NvcGUuYXZhaWxhYmxlQXR0cmlidXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIHNjb3BlLmhhc0F0dHJpYnV0ZXMgPSB0cnVlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbW9kZWwuJHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLm5vZGUgPSBtb2RlbC4kdmlld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLnR5cGUgPSBzY29wZS5zY2hlbWEudHlwZXNbc2NvcGUubm9kZS50eXBlXTtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHNjb3BlLnR5cGUuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnMgPSBzY29wZS5ub2RlLmF0dHJzIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5hdmFpbGFibGVBdHRyaWJ1dGVzID0gc2NvcGUudHlwZS5hdHRyaWJ1dGVzLmZpbHRlcihmdW5jdGlvbihhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKGF0dHJpYnV0ZSBpbiBhdHRycyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmF2YWlsYWJsZUF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2NvcGUuaGFzQXR0cmlidXRlcyA9ICFhbmd1bGFyLmVxdWFscyh7fSwgc2NvcGUubm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaEdyb3VwKFsnZXhwYW5kZWQnLCAnbm9kZS5jaGlsZHMnXSwgZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgIGNoaWxkc0VsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlc1swXSAmJiBhbmd1bGFyLmlzQXJyYXkodmFsdWVzWzFdKSkge1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShjaGlsZHNUcGwpKHNjb3BlLiRuZXcoKSwgZnVuY3Rpb24oY2xvbmVkRWxlbWVudCwgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkc0VsZW1lbnQgPSBjbG9uZWRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5maW5kKCduYi1jaGlsZHMtbWFya2VyJykuYWZ0ZXIoY2hpbGRzRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4uZGlyZWN0aXZlKCduYld5c2l3eW1FZGl0b3JOb2RlTGlzdCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL3RwbC9uYWRvYml0L3d5c2l3eW0tZWRpdG9yLW5vZGUtbGlzdC5odG1sJyxcbiAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsKSB7XG5cbiAgICAgICAgICAgIG1vZGVsLiRyZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5ub2RlcyA9IG1vZGVsLiR2aWV3VmFsdWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS5kZWxldGVOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNjb3BlLm5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5ub2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzY29wZS5ub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuZGVsZXRlQ2hpbGRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbjtcbiJdfQ==
