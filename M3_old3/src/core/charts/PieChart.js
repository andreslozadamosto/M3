(function() {
    "use strict";
    /**
    @class PieChart
    @constructor
    */
    M3.PieChart = M3.PieChart || M3.createClass(M3.AbstractPolarChart, function(){ this.className = "PieChart";});
    
    M3.PieChart.prototype.drawInner = function() {
        this.getArc();
        
        this.getLayout();

        var chart = d3.select(this.config.container + " ." + this.config.styles.canvas);
        chart.attr("class", "canvas pieChart");

        this.addSlices();
    };
    
})();