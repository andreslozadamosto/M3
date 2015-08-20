function KPI() {}
KPI.prototype = Object.create(DonutChart.prototype);
KPI.prototype.constructor = KPI;
KPI.prototype.__super__ = DonutChart.prototype;

KPI.prototype.drawInner = function() {
    
    var scope = this;
    
    var value = scope.data[0][scope.config.itemValue];
    
    var t = 2 * Math.PI;
    
    var arc = this.getArc().startAngle(0);
    
    var svg = this.getChart();
    
    svg.attr("class", "m3_kpi")
    
    var background = svg.append("path")
        .datum({endAngle: t})
        .attr("class", "acomplishment_background")
        .attr("d", arc);
    if(this.hasConfig("backgroundColorFunction")) {
        background.attr("fill", this.getConfValue("backgroundColorFunction")(value));
    }
    
    var acomplishmentClass = (value > 0) ? "acomplishment_ok" : (value < 0) ? "acomplishment_bad" : "acomplishment_zero";
    
    var foreground = svg.append("path")
        .datum({endAngle: (value / 100) * t})
        .attr('class', acomplishmentClass)
        .attr("d", arc);
    if(this.hasConfig("barColorFunction")) {
        background.attr("fill", this.getConfValue("barColorFunction")(value));
    }
    
    svg.append("text")
        .attr("dy", ".35em")
        .attr("class", "txtKPI")
        .text(scope.getLabelFunction()(value.toString()));
}