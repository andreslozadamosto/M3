(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class M3.AbstractCartesianChart
    @constructor
    @extends M3.AbstractChart
    @module M3
    */
    M3.AbstractCartesianChart = M3.AbstractCartesianChart || M3CreateClass(M3.AbstractChart);
    
    /**
    Reference to axis module.
    See src/core/axis/Axis.js for more information.
    
    @property axis
    */
    M3.AbstractCartesianChart.prototype.axis = null;

    /**
    Add Axis to chart
    */
    M3.AbstractCartesianChart.prototype.addAxis = function(bottom, left, right, top) {
        this.axis = new M3.Axis();
        this.axis.config = this.config;
        this.axis.data = this.data;
        this.axis.canvas = d3.select(this.config.container + " ." + this.config.styles.canvas);
        this.axis.addAllAxis(bottom, left, right, top);
    };
    
    /**
    Draw the data
    
    @method drawInner
    @chainable
    */
    M3.AbstractCartesianChart.prototype.drawInner = function() {
        this.addAxis(this.config.axis.bottom, this.config.axis.left, this.config.axis.right, this.config.axis.top);
        this.drawChartArea();
        return this;
    }
    
    M3.AbstractCartesianChart.prototype.drawChartArea = function() {
        var canvas = d3.select(this.config.container + " ." + this.config.styles.canvas); 
        
        var offsetX = 0;
        offsetX += this.axis.hasYLeft?(this.config.widthYLeft + 1):0;
        offsetX += (this.config.axisYLabelleft !== "" && this.axis.hasYLeft && this.config.axisLabelYPosition == "outer")? this.config.axisLabelWidth:0;
        var offsetY = 0;
        offsetY += this.axis.hasXTop?this.config.heightXTop:0;
        offsetY += (this.config.axisXLabeltop !== "" && this.axis.hasXTop && this.config.axisLabelXPosition == "outer")? this.config.axisLabelWidth:0;
        
        var w = this.config.canvasWidth;
        w -=  this.axis.hasYLeft?(this.config.widthYLeft+1):0;
        w -= (this.config.axisYLabelleft !== "" && this.axis.hasYLeft && this.config.axisLabelYPosition == "outer")? this.config.axisLabelWidth:0;
        w -=  this.axis.hasYRight?(this.config.widthYRight+1):0;
        w -= (this.config.axisYLabelright !== "" && this.axis.hasYRight && this.config.axisLabelYPosition == "outer")? this.config.axisLabelWidth:0;
        
        var h = this.config.canvasHeight;
        h -=  this.axis.hasXTop?this.config.heightXTop:0;
        h -= (this.config.axisXLabeltop !== "" && this.axis.hasXTop && this.config.axisLabelXPosition == "outer")? this.config.axisLabelWidth:0;
        h -=  this.axis.hasXBottom?this.config.heightXBottom:0;
        h -= (this.config.axisXLabelbottom !== "" && this.axis.hasXBottom && this.config.axisLabelXPosition == "outer")? this.config.axisLabelWidth:0;
        
        canvas.append("g")
            .attr("class", "chartarea")
            .attr("transform", "translate(" + offsetX + ", " + offsetY + ")")
            .append("rect")
                .attr("width", w)
                .attr("height", h)
                .attr("class", "background");
                //.attr("fill", "#FFFFFF");
        
        return this;
    };
   
    /**
    Set the config properties
    The same that M3.DataViz plus
    
    Default values
        { 
            itemValue: "value",
            itemLabel: "label,
            axisYLabel: "",
            axisY2Label: "",
            axisXLabel: "",
            axisX2Label:"",
            axisYPadding:20,
            yLabelFormat,
            ticks:NaN
        }
            
    @method setConfig
    @chainable
    @param conf {Object} object with properties
    @return Instance reference
    */
    M3.AbstractCartesianChart.prototype.setConfig = function(conf) {
        var defaultYLabelFormat = function (d) { return d3.format("s")(d); };
        var defaults = {
            //itemValue: "value",
            //itemLabel: "label",
            itemValueMin: "valueMin",
            axisYLabel: "",
            axisXLabel: "",
            axisYPadding: 20,
            yLabelFormat: defaultYLabelFormat,
            ticks:NaN,
            series:null,
            
            heightXBottom:20,
            heightXTop:20,
            widthYLeft:35,
            widthYRight:35,
            itemValueleft:"",itemValueright:"",
            itemLabeltop:"",itemLabelbottom:"",
            axisYLabelleft:"", axisYLabelright:"",
            axisXLabeltop:"", axisXLabelbottom:"",
            axisLabelWidth: 16,
            axisLabelYPosition: "outer",
            axisLabelXPosition: "inner",
            axis: { top:false, bottom:false, left:false, right: false }
        };
        var configs = M3.mixin(conf, defaults);
        M3.AbstractChart.prototype.setConfig.call(this, configs);
        
        return this;
    };
    
})();