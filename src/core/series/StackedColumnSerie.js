(function() {
    "use strict";
    /**
    @class M3.Series.StackedSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @submodule M3.Series
    */
    M3.Series.StackedColumnSerie = M3.Series.StackedColumnSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.StackedColumnSerie.prototype.defaultConfig = function (conf) {
        return M3.extend({},
                         {
                            fullStack:false,
                            normalize:true
                         },
                         M3.Series.ChartSerie.prototype.defaultConfig.call(this, conf));
    };
    
    M3.Series.StackedColumnSerie.prototype.draw = function(data, conf, axis, canvas,indx) {
        var config = this.defaultConfig(conf);
        var h = canvas.select("rect").attr("height");
        
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        var series = config.itemValue;
        
        var stack = d3.layout.stack()
            .values(function(d) {
                var vec = [];
                
                for(var i = 0; i < series.length; i++) {
                    vec[i] = {label:series[i], value:d[series[i]]};
                }
                return vec;
            });
        var datos = stack(data);
        
        if(config.fullStack !== undefined && config.fullStack === true) {
            if(config.normalize !== undefined && config.normalize === true) {
                var arr = data.map(function (d) {
                    var acc = 0;
                    for(var i = 0; i < series.length; i++) {
                        acc += +d[series[i]];
                    }
                    return acc;
                });

                datos = datos.map(function(d, indx) {
                        var obj = {};
                        obj[config.itemLabel] = d[config.itemLabel];
                        series.forEach(function(dd) {
                            obj[dd] = (d[dd] === 0)?0:(((+d[dd])*100)/arr[indx]);
                        });
                        return obj;
                  });
            }
        }
        
        var groups = canvas.selectAll(".group")
            .data(datos)
            .enter().append("g")
                .attr("class", "group")
                .attr("transform", function(d) { return "translate(" + scaleX(d.label) + ",0)"; });
        canvas.selectAll(".group").append("rect")
            .attr("width", scaleX.rangeBand())
            .attr("height", h)
            .attr("class", "background");
        
        groups = canvas.selectAll(".group").append("g")
            .attr("class", "series");
        
        groups.selectAll(".group")
            .data(function(d) {
                var vec = [];
            
                for(var i = 0; i < series.length; i++) {
                    
                    var min = 0;
                    for(var j = 0; j < i; j++) { min += +d[series[j]]; }
                    vec[i] = {
                        label:series[i],
                        value:+d[series[i]],
                        valueMin:i===0?0:min};//+d[series[i-1]]};
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
                    var ind = series.indexOf(d.label);
                    ind += (ind >= 0) ? 1 : 0;
                    ind = (ind > 10) ? ind / 10 : ind;

                    return "column serie s" + ind;
                });
        return indx + series.length;
    };
})();