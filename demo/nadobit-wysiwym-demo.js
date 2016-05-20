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
    }, {
        key: 'object',
        template: '<nb-wysiwym-object nb-config="subConfig" ng-model="value.value"></nb-wysiwym-object>',
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
            widget: {
                key: 'array',
                config: {
                    types: [
                        'Circle',
                        'Rectangle',
                        'Line',
                    ],
                }
            }
        })
        .registerType({
            key: 'Circle',
            widget: {
                key: 'object',
                config: {
                    attributes: [{
                        key: 'position',
                        types: ['Position', 'Number'],
                    }, {
                        key: 'radius',
                        types: ['Number'],
                    }]
                }
            }
        })
        .registerType({
            key: 'Rectangle',
            widget: {
                key: 'object',
                config: {
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
                }
            }
        })
        .registerType({
            key: 'Line',
            widget: {
                key: 'object',
                config: {
                    attributes: [{
                        key: 'start',
                        types: ['Position'],
                    }, {
                        key: 'stop',
                        types: ['Position'],
                    }]
                }
            }
        })
        .registerType({
            key: 'Position',
            widget: {
                key: 'object',
                config: {
                    attributes: [{
                        key: 'x',
                        types: ['Number'],
                    }, {
                        key: 'y',
                        types: ['Number'],
                    }]
                }
            }
        })
        .registerType({
            key: 'Number',
            widget: 'text',
        });

})

;
