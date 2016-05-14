module.exports = /*@ngInject*/ function($compile) {
    return {
        restrict: 'A',
        require: '^nbInjectable',
        terminal: true,
        link: function(scope, element, attrs, injectable) {
            injectable.inject(attrs.nbInject, $compile(element.contents()));
        }
    }
};
