(function() {
    "use strict";
    /**
    @class M3.Series.AreaSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @submodule M3.Series
    */
    M3.Series.AreaSerie = M3.Series.AreaSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.AreaSerie.prototype.draw = function(data, conf, axis, canvas,indx) {
        var config = this.defaultConfig(conf);
        var h = canvas.select("rect").attr("height");
        
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        var area = d3.svg.area()
            .x(function(d) { return scaleX(d[config.itemLabel]); })
            .y0(function(d) {
                if(d[config.itemValueMin] !== undefined && d[config.itemValueMin] !== null){
                    return scaleY(d[config.itemValueMin]);
                } else {
                    return h;
                }
            })
            .y1(function(d) { return scaleY(d[config.itemValue]); });
        
        
        canvas.append("path")
            .datum(data)
            .attr("class", "s1")
            .attr("d", area);
        indx++;
    };
    
    M3.Series.AreaSerie.prototype.defaultConfig = function (conf) {
        return M3.extend({},
                         {
                             itemValueMin:"valueMin"
                         },
                         M3.Series.ChartSerie.prototype.defaultConfig.call(this, conf));
    };
})();