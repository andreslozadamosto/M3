(function() {
    "use strict";
    M3.ColumnChart = M3.ColumnChart || M3.createClass(M3.AbstractCartesianChart);
    
    M3.ColumnChart.prototype.drawInner = function() {
        var scope = this;
        
        
        
        var chart = this.getChart();
        chart.attr("class", "column");
        
        
        this.items = this.chart.selectAll(".bar")
                    .data(this.data)
                    .enter()
                    .append("g");
        
        var list = this.items.append("rect")
                        .attr("class", "bar")
                        .attr("id", function(d) {
                            return "bar"+d[scope.config.itemLabel];})//.label;})
                        .attr("x", function(d) {
                            return scope.xAxis.x(d[scope.config.itemLabel]); })//d.label); })
                        .attr("y", function(d) {
                            return scope.yAxis.y(d[scope.config.itemValue]); })//.value); })
                        .attr("height", function(d) {
                            return scope.config.chartHeight - scope.yAxis.y(d[scope.config.itemValue]); })//.value); })
                        .attr("width", this.xAxis.x.rangeBand())
                        .attr("class", "s1");
        
        function dd(d) {
            scope.tooltipStick.hide(d);
        }
        
        if(scope.config.showTooltip && scope.tooltip !== null) {
            list
                .on('mouseover', scope.tooltip.show)
                .on('mouseout', scope.tooltip.hide)
                .on('click', function(d) {
                    scope.tooltipStick.hide(d);
                    if(d != scope.lastClick) {
                        scope.tooltipStick.show(d);
                        scope.lastClick = d;
                    } else {
                        scope.lastClick = null;
                    }
                  });
        }
        
        this.showValues();
    };
})();