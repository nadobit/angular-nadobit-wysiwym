angular.module('nadobit.wysiwym.demo', [
    'nadobit.wysiwym'
])

.controller('NadobitWysiwymDemoController', function($scope) {

    //
    // axiom: description, rule
    // description: cdata
    // rule: conclusion, premises*
    // conclusion: combined | symbol | variable
    // premise: combined | symbol | variable
    // combined: (combined | symbol | variable), (combined | symbol | variable)
    // symbol: empty
    // variable: empty
    //

    $scope.schema = {
        rootType: 'axiom',
        types: {
            axiom: {
                attributes: ['version', 'author'],
                childs: ['desciption', 'rule'],
            },
            description: {
                cdata: true,
            },
            rule: {
                childs: ['conclusion', 'premise'],
            },
            conclusion: {
                childs: ['combined', 'symbol', 'variable'],
            },
            premise: {
                childs: ['combined', 'symbol', 'variable'],
            },
            combined: {
                childs: ['combined', 'symbol', 'variable'],
            },
            symbol: {
                attributes: ['language', 'key'],
            },
            variable: {
                attributes: ['key'],
            },
        }
    };

    $scope.data = {
        type: 'axiom',
        childs: [{
            type: 'description',
        }, {
            type: 'rule',
        }]
    };

})

;
