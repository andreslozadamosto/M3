(function() {
    "use strict";
    
    M3.behaviours = M3.behaviours || {};
    
    M3.behaviours.Legend = function(config) {
        this.config = M3.extend(
                            {
                                width:15,
                                position:"bottom",
                                nameItem: "name"
                            },
                            (config !== undefined)?config:{});
    };
    
    M3.behaviours.Legend.prototype.run = function(chart){
        var charCont = d3.select(chart.config.container + " svg .chartarea rect");
        var legend = d3.select(chart.config.container + " svg")
            .append("g")
            .attr("class", "legend");
        var x = 0, y = 0;
        var x1 = d3.scale.ordinal();
        var names = null;
        var series = [];
        for(var i = 0; i < chart.config.series.length; i++) {
            names = chart.config.series[i][this.config.nameItem];
            if(names instanceof Array) {
                series = series.concat(names);
            } else {
                series = series.concat([names]);
            }
        }
        x1.domain(series);
        if(this.config.position == "bottom") {
            x = (((chart.axis !== undefined)?chart.axis.getOffset("left"):0) + chart.config.margin.left);
            y = (chart.config.height - this.config.width);
            x1.rangeRoundBands([0, charCont.attr("width")]);
        } else if (this.config.position == "top right") {
            x = chart.config.width - (((chart.axis !== undefined)?chart.axis.getOffset("right"):0) + chart.config.margin.right + 10);
            y = ((chart.axis !== undefined)?chart.axis.getOffset("top"):0) + chart.config.margin.top;
            x1.rangeRoundBands([0, (this.config.width * series.length)]);
        }
        

        legend.attr("transform", "translate(" + x + ", " + y + ")");
        
        for(i = 0; i < chart.config.series.length; i++) {
            names = chart.config.series[i][this.config.nameItem];
            if(names instanceof Array) {
                for(var j = 0; j < names.length; j++) {
                    var legendItem = legend.append("g");
                    if(this.config.position.indexOf("left") < 0 && this.config.position.indexOf("right") < 0) {
                        legendItem.attr("transform", "translate(" + x1(names[j]) + ", 0)");
                        legendItem.append("rect")
                            .attr("class", "s"+(j+1))
                            .attr("width", 10)
                            .attr("height", 10);
                        legendItem.append("text")
                            .attr("transform", "translate(" + 15 + ", 0)")
                            .attr("dy", "1em")
                            .attr("text-anchor","start")
                            .text(names[j]);
                    } else {
                        legendItem.attr("transform", "translate(0, " + x1(names[j]) + ")");
                        legendItem.append("rect")
                            .attr("class", "s"+(j+1))
                            .attr("width", 10)
                            .attr("height", 10);
                        legendItem.append("text")
                            .attr("transform", "translate(-5, 0)")
                            .attr("dy", "1em")
                            .attr("text-anchor","end")
                            .text(names[j]);
                    }
                    
                }
            } else {
                var item = legend.append("g");
                item.attr("transform", "translate(" + x1(names) + ", 0)");
                if(this.config.position.indexOf("left") < 0 && this.config.position.indexOf("right") < 0) {
                        item.attr("transform", "translate(" + x1(names) + ", 0)");
                        item.append("rect")
                            .attr("class", "s"+(i+1))
                            .attr("width", 10)
                            .attr("height", 10);
                        item.append("text")
                            .attr("transform", "translate(" + 15 + ", 0)")
                            .attr("dy", "1em")
                            .attr("text-anchor","start")
                            .text(names);
                    } else {
                        item.attr("transform", "translate(0, " + x1(names) + ")");
                        item.append("rect")
                            .attr("class", "s"+(i+1))
                            .attr("width", 10)
                            .attr("height", 10);
                        item.append("text")
                            .attr("transform", "translate(-5, 0)")
                            .attr("dy", "1em")
                            .attr("text-anchor","end")
                            .text(names);
                    }
            }
        }
    };
})();