module.exports = /*@ngInject*/ function($compile) {
    return {
        restrict: 'A',
        require: '^nbInjectable',
        link: function(scope, element, attrs, injectable) {
            injectable.slot(attrs.nbInjectSlot, function(template) {
                template(scope, function(clone) {
                    element.empty().append(clone);
                });
            });
        }
    }
};
