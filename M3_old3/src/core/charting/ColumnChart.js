(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class ColumnChart
    @constructor
    
    */
    M3.ColumnChart = M3.ColumnChart || M3CreateClass(M3.Chart, function() { this.axis = null; this.series = null;});
    
    M3.ColumnChart.prototype.configSerie = function(value) {
        var defaultColumnSerie = {
                        clazz:"Series.ColumnSerie"
                    };
        return M3.extend({}, defaultColumnSerie, M3.Chart.prototype.configSerie.call(this, value));
    };
    
    M3.ColumnChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        canvas.attr("class", "canvas columnChart");
    };
    
})();
