(function() {
    "use strict";
    M3.ArcChart = M3.ArcChart || M3.createClass(M3.DonutChart, function(){ this.className = "ArcChart";});
    
    
    M3.ArcChart.prototype.drawInner = function() {
    
        var scope = this;

        var value = scope.data[0][scope.config.itemValue];

        var t = 2 * Math.PI;
        
        var startAngle = (this.config.startAngle / 100) * t;
        
        var arc = this.getArc().startAngle(startAngle);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        canvas.attr("class", "canvas arcChart");
        
        var chart = canvas.append("g")
            .attr("class", "chartarea")
            .attr("transform", "translate(" + (scope.config.canvasWidth / 2) + "," + (scope.config.canvasHeight / 2) + ")");
        
        
        chart.append("rect")
                .attr("width", this.config.canvasWidth)
                .attr("height", this.config.canvasHeight)
                .attr("class", "background")
                .attr("x", (scope.config.canvasWidth / -2))
                .attr("y", (scope.config.canvasHeight / -2));
        
        chart.append("path")
            .datum({endAngle: t})
            .attr("class", "brackground")
            .attr("d", arc);
        
        chart.append("path")
            .datum({endAngle: startAngle + (value / 100) * t})
            .attr("class", "serie s1")
            .attr("d", arc);

    };
    
    M3.ArcChart.prototype.setConfig = function(conf) {
        var defaults = {
            startAngle:0
        };
        var configs = M3.mixin(conf, defaults);
        M3.DonutChart.prototype.setConfig.call(this, configs);
        
        return this;
    };
    
})();