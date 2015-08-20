(function() {
    "use strict";
    /**
    @class M3.Series.ColumnSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @module M3.Series
    */
    M3.Series.ColumnSerie = M3.Series.ColumnSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.ColumnSerie.prototype.draw = function(data, conf, axis, canvas,indx) {
        var config = this.defaultConfig(conf);
        var h = canvas.select("rect").attr("height");
        
        var elems = canvas.selectAll(".column");
        var items = null;
        if(elems[0].length == 0) {
            items = canvas.selectAll(".column")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class", "rect");
            elems = items.append("rect");
        }
        
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        elems
                    .attr("class", "column serie s"+indx)
                    .attr("x", function(d) {
                        return scaleX(d[config.itemLabel]);
                    })
                    .attr("y", function(d) {
                            return scaleY(d[config.itemValue]);
                    })
                    .attr("height", function(d) {
                        if(config.itemValueMin !== undefined && d[config.itemValueMin] !== undefined && d[config.itemValueMin] !== null){
                            return h - scaleY(d[config.itemValue] - d[config.itemValueMin]);
                        } else {
                            return h - scaleY(d[config.itemValue]);
                        }
                    })
                    .attr("width", scaleX.rangeBand());
        indx++;
        return indx;
    };
    
    M3.Series.ColumnSerie.prototype.defaultConfig = function (conf) {
        return M3.extend({}, 
                        {
                            itemValueMin:"valueMin"
                        },
                         M3.Series.ChartSerie.prototype.defaultConfig.call(this, conf));
    };
})();