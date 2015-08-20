function AbstractChart() {}
AbstractChart.prototype = Object.create(AbstractM3.prototype);
AbstractChart.prototype.constructor = AbstractChart;
AbstractChart.prototype.__super__ = AbstractM3.prototype;

AbstractChart.prototype.layout = null;
AbstractChart.prototype.chart = null;
AbstractChart.prototype.container = null;

AbstractChart.prototype.defaultColors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

AbstractChart.prototype.getColorFunction = function() {
    var scope = this;
    return (scope.config['colorFunction'] != undefined)
            ?scope.config['colorFunction']
            :d3.scale.ordinal().range(scope.defaultColors);
}

AbstractChart.prototype.getLabelFunction = function() {
    var scope = this;
    return (scope.config['labelFunction'] != undefined)
            ?scope.config['labelFunction']
            :function(value) { return value; };
}


AbstractChart.prototype.hasConfig = function(prop) {
    return this.config != undefined && this.config != null && this.config[prop] != undefined;
}

AbstractChart.prototype.getConfValue = function(prop) {
    return (prop != undefined && this.config != undefined && this.config != null && this.config[prop] != undefined)
        ? this.config[prop]
        : "";
}
AbstractChart.prototype.raw = function() {
    try {
        return (new XMLSerializer()).serializeToString(this.container[0][0]);
    }
    catch(e) {
        return "";
    }
}