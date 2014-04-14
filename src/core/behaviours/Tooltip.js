(function() {
    "use strict";
    
    M3.behaviours = M3.behaviours || {};
    
    M3.behaviours.Tooltip = function() {
        this.tooltip = null;
        this.tooltipStick = null;
        this.lastClick = null;
    };
    
    M3.behaviours.Tooltip.prototype.run = function(chart){
        var scope = this;
        var canvas =  d3.select(chart.config.container + " .canvas");
        this.tooltipStick = d3.tip()
                      .attr("class", "d3-tip")
                      .html(function(item) {
                            //funcion para parsear el tooltip
                            return item.label + ": " + d3.format("s")(item.value);
                        })
                      .offset([-10, 0]);
        canvas.call(this.tooltipStick);
        
        this.tooltip = d3.tip()
                      .attr("class", "d3-tip")
                      .html(function(item) {
                            //funcion para parsear el tooltip
                            return item.label + ": " + d3.format("s")(item.value);
                        })
                      .offset([-10, 0]);
        canvas.call(this.tooltip);
        
        canvas.selectAll(".serie")
                .on("mouseover", this.tooltip.show)
                .on("mouseout", this.tooltip.hide)
                .on("click", function(d) {
                    scope.tooltipStick.hide(d);
                    if(d != scope.lastClick) {
                        scope.tooltipStick.show(d);
                        scope.lastClick = d;
                    } else {
                        scope.lastClick = null;
                    }
                  });
    };
})();