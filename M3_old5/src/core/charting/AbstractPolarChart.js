(function() {
    "use strict";
    M3.AbstractPolarChart = M3.AbstractPolarChart || M3.createClass(M3.AbstractChart);
    
    /**
    Referencia a los arcos del pie
    */
    M3.AbstractPolarChart.prototype.arc = null;
    M3.AbstractPolarChart.prototype.slices = null;
    
    /**
    Genera los arcos del PIE
    */
    M3.AbstractPolarChart.prototype.getArc = function() {
        var scope = this;
        scope.arc = d3.svg.arc().outerRadius(scope.config.radius).innerRadius(0);
        return scope.arc;
    };
    
    M3.AbstractPolarChart.prototype.addTooltip = function() {
        var scope = this;
        if(scope.config.showTooltip && d3.tip !== undefined) {
            scope.tooltip = d3.tip()
                      .attr('class', 'd3-tip')
                      .html(scope.getTooltipFunction())
                      .offset([0, 0]);
            scope.chart.call(scope.tooltip);
        }
    }
    
    M3.AbstractPolarChart.prototype.addTooltipStick = function() {
        var scope = this;
        if(scope.config.showTooltipStick && d3.tip !== undefined) {
            scope.tooltipStick = d3.tip()
                      .attr('class', 'd3-tip')
                      .html(scope.getTooltipFunction())
                      .offset([0, 0]);
            scope.chart.call(scope.tooltipStick);
        }
    }
    
    /**
    Genera el layout de pie
    */
    M3.AbstractPolarChart.prototype.getLayout = function() {
        var scope = this;
        scope.layout = d3.layout.pie().sort(null).value(scope.getValueFunction());//function(d) { return d[scope.config.itemValue]; });
        return scope.layout;
    };
    
    /**
    Genera los slies del pie
    */
    M3.AbstractPolarChart.prototype.addSlices = function() {
        var scope = this;
        var color = this.getColorFunction();
        var slices = scope.chart.selectAll(".arc")
            .data(scope.layout(scope.data))
            .enter().append("g")
            .attr("class", "arc");

        slices.append("path")
            .attr("d", scope.arc)
            .attr("class", function(d, index) {
                var indx = (+index) + 1;
                return "s" + ((indx < 8)?indx.toString():(indx % 7).toString());//color(d.data[scope.config.itemValue]);
            });
        if(color !== null){
            slice.style("fill", function(d) { return color(d.data[scope.config.itemValue]); });
        }
        
        this.slices = slices;
        return slices;
    };
    
    /**
    */
    M3.AbstractPolarChart.prototype.beforeDraw = function() {
        M3.AbstractChart.prototype.beforeDraw.call(this);
        if(!this.hasConfig("radius")) {
            this.config.radius = Math.min(this.config.chartWidth, this.config.chartHeight) / 2;
        }
    };

    /**
    Devuelve el traslate del chart
    */
    M3.AbstractPolarChart.prototype.getCangasTranslation = function() {
        var scope = this;
        return "translate(" + (scope.config.margin.left + (scope.config.chartWidth / 2)) + "," + (scope.config.margin.top + (scope.config.chartHeight / 2)) + ")";
    };
    
    M3.AbstractPolarChart.prototype.showValues = function() {
        var scope = this;
        var foo = scope.getLabelFunction();
        if(this.config.showValues !== undefined && scope.config.showValues === true) {
            this.slices.append("text")
                .attr("transform", function(d) { return "translate(" + scope.arc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .attr("class", "serieLabel_polar")
                .attr("text-anchor", "middle")
                .text(foo);
        }
    };
    
})();