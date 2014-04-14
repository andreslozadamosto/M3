(function() {
    "use strict";
    /**
    @class ColumnChart
    @constructor
    */
    M3.GroupColumnChart = M3.GroupColumnChart || M3.createClass(M3.AbstractCartesianChart, function(){ this.className = "GroupColumnChart"});

    M3.GroupColumnChart.prototype.drawInner = function() {
        var scope = this;
        M3.AbstractCartesianChart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        canvas.attr("class", "canvas groupColumnChart");
        
        var chart = d3.select(this.config.container + " .chartarea");
        var h = d3.select(this.config.container + " .chartarea rect").attr("height");
                
        var scaleY = this.axis.hasYLeft ? scope.axis.yleft.scale : scope.axis.yright.scale;
        var scaleX = this.axis.hasXBottom ? scope.axis.xbottom.scale : scope.axis.xtop.scale;
        
        var series = [];
        var elem = null;
        var i = 0;
        for(elem in scope.config.series) {
            series[i++] = scope.config.series[elem];
        }
        
        var x1 = d3.scale.ordinal();
        x1.domain(series).rangeRoundBands([0, scaleX.rangeBand()]);
        
        var groups = chart.selectAll(".group")
            .data(this.data)
            .enter().append("g")
                .attr("class", "group")
                .attr("transform", function(d) { return "translate(" + scaleX(d.label) + ",0)"; });
        chart.selectAll(".group").append("rect")
            .attr("width", scaleX.rangeBand())
            .attr("height", h)
            .attr("class", "background");
        
        groups = chart.selectAll(".group").append("g")
            .attr("class", "series");
        
        groups.selectAll("rect")
            .data(function(d) {
                var vec = [];
                var elem = null;
                
                for(var i = 0; i < series.length; i++) {
                    vec[i] = {label:series[i], value:d[series[i]]};
                }
                return vec;
            })
            .enter().append("rect")
                .attr("width", x1.rangeBand())
                .attr("x", function(d){
                    return x1(d.label);
                })
                .attr("y", function(d) {
                    return scaleY(d.value);
                })
                .attr("height", function(d){
                    return h - scaleY(d.value);
                })
                .attr("class", function(d) {
                    var indx = series.indexOf(d.label);
                    indx += (indx >= 0) ? 1 : 0;
                    indx = (indx > 10) ? indx / 10 : indx;
                    return "s" + indx;
                })
    };
    
    M3.GroupColumnChart.prototype.setConfig = function(conf) {
        var defaults = {
            columType:"normal" //[normal, group, stack]
        };
        var configs = M3.mixin(conf, defaults);
        M3.AbstractCartesianChart.prototype.setConfig.call(this, configs);
        
        return this;
    };
})();