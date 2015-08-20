function DonutChart() {}
DonutChart.prototype = Object.create(PieChart.prototype);
DonutChart.prototype.constructor = DonutChart;
DonutChart.prototype.__super__ = PieChart.prototype;

DonutChart.prototype.getArc = function(conf) {
    var scope = this;
    scope.arc = d3.svg.arc()
            .outerRadius(scope.config.radius - scope.config.chartMargin)
            .innerRadius(scope.config.radius - (scope.config.chartMargin + scope.config.donutWidth));
    return scope.arc;
}