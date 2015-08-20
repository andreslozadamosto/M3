function PieChart() {}
PieChart.prototype = Object.create(AbstractPolarChart.prototype);
PieChart.prototype.constructor = PieChart;
PieChart.prototype.__super__ = AbstractPolarChart.prototype;

PieChart.prototype.drawInner = function() {
    
    var scope = this;

    //var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
    var arc = this.getArc();
    
    var pie = this.getLayout();
    
    var svg = this.getChart();
    
    var slices = this.addSlices();
    
    if(scope.config.showValues != undefined && scope.config.showValues == true) {
        slices.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data[scope.config.itemLabel]; });
    }
    
    
    //(new XMLSerializer()).serializeToString(this.container[0][0])
    
    this.container.append("svg:image")
        .attr('x',0)
        .attr('y',0)
        .attr('width', 24)
        .attr('height', 24)
        .attr("xlink:href","css/table.png")
        .attr("class","button")
        .on("click", function() { 
                        
            scope.chart.style('display', 'none');
            scope.showTableView.call(scope);
            //scope.chart.data([]).exit().remove();
            /**/
        });
}

PieChart.prototype.chartTable = null;
PieChart.prototype.showTableView = function() {
    if(this.chartTable) {
        this.chartTable.style('display', 'block');
    } else {
        var dataset = {
                rowLabel: ['A', 'B', 'C', 'D', 'E'],
                columnLabel: ['P', 'Q', 'R', 'S'],
                value: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]]
            };

        var table = Tablita().width(this.config.width).height((dataset.rowLabel.length + 1) * 40);
        this.chartTable = this.container.append('g');//.style('overflow', 'scroll');
        this.chartTable.datum(dataset).call(table);
    }
}

  

  

  

