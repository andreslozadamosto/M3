(function() {
    "use strict";
    /**
    @class DonutChart
    @constructor
    */
    M3.DonutChart = M3.DonutChart || M3.createClass(M3.PieChart, function(){ this.className = "DonutChart";});
    

    M3.DonutChart.prototype.getArc = function() {
        var scope = this;
        scope.arc = d3.svg.arc()
                .outerRadius(scope.config.radius)
                .innerRadius(scope.config.radius - scope.config.donutWidth);
        return scope.arc;
    };
    
    M3.DonutChart.prototype.setConfig = function(conf) {
        var defaults = {
            donutWidth:20
        };
        var configs = M3.mixin(conf, defaults);
        M3.AbstractChart.prototype.setConfig.call(this, configs);
        
        return this;
    };
    
    M3.DonutChart.prototype.drawInner = function() {
        M3.PieChart.prototype.drawInner.call(this);
        
        var chart = d3.select(this.config.container + " ." + this.config.styles.canvas);
        chart.attr("class", "canvas donutChart");
    };
    
})();