function AbstractPolarChart() {}
AbstractPolarChart.prototype = Object.create(AbstractChart.prototype);
AbstractPolarChart.prototype.constructor = AbstractPolarChart;
AbstractPolarChart.prototype.__super__ = AbstractChart.prototype;

AbstractPolarChart.prototype.arc = null;

AbstractPolarChart.prototype.getArc = function(conf) {
    var scope = this;
    scope.arc = d3.svg.arc().outerRadius(scope.config.radius - scope.config.chartMargin).innerRadius(0);
    return scope.arc;
}

AbstractPolarChart.prototype.getLayout = function(conf) {
    var scope = this;
    scope.layout = d3.layout.pie().sort(null).value(function(d) { return d[scope.config.itemValue]; });
    return scope.layout
}

AbstractPolarChart.prototype.addSlices = function() {
    var scope = this;
    var color = this.getColorFunction();
    var slices = scope.chart.selectAll(".arc")
        .data(scope.layout(scope.data))
        .enter().append("g")
        .attr("class", "arc");

    slices.append("path")
        .attr("d", scope.arc)
        .style("fill", function(d) { return color(d.data[scope.config.itemValue]); });
    
    return slices;
}

AbstractPolarChart.prototype.beforeDraw = function(data, conf) {
    AbstractChart.prototype.beforeDraw.call(this);
    if(!this.hasConfig("radius")) {
        this.config.radius = Math.min(this.config.width, this.config.height) / 2;
    }
}

AbstractPolarChart.prototype.getChart = function(conf) {
    var scope = this;
    scope.container = scope.getContainer();
    
    scope.chart = scope.container.append("g")
        .attr("class", "m3_inner")
        .attr("transform", scope.getCangasTranslation());
    return scope.chart;
}

AbstractPolarChart.prototype.getContainer = function(conf) {
    var scope = this;
    scope.container = d3.select(scope.config.container).append("svg")
        .attr("class", "m3")
        .attr("width", scope.config.width)
        .attr("height", scope.config.height);
    return scope.container;
}

AbstractPolarChart.prototype.getCangasTranslation = function() {
    var scope = this;
    return "translate(" + scope.config.width / 2 + "," + scope.config.height / 2 + ")";
}