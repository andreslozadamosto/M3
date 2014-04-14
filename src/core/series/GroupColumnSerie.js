(function() {
    "use strict";
    /**
    @class M3.Series.GroupColumnSerie
    @constructor
    @extends M3.Series.ChartSerie
    @module M3
    @module M3.Series
    */
    M3.Series.GroupColumnSerie = M3.Series.GroupColumnSerie || M3.createClass(M3.Series.ChartSerie, function () {
    });
    
    M3.Series.GroupColumnSerie.prototype.draw = function(data, conf, axis, canvas,indx) {
        var config = this.defaultConfig(conf);
        var h = canvas.select("rect").attr("height");
        
        var scaleY = axis.axis[config.y].axis.scale;
        var scaleX = axis.axis[config.x].axis.scale;
        
        var x1 = d3.scale.ordinal();
        x1.domain(config.itemValue).rangeRoundBands([0, scaleX.rangeBand()]);
        
        var groups = canvas.selectAll(".group")
            .data(data)
            .enter().append("g")
                .attr("class", "group")
                .attr("transform", function(d) { return "translate(" + scaleX(d[config.itemLabel]) + ",0)"; });
        canvas.selectAll(".group").append("rect")
            .attr("width", scaleX.rangeBand())
            .attr("height", h)
            .attr("class", "background");
        
        groups = canvas.selectAll(".group").append("g")
            .attr("class", "series");
        
        var series = config.itemValue;
        groups.selectAll("rect")
            .data(function(d) {
                var vec = [];
                
                for(var i = 0; i < series.length; i++) {
                    vec[i] = {label:series[i], value:d[series[i]]};
                }
                return vec;
            })
            .enter().append("rect")
                .attr("width", x1.rangeBand())
                .attr("x", function(d){
                    return x1(d.label);
                })
                .attr("y", function(d) {
                    return scaleY(d.value);
                })
                .attr("height", function(d){
                    return h - scaleY(d.value);
                })
                .attr("class", function(d) {
                    var ind = series.indexOf(d.label);
                    ind += (ind >= 0) ? 1 : 0;
                    ind = (ind > 10) ? ind / 10 : ind;
                    return "column serie s" + ind;
                });
        return indx + series.length;;
    };
})();