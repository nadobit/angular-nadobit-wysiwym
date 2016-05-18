module.exports = function() {

    this.$get = function() {
        return new Registry();
    };
};

function Registry() {
    this.typesByKey = {};
    this.widgetsByKey = {};
}

Registry.prototype.registerType = function(config) {
    this.typesByKey[config.key] = config;

};

Registry.prototype.registerTypes = function(configs) {
    var self = this;
    configs.forEach(function(config) {
        self.registerType(config);
    });
};


Registry.prototype.registerWidget = function(config) {
    this.widgetsByKey[config.key] = config;
};

Registry.prototype.registerWidgets = function(configs) {
    var self = this;
    configs.forEach(function(config) {
        self.registerWidget(config);
    });
};
