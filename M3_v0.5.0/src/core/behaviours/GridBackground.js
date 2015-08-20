(function() {
    "use strict";
    
    M3.behaviours = M3.behaviours || {};
    
    M3.behaviours.GridBackground = function(config) {
        this.config = M3.extend(
                            {
                                width:15,
                                position:"bottom",
                                nameItem: "name"
                            },
                            (config !== undefined)?config:{});
    };
    
    M3.behaviours.GridBackground.prototype.run = function(chart){
        d3.select(chart.config.container + " .chartarea").insert("g", "g").attr("class", "grid");
        var w = d3.select(chart.config.container + " .chartarea rect").attr("width");
        var h = d3.select(chart.config.container + " .chartarea rect").attr("height");
        
        var y = null, x = null;
        if(chart.config.axis !== undefined && chart.config.axis instanceof Array) {
            var vec = chart.config.axis;
            var i = 0;
            while((y === null || x === null) && i < vec.length) {
                var pos = vec[i].pos;
                if(y === null && (pos == "left" || pos == "right")) {
                    y = chart.axis.axis[pos].axis.scale;
                } else if(x === null && (pos == "top" || pos == "bottom")) {
                    x = chart.axis.axis[pos].axis.scale;
                }
                i++;
            }
        }

        
        if(y !== null && y.ticks !== undefined) {
            d3.select(chart.config.container + " .chartarea g.grid").selectAll("line.y")
                .data(y.ticks(5))
                .enter()
                .append("line")
                    .attr("class", "y")
                    .attr("x1", 0)
                    .attr("x2", w)
                    .attr("y1", y)
                    .attr("y2", y)
                    .style("stroke", "#DDD")
                    .style("stroke-dasharray", "5,2");
        }
        if(x !== null && x.ticks !== undefined) {
            d3.select(chart.config.container + " .chartarea g.grid").selectAll("line.x")
                .data(x.ticks())
                .enter()
                .append("line")
                    .attr("class", "x")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", 0)
                    .attr("y2", h)
                    .style("stroke", "#ccc");
        }
    };
})();