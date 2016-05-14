angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope) {

    $scope.data = ['a', 'b', 'c', 'd', 'e'];
    $scope.config = {
        schema: {
            widget: '<nb-wysiwym-object nb-schema="config.objSchema" nb-config="config" ng-model="element.value" ng-change="onChildChanged()"></nb-wysiwym-object>',
        },
        objSchema: {
            attributes: [{
                key: 'string',
                widget: '<input ng-model="attribute.value" ng-change="onChildChanged()"></input>',
            }, {
                key: 'object',
                widget: '<nb-wysiwym-object nb-schema="config.objSchema" nb-config="config" ng-model="attribute.value" ng-change="onChildChanged()"></nb-wysiwym-object>',
            }, {
                key: 'array',
                widget: '<nb-wysiwym-array nb-schema="config.schema" nb-config="config" ng-model="attribute.value" ng-change="onChildChanged()"></nb-wysiwym-array>',
            }]
        }
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
