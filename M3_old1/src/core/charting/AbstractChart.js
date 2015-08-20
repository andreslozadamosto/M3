(function() {
    "use strict";
    M3.AbstractChart = M3.AbstractChart || M3.createClass(M3.AbstractDataViz);
    
    /**
    Referencia al layout del grafico
    */
    M3.AbstractChart.prototype.layout = null;
    /**
    Referencia al chart
    */
    M3.AbstractChart.prototype.chart = null;
    /**
    Referencia al conainer (el svg principal)
    */
    M3.AbstractChart.prototype.container = null;
    M3.AbstractChart.prototype.tooltip = null;
    M3.AbstractChart.prototype.tooltipStick = null;
    M3.AbstractChart.prototype.lastClick = null;
    

    /**
    Devuelve el crudo del grafico
    */
    M3.AbstractChart.prototype.raw = function() {
        try {
            return (new XMLSerializer()).serializeToString(this.container[0][0]);
        }
        catch(e) {
            return "";
        }
    };
    
    /**
    Genera el SGV principal
    */
    M3.AbstractChart.prototype.getContainer = function() {
        var scope = this;
        scope.container = d3.select(scope.config.container).append("svg")
            .attr("class", "m3")
            .attr("width", scope.config.canvasWidth)
            .attr("height", scope.config.canvasHeight);
        return scope.container;
    };
    
    /**
    Genera el chart principal
    */
    M3.AbstractChart.prototype.getChart = function() {
        var scope = this;
        scope.container = scope.getContainer();

        scope.chart = scope.container.append("g")
            .attr("class", "m3_inner")
            .attr("transform", scope.getCangasTranslation())
            .attr("width", scope.config.chartWidth)
            .attr("height", scope.config.chartHeight);
        
        this.addTooltipStick();
        this.addTooltip();
        
        return scope.chart;
    };
    
    M3.AbstractChart.prototype.addTooltip = function() {
        var scope = this;
        if(scope.config.showTooltip && d3.tip !== undefined) {
            scope.tooltip = d3.tip()
                      .attr('class', 'd3-tip')
                      .html(scope.getTooltipFunction())
                      .offset([-10, 0]);
            scope.chart.call(scope.tooltip);
        }
    }
    
    M3.AbstractChart.prototype.addTooltipStick = function() {
        var scope = this;
        if(scope.config.showTooltipStick && d3.tip !== undefined) {
            scope.tooltipStick = d3.tip()
                      .attr('class', 'd3-tip')
                      .html(scope.getTooltipFunction())
                      .offset([-10, 0]);
            scope.chart.call(scope.tooltipStick);
        }
    }
    
    /**
    Devuelve el traslate del chart
    */
    M3.AbstractChart.prototype.getCangasTranslation = function() {
        var scope = this;
        return "translate(" + scope.config.margin.left + "," + scope.config.margin.top + ")";
    };
    
    
    M3.AbstractChart.prototype.showValues = function() {
        var scope = this;
        var foo = scope.getLabelFunction();
        if(this.config.showValues !== undefined && scope.config.showValues === true) {
            this.slices.append("text")
                .attr("transform", function(d) { return "translate(0, 0)"; })
                .attr("dy", ".35em")
                .attr("class", "serieLabel")
                .text(foo);
        }
    };
    
    M3.AbstractChart.prototype.getMaxValue = function() {
        var scope = this;
        return (this.data != null) ? d3.max(this.data, function(d) { return d[scope.config.itemValue]; }): NaN;
    }
    M3.AbstractChart.prototype.getMinValue = function() {
        var scope = this;
        return (this.data != null) ? d3.min(this.data, function(d) { return d[scope.config.itemValue]; }): NaN;
    }
})();