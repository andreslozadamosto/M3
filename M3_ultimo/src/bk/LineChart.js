(function() {
    "use strict";
    /**
    @class LineChart
    @constructor
    */
    M3.LineChart = M3.LineChart || M3.createClass(M3.AbstractCartesianChart, function(){ this.className = "LineChart"});
    
    M3.LineChart.prototype.drawInner = function() {
        var scope = this;
        M3.AbstractCartesianChart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        canvas.attr("class", "canvas lineChart");
        
        var chart = d3.select(this.config.container + " .chartarea");
        var h = d3.select(this.config.container + " .chartarea rect").attr("height");
        var w = d3.select(this.config.container + " .chartarea rect").attr("width");
        
        var scaleY = this.axis.hasYLeft ? scope.axis.yleft.scale : scope.axis.yright.scale;
        var scaleX = this.axis.hasXBottom ? scope.axis.xbottom.scale : scope.axis.xtop.scale;
        
        var line = d3.svg.line()
                    .x(function(d) { return scaleX(d[scope.config.itemLabel]); })
                    .y(function(d) { return scaleY(d[scope.config.itemValue]); });
        
        chart.append("path")
            .datum(this.data)
            .attr("class", "sl1")
            .attr("d", line);
        
        var items = chart.selectAll(".data-point-s1")
                        .data(this.data)
                        .enter()
                        .append("g")
                        .attr('class', 'data-point-s1')
                        .attr("transform", function(d) { 
                            return "translate(" + scaleX(d[scope.config.itemLabel]) +","+ scaleY(d[scope.config.itemValue]) +")"; })
                        ;
        items
            .append("circle")
            .attr('r', function() { return 3; } );
    };
    
    M3.LineChart.prototype.addAxis = function(bottom, left, right, top) {
        this.axis = new M3.Axis();
        this.axis.axisXType = "linea";
        this.axis.config = this.config;
        this.axis.data = this.data;
        this.axis.canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        this.axis.addAllAxis(bottom, left, right, top);
    };
})();