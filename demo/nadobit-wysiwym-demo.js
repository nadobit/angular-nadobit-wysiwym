angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope) {

    $scope.data = ['a', 'b', 'c'];
    $scope.schema = {
        widget: '<input ng-model="element.value" ng-change="onChildChanged()"></input>',
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
