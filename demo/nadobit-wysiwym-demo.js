angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope, nbWysiwymRegistry) {

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
                        y: {
                            type: 'Number',
                            value: '20',
                        },
                        x: {
                            type: 'Number',
                            value: '20',
                        }
                    },
                }
            }
        }]
    };

    nbWysiwymRegistry.registerWidgets([{
        key: 'array',
        template: '<nb-wysiwym-array nb-config="subConfig" ng-model="value.value"></nb-wysiwym-array>',
        extendConfig: function(config, typeKey, typeDef) {
            config.typeLabel = typeKey;
            config.types = typeDef.types;
        },
    }, {
        key: 'object',
        template: '<nb-wysiwym-object nb-config="subConfig" ng-model="value.value"></nb-wysiwym-object>',
        extendConfig: function(config, typeKey, typeDef) {
            config.typeLabel = typeKey;
            config.attributes = typeDef.attributes;
        },
    }, {
        key: 'text',
        template: '<input type="text" ng-model="value.value" ng-change="onChildChanged()" class="form-control">',
    }, {
        key: 'null',
        template: '<div class="label label-default" style="margin: 8px; display: inline-block;">null</label>',
    }]);

    nbWysiwymRegistry
        .registerType({
            key: 'EventList',
            widget: 'array',
            types: [
                'Circle',
                'Rectangle',
                'Line',
            ],
        })
        .registerType({
            key: 'Circle',
            widget: 'object',
            attributes: [{
                key: 'position',
                types: ['Position', 'Number'],
            }, {
                key: 'radius',
                types: ['Number'],
            }]
        })
        .registerType({
            key: 'Rectangle',
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
        })
        .registerType({
            key: 'Line',
            widget: 'object',
            attributes: [{
                key: 'start',
                types: ['Position'],
            }, {
                key: 'stop',
                types: ['Position'],
            }]
        })
        .registerType({
            key: 'Position',
            widget: 'object',
            attributes: [{
                key: 'x',
                types: ['Number'],
            }, {
                key: 'y',
                types: ['Number'],
            }]
        })
        .registerType({
            key: 'Number',
            widget: 'text',
        });

    $scope.config = {
        widget: {
            template: function(scope) {
                var widget = widgets['null'];
                var typeKey = null;
                var typeDef = null;
                if (angular.isObject(scope.value)) {
                    typeKey = scope.value.type;
                    typeDef = types[typeKey];
                    widget = widgets[typeDef.widget];
                }

                if (widget.extendConfig) {
                    scope.subConfig = Object.create($scope.config);
                    widget.extendConfig(scope.subConfig, typeKey, typeDef);
                }
                return widget.template;
            }
        },
        createElement: function(type) {
            return {type: type};
        },
    };

})

;
