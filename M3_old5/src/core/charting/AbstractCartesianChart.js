(function() {
    "use strict";
    M3.AbstractCartesianChart = M3.AbstractCartesianChart || M3.createClass(M3.AbstractChart);
    
    M3.AbstractCartesianChart.xAxis = null;
    M3.AbstractCartesianChart.yAxis = null;
    M3.AbstractCartesianChart.items = null;
    
    
    M3.AbstractCartesianChart.prototype.createX = function() {
        var scope = this;
        
        var start = (this.config.yLabel != "" && this.config.yLabelPosition == "outer") ? 20: 0;
        
        var x = d3.scale.ordinal().rangeRoundBands([start, this.config.chartWidth], 0.1);

        x.domain(this.data.map(function(d) { return d[scope.config.itemLabel]; }));
        
        return x;
    };
    
    M3.AbstractCartesianChart.prototype.createXAxis = function() {
        var scope = this;
        
        var x = this.createX();

        var xAxis = d3.svg.axis()
            .scale(x) //scale
            .orient("bottom"); //position of x axis
        this.xAxis = {x:x, xAxis:xAxis};
        return this.xAxis;
    };
    
    M3.AbstractCartesianChart.prototype.createY = function() {
        var scope = this;
        var y = d3.scale.linear().range([this.config.chartHeight, 0]);
        
        if(this.getConfValue("fixedYAxis") === true) {
            y.domain([0, d3.max(this.data, function(d) { return d[scope.config.itemValue]; })]);
        } else {
            y.domain([
                d3.min(this.data, function(d) { return d[scope.config.itemValue]; }), 
                d3.max(this.data, function(d) { return d[scope.config.itemValue]; })
            ]);
        }
        
        return y;
    };
    
    M3.AbstractCartesianChart.prototype.createYAxis = function() {
        var scope = this;
        var y = this.createY();

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(5)
            .tickFormat(scope.config.ytickFormat)
            .orient("left");
        
        this.yAxis = {y:y, yAxis:yAxis};
        return this.yAxis;
    };
    
    M3.AbstractCartesianChart.prototype.getChart = function() {
        M3.AbstractChart.prototype.getChart.call(this);
        
        //this.chart.style("fill", "#DDD");
        
        var xAxis = this.createXAxis();
        var yAxis = this.createYAxis();
        
        //add x axis and add config
        this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.config.chartHeight + ")")
            .call(xAxis.xAxis);
        
        
        var start = (this.config.yLabel != "" && this.config.yLabelPosition == "outer") ? 20: 0;
        //add y axis and add config
        var y = this.chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + start.toString() + ",0)")
            .call(yAxis.yAxis);
        
        if(this.config.yLabel != "") {
            if(this.config.yLabelPosition == "inner") {
                y.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.5em")
                    .style("text-anchor", "end")
                    .text(this.config.yLabel);
            } else {
                this.chart.append("g")
                    .attr("transform", "translate(" + (start * -1).toString() + "," + (this.config.canvasHeight/2) + ") rotate(-90)")
                    .append("text")
                    .attr("dy", "0.5em")
                    .style("text-anchor", "middle")
                    .text(this.config.yLabel);
            }
        }
        
        return this.chart;
    };
    
    M3.AbstractCartesianChart.prototype.showValues = function() {
        var scope = this;
        var foo = scope.getValueFormatFunction();
        if(this.config.showValues !== undefined && scope.config.showValues === true) {
            this.items.append("text")
                .attr("x", function(d) { 
                    return scope.xAxis.x(d[scope.config.itemLabel]) + (scope.xAxis.x.rangeBand() / 2);
                })
                .attr("y", function(d) { return scope.yAxis.y(d[scope.config.itemValue]); })
                .attr("dy", "1em")
                .attr("class", "serieLabel_polar")
                .attr("text-anchor", "middle")
                .text(foo);
        }
    };
})();