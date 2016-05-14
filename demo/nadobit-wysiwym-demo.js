angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope) {

    $scope.data = ['a', ['1', '2', '3'], {'pxxx': 'x', 'qa': ['u', 'v', 'w'], 'ryy': 'z'}, 'd', 'e'];
    $scope.config = {
        widget: {
            template: function(scope) {
                if (angular.isString(scope.value)) {
                    return '<input type="text" ng-model="value" ng-change="onChildChanged()" class="form-control">';
                }
                if (angular.isArray(scope.value)) {
                    scope.subConfig = $scope.config;
                    return '<nb-wysiwym-array nb-config="subConfig" ng-model="value"></nb-wysiwym-array>';
                }
                if (angular.isObject(scope.value)) {
                    scope.subConfig = $scope.config;
                    return '<nb-wysiwym-object nb-config="subConfig" ng-model="value"></nb-wysiwym-object>';
                }
                return '<div class="label label-default" style="margin: 8px; display: inline-block;">null</label>';
            }
        },
        createElement: function() {
            return {firstName: 'Hans', lastName: 'Wurst'};
        }

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
