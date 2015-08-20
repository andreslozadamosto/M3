(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class LineChart
    @constructor
    */
    M3.LineChart = M3.LineChart || M3CreateClass(M3.Chart, function() { this.axis = null; this.series = null;});
    
    M3.LineChart.prototype.configSerie = function(value) {
        var defaultColumnSerie = {
                        clazz:"Series.LineSerie"
                    };
        return M3.extend({}, defaultColumnSerie, M3.Chart.prototype.configSerie.call(this, value));
    };
    
    M3.LineChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        canvas.attr("class", "canvas lineChart");
    };
})();
