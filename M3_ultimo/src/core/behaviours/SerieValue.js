(function() {
    "use strict";
    
    M3.behaviours = M3.behaviours || {};
    
    
    M3.behaviours.SerieValue = function() {};
    
    M3.behaviours.SerieValue.prototype.run = function(chart){
        
        var scaleY = (chart.axis !== undefined && chart.axis !== null) ? (chart.axis.hasYLeft ? chart.axis.yleft.scale : chart.axis.yright.scale) : null;
        var scaleX = (chart.axis !== undefined && chart.axis !== null) ? (chart.axis.hasXBottom ? chart.axis.xbottom.scale : chart.axis.xtop.scale) : null;
        
        if(chart.className == "ColumnChart") {
            d3.selectAll(chart.config.container + " .chartarea g").append("text")
                .attr("x", function(d) {
                    return scaleX(d[chart.config.itemLabel]) + (scaleX.rangeBand() / 2);
                })
                .attr("y", function(d) { return scaleY(d[chart.config.itemValue]); })
                .attr("dy", "1em")
                .attr("class", "serieLabel")
                .attr("text-anchor", "middle")
                .text(function(d) {
                    return chart.config.yLabelFormat(d[chart.config.itemValue]);
                });
        } else if(chart.className == "LineChart" || chart.className == "AreaChart") {
            d3.selectAll(chart.config.container + " .chartarea g").append("text")
                .attr("dy", function(d){
                    return (M3.utils.getMaxValue(chart) == d[chart.config.itemValue])?"1.5em":"-0.6em";
                })
                .attr("class", "serieLabel")
                .attr("text-anchor", function(d, indx){
                    return (indx === 0)?"start":(indx == (chart.data.length - 1))?"end":"middle";
                })
                .text(function(d) {
                    return chart.config.yLabelFormat(d[chart.config.itemValue]);
                });
        } else if (chart.className == "PieChart" || chart.className == "DonutChart") {
            d3.selectAll(chart.config.container + " .chartarea g").append("text")
                .attr("transform", function(d) {
                    //var dd = {}
                    d.outerRadius = chart.config.radius; // Set Outer Coordinate
                    d.innerRadius = chart.config.radius; // Set Inner Coordinate
                    var a = chart.arc.centroid(d);
                    a[0] *= 1.5;
                    a[1] *= 1.5;
                    
                    //return "translate(" + a + ")";
                    var radius = chart.config.radius;
                    return "translate(" + ( (radius + 14) * Math.sin( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) + "," + ( -1 * (radius + 14) * Math.cos( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) ) + ")";
                })
                .attr("dy", ".35em")
                .attr("class", "serieLabel_polar")
                .attr("text-anchor","middle")
                .attr("text-anchor", function(d) {
                    var rads = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
                    if ( (rads > 7 * Math.PI / 4 && rads < Math.PI / 4) || (rads > 3 * Math.PI / 4 && rads < 5 * Math.PI / 4) ) {
                        return "middle";
                    } else if (rads >= Math.PI / 4 && rads <= 3 * Math.PI / 4) {
                        return "start";
                    } else if (rads >= 5 * Math.PI / 4 && rads <= 7 * Math.PI / 4) {
                        return "end";
                    } else {
                        return "middle";
                    }
                })
                .text(function(d) {
                    return chart.config.valueFormat(d[chart.config.itemValue]);
                });
            d3.selectAll(chart.config.container + " .chartarea g").append("line")
                .attr("x1", function(d) {
                    var radius = chart.config.radius;
                    return ( (radius) * Math.sin( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) );
                })
                .attr("x2", function(d) {
                    var radius = chart.config.radius;
                    return ( (radius + 10) * Math.sin( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) );
                })
                .attr("y1", function(d) {
                    var radius = chart.config.radius;
                    return ( -1 * (radius) * Math.cos( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) );
                })
                .attr("y2", function(d) {
                    var radius = chart.config.radius;
                    return ( -1 * (radius + 10) * Math.cos( ((d.endAngle - d.startAngle) / 2) + d.startAngle ) );
                })
                .attr("stroke", "rgb(204, 204, 204)");
        }
    };
})();
