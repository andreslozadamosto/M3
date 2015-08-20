(function() {
    "use strict";
    M3.AreaChart = M3.AreaChart || M3.createClass(M3.AbstractCartesianChart);
    
    M3.AreaChart.prototype.drawInner = function() {
        var scope = this;
        
        var chart = this.getChart();
        chart.attr("class", "area");
        
        var area = d3.svg.area()
            .x(function(d) { return scope.xAxis.x(d[scope.config.itemLabel]); })
            .y0(scope.config.chartHeight)
            .y1(function(d) { return scope.yAxis.y(d[scope.config.itemValue]); });
        
        
        scope.chart.append("path")
            .datum(this.data)
            .attr("class", "s1")
            .attr("d", area);
        
        this.items = scope.chart.selectAll(".data-point")
                        .data(this.data)
                        .enter()
                        .append("g")
                        .attr('class', 'data-point')
                        .attr("transform", function(d) { 
                            return "translate(" + scope.xAxis.x(d[scope.config.itemLabel]) +","+ scope.yAxis.y(d[scope.config.itemValue]) +")"; })
                        ;
        this.items
            .append("circle")
            .attr('r', function() { return 3; } );
        
        scope.showValues();
        
        if(scope.config.showTooltip && scope.tooltip !== null) {
            this.items.selectAll("circle")
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
    };
    
    M3.AreaChart.prototype.createX = function() {
        var scope = this;
        
        var start = (this.config.yLabel != "" && this.config.yLabelPosition == "outer") ? 20: 0;
        var x = d3.scale.ordinal().rangePoints([start, this.config.chartWidth], 0.05);

        x.domain(this.data.map(function(d) { return d[scope.config.itemLabel]; }));
        
        return x;
    };
    
    M3.AreaChart.prototype.showValues = function() {
        var scope = this;
        var foo = scope.getValueFormatFunction();
        if(this.config.showValues !== undefined && scope.config.showValues === true) {
            this.items
                    .append("text")
                        .attr("dy", function(d){
                            return (scope.getMaxValue() == d[scope.config.itemValue])?"1.5em":"-0.6em";
                        })
                        .attr("class", "serieLabel")
                        .attr("text-anchor", function(d, indx){ 
                            return (indx == 0)?"start":(indx == (scope.data.length - 1))?"end":"middle";
                        })
                        .text(foo);
        }
    };
})();