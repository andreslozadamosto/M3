(function() {
    "use strict";
    /**
    @class M3.AbstractPolarChart
    @constructor
    @extends M3.AbstractChart
    @module M3
    */
    M3.AbstractPolarChart = M3.AbstractPolarChart || M3.createClass(M3.AbstractChart);
    
    /**
    Referencia a los arcos del piec
    @property arc
    */
    M3.AbstractPolarChart.prototype.arc = null;
    /**
    @property slice
    */
    M3.AbstractPolarChart.prototype.slices = null;
    
    /**
    Genera los arcos del Pie
    
    @method getArc
    */
    M3.AbstractPolarChart.prototype.getArc = function() {
        var scope = this;
        scope.arc = d3.svg.arc().outerRadius(scope.config.radius).innerRadius(0);
        return scope.arc;
    };
    
    /**
    Genera el layout de pie
    
    @method getLayout
    */
    M3.AbstractPolarChart.prototype.getLayout = function() {
        var scope = this;
        scope.layout = d3.layout.pie().sort(null).value(function(d) { return d[scope.config.itemValue]; });
        return scope.layout;
    };
    
    /**
    Genera los slies del pie
    
    @method addSlices
    */
    M3.AbstractPolarChart.prototype.addSlices = function() {
        var scope = this;
        var color = null;//this.getColorFunction();
        
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        var chart = canvas.append("g")
            .attr("class", "chartarea")
            .attr("transform", "translate(" + (scope.config.canvasWidth / 2) + "," + (scope.config.canvasHeight / 2) + ")");
        chart.append("rect")
                .attr("width", this.config.canvasWidth)
                .attr("height", this.config.canvasHeight)
                .attr("class", "background")
                .attr("x", (scope.config.canvasWidth / -2))
                .attr("y", (scope.config.canvasHeight / -2));
        
        var slices = chart.selectAll(".arc")
            .data(scope.layout(scope.data))
            .enter().append("g")
            .attr("class", "arc");

        slices.append("path")
            .attr("d", scope.arc)
            .attr("class", function(d, index) {
                var indx = (+index) + 1;
                return "serie s" + ((indx < 11)?indx.toString():(indx % 10).toString());//color(d.data[scope.config.itemValue]);
            });
        if(color !== null){
            slice.style("fill", function(d) { return color(d.data[scope.config.itemValue]); });
        }
        
        this.slices = slices;
        return slices;
    };
    

    M3.AbstractPolarChart.prototype.beforeDraw = function() {
        M3.AbstractChart.prototype.beforeDraw.call(this);
        if(this.config.radius === undefined || this.config.radius === null || isNaN(this.config.radius)) {
            this.config.radius = Math.min(this.config.canvasWidth, this.config.canvasHeight) / 2;
        }
    };
    
    M3.AbstractPolarChart.prototype.resize = function(width, height) {
        M3.AbstractChart.prototype.resize.call(this, [width, height]);
        
    };
   
})();