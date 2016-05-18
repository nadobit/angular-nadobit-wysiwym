angular.module('nadobit.wysiwym', [
    'ui.bootstrap',
])

.directive('nbWysiwymArray', require('./directives/nb-wysiwym-array'))
.directive('nbWysiwymObject', require('./directives/nb-wysiwym-object'))
.directive('nbWysiwymWidget', require('./directives/nb-wysiwym-widget'))

.provider('nbWysiwymRegistry', require('./providers/nb-wysiwym-registry'))

;
