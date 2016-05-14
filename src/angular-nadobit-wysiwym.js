angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbCompile', require('./directives/nb-compile'))
.directive('nbWysiwymArray', require('./directives/nb-wysiwym-array'))
.directive('nbWysiwymObject', require('./directives/nb-wysiwym-object'))

;
