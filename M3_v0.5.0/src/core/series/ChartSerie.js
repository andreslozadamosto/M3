(function() {
    "use strict";
    
    /**
    Series Module
    
    @module M3
    @submodule M3.Series
    */
    M3.Series = M3.series || {}
    
    /**
    @class M3.Series.ChartSerie
    @constructor
    @module M3
    @submodule M3.Series
    */
    M3.Series.ChartSerie = function () {
        
    };
    
    /**
    Draw the serie
    
    @method draw
    @param data {Array} Data to display.
    @param conf {Object} Config of the serie.
    @para axis {M3.Axis.AxisManager} Reference to AxisManager.
    @param canvas {Object} SVG container.
    @para indx {Number} The index of the serie.
    @return indx plus the number of series crated.
    */
    M3.Series.ChartSerie.prototype.draw = function(data, conf, axis, canvas, indx) {
        if(console) {
            console.log(data);
            console.log(conf);
            console.log(axis);
            console.log(canvas);
            console.log(indx);
        }
        return indx;
    };
    
    /**
    Set default config.
    
    @method defaultConfig
    @param conf {Object}
    @protected
    */
    M3.Series.ChartSerie.prototype.defaultConfig = function (conf) {
        return M3.extend({}, {
                                y:"left",
                                x:"bottom",
                                itemValue:"value",
                                itemLabel:"label"
                            }, conf);
        
    };
})();
