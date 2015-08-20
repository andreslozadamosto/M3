(function() {
    "use strict";
    /**
    @class M3.Series.StackedAreaSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @submodule M3.Series
    */
    M3.Series.StackedAreaSerie = M3.Series.StackedAreaSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.StackedAreaSerie.prototype.defaultConfig = function (conf) {
        return M3.extend({},
                         {
                            fullStack:false,
                            normalize:true
                         },
                         M3.Series.ChartSerie.prototype.defaultConfig.call(this, conf));
    };
    
    M3.Series.StackedAreaSerie.prototype.draw = function(data, conf, axis, canvas,indx) {
        var config = this.defaultConfig(conf);
        var h = canvas.select("rect").attr("height");
        
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        var series = config.itemValue;
        
        var datos = data;
        
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
        
        //for(var i = 0; i < series.length; i++) {
        series.map(function(serie, i){
            //var serie = series[i];
    
            var area = d3.svg.area()
                .x(function(d) {
                    return scaleX(d[config.itemLabel]);
                })
                .y0(function(d) {
                    if(i === 0) {
                        return h;
                    } else {
                        var min = 0;
                        for(var j = 0; j < i; j++) { min += +d[series[j]]; }
                        return scaleY(min);
                    }
                })
                .y1(function(d) {
                    if(i === 0){
                        return scaleY(+d[serie]);
                    } else {
                        var max = 0;
                        for(var j = 0; j < i; j++) { max += +d[series[j]]; }
                        max += +d[serie];
                        return scaleY(max);
                    }
                });


            canvas.append("path")
                .datum(datos)
                .attr("class", function() {
                                var indx = i + 1;
                                indx = (i > 10) ? i / 10 : indx;
                                return "s" + indx;
                            })
                .attr("d", area);

            var items = canvas.selectAll(".data-point"+indx)
                            .data(data)
                            .enter()
                            .append("g")
                            .attr("class", function() {
                                var ind = i + 1;
                                ind = (i > 10) ? i / 10 : ind;
                                return "data-point-s" + ind;
                            })
                            .attr("transform", function(d) {
                                return "translate(" + scaleX(d[config.itemLabel]) +","+ scaleY(d[serie]) +")"; })
                            ;
            if(config.itemValueMin !== undefined && data[0][config.itemValueMin] === undefined || data[0][config.itemValueMin] === null) {
                items
                    .append("circle")
                    .attr("r", function() { return 3; } );
            }
        });
        
        return indx + series.length;
    };
})();