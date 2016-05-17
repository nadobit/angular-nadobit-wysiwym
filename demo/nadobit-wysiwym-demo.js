angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope) {

    $scope.data = {
        type: 'ElementList',
        value: [{
            type: 'Circle',
            value: {
                radius: {
                    type: 'Number',
                    value: '10',
                },
                position: {
                    type: 'Position',
                    value: {
                        x: {
                            type: 'Number',
                            value: '20',
                        }
                    },
                }
            }
        }]
    };

    var widgetTemplates = {
        'array': '<nb-wysiwym-array nb-config="subConfig" ng-model="value.value"></nb-wysiwym-array>',
        'object': '<nb-wysiwym-object nb-config="subConfig" ng-model="value.value"></nb-wysiwym-object>',
        'text': '<input type="text" ng-model="value.value" ng-change="onChildChanged()" class="form-control">',
        'null': '<div class="label label-default" style="margin: 8px; display: inline-block;">null</label>',
    };

    var types = {
        'ElementList': {
            widget: 'array',
            types: [
                'Circle',
                'Rectangle',
                'Line',
            ],
        },
        'Circle': {
            widget: 'object',
            attributes: [{
                key: 'position',
                types: ['Position', 'Number'],
            }, {
                key: 'radius',
                types: ['Number'],
            }]
        },
        'Rectangle': {
            widget: 'object',
            attributes: [{
                key: 'position',
                types: ['Position'],
            }, {
                key: 'width',
                types: ['Number'],
            }, {
                key: 'height',
                types: ['Number'],
            }]
        },
        'Line': {
            widget: 'object',
            attributes: [{
                key: 'start',
                types: ['Position'],
            }, {
                key: 'stop',
                types: ['Position'],
            }]
        },
        'Position': {
            widget: 'object',
            attributes: [{
                key: 'x',
                types: ['Number'],
            }, {
                key: 'y',
                types: ['Number'],
            }]
        },
        'Number': {
            widget: 'text',
        }
    };

    $scope.config = {
        widget: {
            template: function(scope) {
                var widget = 'null';
                if (angular.isObject(scope.value)) {
                    var typeDef = types[scope.value.type];
                    widget = typeDef.widget;
                    if (widget === 'object') {
                        scope.subConfig = Object.create($scope.config);
                        scope.subConfig.typeLabel = scope.value.type;
                        scope.subConfig.attributes = typeDef.attributes;
                    } else if (widget === 'array') {
                        scope.subConfig = Object.create($scope.config);
                        scope.subConfig.typeLabel = scope.value.type;
                        scope.subConfig.types = typeDef.types;
                    }
                }
                return widgetTemplates[widget];
            }
        },
        createElement: function(type) {
            return {type: type};
        },
        // schema: {
        //     widget: '<nb-wysiwym-object nb-schema="config.objSchema" nb-config="config" ng-model="element.value" ng-change="onChildChanged()"></nb-wysiwym-object>',
        // },
        // objSchema: {
        //     attributes: [{
        //         key: 'string',
        //         widget: '<input ng-model="attribute.value" ng-change="onChildChanged()"></input>',
        //     }, {
        //         key: 'object',
        //         widget: '<nb-wysiwym-object nb-schema="config.objSchema" nb-config="config" ng-model="attribute.value" ng-change="onChildChanged()"></nb-wysiwym-object>',
        //     }, {
        //         key: 'array',
        //         widget: '<nb-wysiwym-array nb-schema="config.schema" nb-config="config" ng-model="attribute.value" ng-change="onChildChanged()"></nb-wysiwym-array>',
        //     }]
        // },
        // template: '<div class="elements" ng-repeat="element in value"><div class="element" nb-inject-slot="element">{{element}}</div></div>',
    };

    // $scope.data = {
    //     value1: 'xx',
    //     value2: {},
    // };

    // $scope.schema = {
    //     attributes: [{
    //         key: 'value1',
    //         widget: '<input ng-model="attribute.value" ng-change="onChildChanged()"></input>',
    //     }, {
    //         key: 'value2',
    //         widget: '<nb-wysiwym-object nb-schema="schema" ng-model="attribute.value" ng-change="onChildChanged()"></nb-wysiwym-object>',
    //     }, {
    //         key: 'value3',
    //     }, {
    //         key: 'value4',
    //     }]
    // };

})

;
