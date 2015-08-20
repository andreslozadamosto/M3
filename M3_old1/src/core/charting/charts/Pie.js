(function() {
    "use strict";
    M3.PieChart = M3.PieChart || M3.createClass(M3.AbstractPolarChart);
    
    M3.PieChart.prototype.drawInner = function() {
        var scope = this;
        
        this.getArc();
        
        this.getLayout();

        var chart = this.getChart();
        chart.attr("class", "pie");

        this.addSlices();

        this.showValues();
        
        if(this.config.showTooltip && this.tooltip !== null) {
            this.slices
                .on('mouseover', this.tooltip.show)
                .on('mouseout', this.tooltip.hide)
                .on('click', function(d) {
                    scope.tooltipStick.hide(d);
                    if(d != scope.lastClick) {
                        scope.tooltipStick.show(d);
                        scope.lastClick = d;
                    } else {
                        scope.lastClick = null;
                    }
                  });
        }
    };
    
    
    
    
})();