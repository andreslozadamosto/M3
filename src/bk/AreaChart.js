(function() {
    "use strict";
    M3.AreaChart = M3.AreaChart || M3.createClass(M3.AbstractCartesianChart, function(){ this.className = "AreaChart"});
    
    M3.AreaChart.prototype.drawInner = function() {
        var scope = this;
        M3.AbstractCartesianChart.prototype.drawInner.call(this);
        
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        canvas.attr("class", "canvas areaChart");
        
        var chart = d3.select(this.config.container + " .chartarea");
        var h = d3.select(this.config.container + " .chartarea rect").attr("height");
        
        var scaleY = this.axis.hasYLeft ? scope.axis.yleft.scale : scope.axis.yright.scale;
        var scaleX = this.axis.hasXBottom ? scope.axis.xbottom.scale : scope.axis.xtop.scale;
        
        var area = d3.svg.area()
            .x(function(d) { return scaleX(d[scope.config.itemLabel]); })
            //.y0(h)
            .y0(function(d) { 
                if(d[scope.config.itemValueMin] !== undefined && d[scope.config.itemValueMin] !== null){
                    return scaleY(d[scope.config.itemValueMin]); 
                } else {
                    return h;
                }
            })
            .y1(function(d) { return scaleY(d[scope.config.itemValue]); });
        
        
        chart.append("path")
            .datum(this.data)
            .attr("class", "s1")
            .attr("d", area);
        
        var items = chart.selectAll(".data-point-s1")
                        .data(this.data)
                        .enter()
                        .append("g")
                        .attr('class', 'data-point-s1')
                        .attr("transform", function(d) { 
                            return "translate(" + scaleX(d[scope.config.itemLabel]) +","+ scaleY(d[scope.config.itemValue]) +")"; })
                        ;
        if(this.data[0][this.config.itemValueMin] === undefined || this.data[0][this.config.itemValueMin] === null) {
            items
                .append("circle")
                .attr('r', function() { return 3; } );
        }
    };
    
    M3.AreaChart.prototype.addAxis = function(bottom, left, right, top) {
        this.axis = new M3.Axis();
        this.axis.axisXType = "linea";
        this.axis.config = this.config;
        this.axis.data = this.data;
        this.axis.canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        this.axis.addAllAxis(bottom, left, right, top);
    };
})();