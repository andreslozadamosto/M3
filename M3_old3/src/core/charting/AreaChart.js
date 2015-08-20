(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class AreaChart
    @constructor
    */
    M3.AreaChart = M3.AreaChart || M3CreateClass(M3.Chart, function() { this.axis = null; this.series = null;});
    
    M3.AreaChart.prototype.configSerie = function(value) {
        
        var defaultAreaSerie = M3.LineChart.prototype.configSerie.call(this,
                    {
                        clazz:"Series.AreaSerie"
                    });
        return M3.extend({}, defaultAreaSerie, M3.Chart.prototype.configSerie.call(this, value));
    };
    
    M3.AreaChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        canvas.attr("class", "canvas areaChart");
    };
})();
