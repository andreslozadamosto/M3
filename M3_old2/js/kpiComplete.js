function KPIComplete() {}
KPIComplete.prototype = Object.create(KPI.prototype);
KPIComplete.prototype.constructor = KPIComplete;
KPIComplete.prototype.__super__ = KPI.prototype;

KPIComplete.prototype.getCangasTranslation = function() {
    var scope = this;
    return "translate(" + scope.config.radius + "," + scope.config.height / 2 + ")";
}

KPIComplete.prototype.afterDraw = function() {
    
    var data = null;
    if(this.data instanceof Array) {
        data = this.data[0];
    } else {
        data = this.data;
    }
    var propValue = "";
    var svg = this.container.append("g")
        .attr("class", "m3_kpicomplete")
        .attr("transform", "translate(" + this.config.radius * 2 + ", " + this.config.chartMargin + ")");
    
    var txt;
    //add title
    txt = svg.append("text")
        .attr("class", "title")
        .attr('dy', '1em');
    if(data != null) {
        propValue = (this.hasConfig("titleItem")) ? this.getConfValue("titleItem") : "title";
        if(data[propValue] != undefined && data[propValue] != null) {
            txt.text(data[propValue]);
        }
    }
    
    //add Objetivo
    svg.append("text")
        .attr("class", "obj_title")
        .attr("y", this.config.radius)
        .text("Ojetivo:");
    txt = svg.append("text")
        .attr("class", "obj_value")
        .attr("y", this.config.radius)
        .attr('dx', '4.4em');
    if(data != null ) {
        propValue = (this.hasConfig("targetItem")) ? this.getConfValue("targetItem") : "target";
        if(data[propValue] != undefined && data[propValue] != null) {
            txt.text(d3.format(this.config['targetFormat'])(data[propValue]));
        }
    }
    
    //add Real
    svg.append("text")
        .attr("class", "real_title")
        .attr("y", this.config.radius)
        .attr('dy', '1.5em')
        .attr('dx', '1.2em')
        .text("Real:");
    txt = svg.append("text")
        .attr("class", "real_value")
        .attr("y", this.config.radius)
        .attr('dy', '1.5em')
        .attr('dx', '4.4em');
    if(data != null) {
        propValue = (this.hasConfig("realItem")) ? this.getConfValue("realItem") : "real";
        if(data[propValue] != undefined && data[propValue] != null) {
            txt.text(d3.format(this.config['targetFormat'])(data[propValue]));
        }
    }
}