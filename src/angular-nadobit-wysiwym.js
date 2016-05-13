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

.directive('nbWysiwymEditorNode', function($compile) {

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
})

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
