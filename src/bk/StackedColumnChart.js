(function() {
    "use strict";
    /**
    @class ColumnChart
    @constructor
    */
    M3.StackedColumnChart = M3.StackedColumnChart || M3.createClass(M3.AbstractCartesianChart, function(){ this.className = "GroupColumnChart"});

    M3.StackedColumnChart.prototype.drawInner = function() {
        
        
        var scope = this;
        M3.AbstractCartesianChart.prototype.drawInner.call(this);
        
        var series = [];
        var elem = null;
        var i = 0;
        for(elem in scope.config.series) {
            series[i++] = scope.config.series[elem];
        }
        
        

                
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        canvas.attr("class", "canvas stackedColumnChart");
        
        var chart = d3.select(this.config.container + " .chartarea");
        var h = d3.select(this.config.container + " .chartarea rect").attr("height");
                
        var scaleY = this.axis.hasYLeft ? scope.axis.yleft.scale : scope.axis.yright.scale;
        var scaleX = this.axis.hasXBottom ? scope.axis.xbottom.scale : scope.axis.xtop.scale;
        
        
        
        var stack = d3.layout.stack()
            .values(function(d) { 
                var vec = [];
                var elem = null;
                
                for(var i = 0; i < series.length; i++) {
                    vec[i] = {label:series[i], value:d[series[i]]};
                }
                return vec;
            });
        var datos = stack(this.data);
        
        
        if(this.config.fullStack !== undefined && this.config.fullStack === true) {
            if(this.config.normalize !== undefined && this.config.normalize === true) {
                var arr = this.data.map(function (d, indx) { 
                    /*return d3.sum(this.data, function(dd){
                        return dd.values[indx].y;
                    }); */
                    var acc = 0;
                    for(var i = 0; i < series.length; i++) {
                        acc += +d[series[i]];
                    }
                    return acc;
                });

                datos.forEach(function(d, indx) {
                        series.forEach(function(dd, i) { 
                            d[dd] = (d[dd] == 0)?0:(((+d[dd])*100)/arr[indx]); 
                            //d[dd] = (dd.y*100)/arr[i]; 
                        });
                  });
            }
        }
        
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
        
        var rects = groups.selectAll(".group")
            .data(function(d) { 
                var vec = [];
                var elem = null;
                
                for(var i = 0; i < series.length; i++) {
                    vec[i] = {label:series[i], value:+d[series[i]], valueMin:i==0?0:+d[series[i-1]]};
                }
                return vec; 
            })
            .enter().append("rect")
                .attr("x", function(d) { 
                    return scaleX(d.label); 
                })
                .attr("y", function(d) { 
                    return scaleY(d.value + d.valueMin); 
                })
                .attr("width", scaleX.rangeBand())
                .attr("height", function(d) { 
                    return h - scaleY(d.value);// - d.valueMin); 
                })
                .attr("class", function(d) {
                    var indx = series.indexOf(d.label);
                    indx += (indx >= 0) ? 1 : 0;
                    indx = (indx > 10) ? indx / 10 : indx;
                    return "s" + indx;
                });
    };
    
    M3.StackedColumnChart.prototype.setConfig = function(conf) {
        var defaults = {
            columType:"stack", //[normal, group, stack]
            fullStack:false,
            normalize:false
        };
        var configs = M3.mixin(conf, defaults);
        M3.AbstractCartesianChart.prototype.setConfig.call(this, configs);
        
        return this;
    };
    
    M3.StackedColumnChart.prototype.addAxis = function(bottom, left, right, top) {
        this.axis = new M3.Axis();
        //this.axis.axisXType = "linea";
        this.axis.config = this.config;
        this.axis.data = this.data;
        this.axis.yMaxFunction = function(d, config, orient) {
            
            if(config.fullStack !== undefined && config.fullStack === true) {
                return 100;
            }
            
            var series = [];
            var elem = null;
            var i = 0;
            for(elem in this.config.series) {
                series[i++] = this.config.series[elem];
            }
            
            var sum = 0;
            for(var i = 0; i < series.length; i++) {
                sum += +d[series[i]];
            }
            
            return sum;
        }
        this.axis.canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        this.axis.addAllAxis(bottom, left, right, top);
    };
})();