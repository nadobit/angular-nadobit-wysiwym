module.exports = /*@ngInject*/ function($compile) {

    var controllerInstance = null;

    function InjectController($scope) {
        controllerInstance = this;
        this.slotTemplates = {};
        this.slotHandlers = {};
    }

    InjectController.prototype.inject = function(key, template) {
        this.slotTemplates[key] = template;
        if (key in this.slotHandlers) {
            this.slotHandlers[key].forEach(function(cb) {
                cb(template);
            });
        }
    };

    InjectController.prototype.slot = function(key, cb) {
        if (!(key in this.slotHandlers)) {
            this.slotHandlers[key] = [];
        }
        var handlers = this.slotHandlers[key];
        var index = handlers.indexOf(cb);
        if (index === -1) {
            handlers.push(cb);
            if (key in this.slotTemplates) {
                cb(this.slotTemplates[key]);
            }
        }
    };

    return {
        restrict: 'A',
        controller: ['$scope', InjectController],
        compile: function(element, attrs) {
            var inner = $compile(element.contents());
            element.empty();
            return function(scope) {
                inner(scope, null, {
                    transcludeControllers: {
                        nbInjectable: {instance: controllerInstance}
                    }
                });
            };
        }
    }
};
