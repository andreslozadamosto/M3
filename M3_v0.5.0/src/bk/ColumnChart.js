(function() {
    "use strict";
    /**
    @class ColumnChart
    @constructor
    */
    M3.ColumnChart = M3.ColumnChart || M3.createClass(M3.AbstractCartesianChart, function(){ this.className = "ColumnChart"});

    M3.ColumnChart.prototype.drawInner = function() {
        var scope = this;
        M3.AbstractCartesianChart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        canvas.attr("class", "canvas columnChart");
        
        var chart = d3.select(this.config.container + " .chartarea");
        var h = d3.select(this.config.container + " .chartarea rect").attr("height");
        
        var items = chart.selectAll(".column")
                    .data(this.data)
                    .enter()
                    .append("g")
                    .attr("class", "rect");
        
        var scaleY = this.axis.hasYLeft ? scope.axis.yleft.scale : scope.axis.yright.scale;
        var scaleX = this.axis.hasXBottom ? scope.axis.xbottom.scale : scope.axis.xtop.scale;
        
        items.append("rect")
                        .attr("class", "column s1")
                        .attr("id", function(d) {
                            return "column"+d[scope.config.itemLabel];
                        })
                        .attr("x", function(d) {
                            return scope.axis.xbottom.scale(d[scope.config.itemLabel]); 
                        })
                        .attr("y", function(d) {
                                return scaleY(d[scope.config.itemValue]); 
                        })
                        .attr("height", function(d) {
                            if(d[scope.config.itemValueMin] !== undefined && d[scope.config.itemValueMin] !== null){
                                return h - scaleY(d[scope.config.itemValue] - d[scope.config.itemValueMin]); 
                            } else {
                                return h - scaleY(d[scope.config.itemValue]); 
                            }
                        })
                        .attr("width", this.axis.xbottom.scale.rangeBand());
                    
    };
    
    /*M3.ColumnChart.prototype.getClassName = function() {
        var type = "";
        if(this.config.columnType == "normal") { type = "ColumnChart"; }
        else if(this.config.columnType == "group") { type = "GroupColumnChart"; }
        else if(this.config.columnType == "stack") { type = "StackedColumnChart"; }
        else if (this.config.columnType == "stack100") { type == "Stacked100ColumnChart"; }
        
        return type;
    }
    
    M3.ColumnChart.prototype.checkColumnType = function() {
        return this.getClassName !== "";
    }
    
    M3.ColumnChart.prototype.setConfig = function(conf) {
        var defaults = {
            columnType:"normal" //[normal, group, stack, stack100]
        };
        var configs = M3.mixin(conf, defaults);
        M3.AbstractCartesianChart.prototype.setConfig.call(this, configs);
        
        return this;
    };*/
})();