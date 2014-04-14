(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class StackedColumnChart
    @constructor
    */
    M3.StackedColumnChart = M3.StackedColumnChart || M3CreateClass(M3.Chart, function() { this.axis = null; this.series = null;});
    
    M3.StackedColumnChart.prototype.configSerie = function(value) {
        var defaultColumnSerie = M3.ColumnChart.prototype.configSerie.call(this, {
                        clazz:"Series.StackedColumnSerie"
                    });
        
        return M3.extend({}, defaultColumnSerie, M3.Chart.prototype.configSerie.call(this, value));
    };
    
    M3.StackedColumnChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        canvas.attr("class", "canvas stackedColumnChart");
    };
})();
