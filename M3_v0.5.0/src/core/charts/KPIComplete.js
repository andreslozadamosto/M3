(function() {
    "use strict";
    M3.KPIComplete = M3.KPIComplete || M3.createClass(M3.ArcChart);
    
    M3.KPIComplete.prototype.drawInner = function() {
        M3.ArcChart.prototype.drawInner.call(this);
        
        //agrego estilo
        var chart = d3.select(this.config.container + " ." + this.config.styles.canvas);
        chart.attr("class", "canvas kpicompleteChart");
        
        //muevo el areachart
        var areaChart = d3.select(this.config.container + " ." + this.config.styles.canvas + " .chartarea");
        areaChart.attr("transform", "translate(" + this.config.radius + ", " + this.config.radius + ")");
        
        //ubico el background del chart
        var background = d3.select(this.config.container + " ." + this.config.styles.canvas + " .chartarea rect");
        background.attr("x", (this.config.radius / -1))
                .attr("y", (this.config.radius / -1));
        
        var valor = +this.data[0].value;
        var acomplishmentClass = (valor > 0) ? "acomplishment_ok" : (valor < 0) ? "acomplishment_bad" : "acomplishment_zero";
        
        chart.select(".s1")
            .attr("class", "serie " + acomplishmentClass);
        
        var propValue = "";
        var txt = areaChart.append("text")
            .attr("class", "title")
            .attr("dy", "1em")
            .attr("transform", "translate(" + (this.config.radius + 10) + ", " +(this.config.radius * -1) + ")");
        if(this.data !== null) {
            propValue = (this.config.titleItem !== undefined && this.config.titleItem !== "") ? this.config.titleItem : "title";
            if(this.data[0][propValue] !== undefined && this.data[0][propValue] !== null) {
                txt.text(this.data[0][propValue]);
            }
        }
        
        //agrego el texto
        areaChart.append("text")
            .attr("dy", ".35em")
            .attr("class", "txtKPI")
            .attr("text-anchor","end")
            .attr("transform","translate(8,0)")
            .text(this.data[0].value.toString());
        
        //agrego el %
        areaChart.append("text")
            .attr("dy", ".35em")
            .attr("class", "txtKPI_porc")
            .attr("text-anchor","start")
            .attr("transform","translate(8,0)")
            .text("%");
        
        //add Objetivo
        areaChart.append("text")
            .attr("class", "obj_title")
            //.attr("y", this.config.radius)
            .attr("dy", "1em")
            .text("Ojetivo:")
            .attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        txt = areaChart.append("text")
            .attr("class", "obj_value")
            .attr("dy", "1em")
            .attr("dx", "4.4em")
            .attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        if(this.data !== null ) {
            propValue = (this.config.targetItem !== undefined) ? this.config.targetItem : "target";
            if(this.data[0][propValue] !== undefined && this.data[0][propValue] !== null) {
                txt.text(this.data[0][propValue]);
            }
        }
        
        //add Real
        areaChart.append("text")
            .attr("class", "real_title")
            .attr("dy", "2.5em")
            .attr("dx", "1.2em")
            .text("Real:")
            .attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        txt = areaChart.append("text")
            .attr("class", "real_value")
            .attr("dy", "2.5em")
            .attr("dx", "4.4em")
            .attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        if(this.data !== null) {
            propValue = (this.config.realItem !== undefined) ? this.config.realItem : "real";
            if(this.data[0][propValue] !== undefined && this.data[0][propValue] !== null) {
                txt.text(this.data[0][propValue]);
            }
        }
    };
})();