module.exports = function() {

    this.$get = function() {
        return new Registry();
    };
};

function Registry() {
    this.typesByKey = {};
    this.widgetsByKey = {};
}

Registry.prototype.type = function(key) {
    return this.typesByKey[key];
};

Registry.prototype.registerType = function(config) {
    this.typesByKey[config.key] = config;
    return this;
};

Registry.prototype.registerTypes = function(configs) {
    var self = this;
    configs.forEach(function(config) {
        self.registerType(config);
    });
    return this;
};

Registry.prototype.widget = function(key) {
    return this.widgetsByKey[key];
};

Registry.prototype.registerWidget = function(config) {
    this.widgetsByKey[config.key] = config;
    return this;
};

Registry.prototype.registerWidgets = function(configs) {
    var self = this;
    configs.forEach(function(config) {
        self.registerWidget(config);
    });
    return this;
};
