angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbCompile', require('./directives/nb-compile'))
.directive('nbInject', require('./directives/nb-inject'))
.directive('nbInjectable', require('./directives/nb-injectable'))
.directive('nbInjectSlot', require('./directives/nb-inject-slot'))
.directive('nbWysiwymArray', require('./directives/nb-wysiwym-array'))
.directive('nbWysiwymObject', require('./directives/nb-wysiwym-object'))

;
