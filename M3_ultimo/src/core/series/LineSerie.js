(function() {
    "use strict";
    /**
    @class M3.Series.ColumnSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @submodule M3.Series
    */
    M3.Series.LineSerie = M3.Series.LineSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.LineSerie.prototype.draw = function(data, conf, axis, canvas, indx) {
        var config = this.defaultConfig(conf);
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        //@todo refactoring Cambiar la forma de saber si es un categoryaxis o linealaxis (verificar contra d3)
        var isRange = (axis.axis[config.x].conf.clazz.indexOf("CategoryAxis") > -1)?true:false;
        
        var line = d3.svg.line()
                    .x(function(d) {
                        return scaleX(d[config.itemLabel]) + ((isRange)?(scaleX.rangeBand()/2):0); })
                    .y(function(d) {
                        return scaleY(d[config.itemValue]); });
        
        canvas.append("path")
            .datum(data)
            .attr("class", "sl"+indx)
            .attr("d", line);
        
        var items = canvas.selectAll(".data-point-s"+indx)
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("class", "serie data-point-s"+indx)
                        .attr("transform", function(d) {
                            return "translate(" + (scaleX(d[config.itemLabel]) + ((isRange)?(scaleX.rangeBand()/2):0)) +","+ scaleY(d[config.itemValue]) +")"; })
                        ;
        items
            .append("circle")
            .attr("r", function() { return 3; } );
        indx++;
        return indx;
    };
    
})();