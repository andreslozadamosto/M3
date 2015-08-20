(function() {
    "use strict";
    M3.SliceChart = M3.SliceChart || M3.createClass(M3.ArcChart, function(){ this.className = "SliceChart";});
    
    M3.SliceChart.prototype.getArc = function() {
        var scope = this;
        scope.arc = d3.svg.arc()
                .outerRadius(scope.config.radius);
        return scope.arc;
    };
    
    M3.SliceChart.prototype.drawInner = function() {
        M3.ArcChart.prototype.drawInner.call(this);
        
        var chart = d3.select(this.config.container + " ." + this.config.styles.canvas);
        chart.attr("class", "canvas sliceChart");
    };
})();