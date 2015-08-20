(function() {
    "use strict";
    /**
    Base class for datavisualizations
    
    @class DataViz
    @constructor
    */
    M3.DataViz = M3.DataViz || M3CreateClass(Object);
    
    /**
    Config properties storage.
    @property config
    */
    M3.property.config = null;
    /**
    Data to represent on the datavisualization.
    @proeprty data
    */
    M3.property.data = null;
    
    /**
    Set the config properties
    
    Default values
        { 
            margin: {top: 5, bottom: 5, left: 5, right:5, all:NaN}
            width: 200,
            height:100
        }
            
    @method config
    @chainable
    @param conf {Object} object with properties
    @return Instance reference
    */
    M3.DataViz.prototype.config = function(conf) {
        var defaults = {
            margin: {
                top:5, bottom:5, left:5, right:5, all:NaN
            },
            width:200,
            height:100,
            continer:"#chartContainer",
            styles: {
                svg: "m3",
                canvas:"canvas"
            }
        };
        
        var ret = M3.extend(defaults, conf);
        
        if(conf !== undefined && conf !== null) {
            if(conf.margin !== undefined && conf.margin !== null) {
                var margin = +conf.margin.all;
                if(!isNaN(margin) && typeof(margin) == "number") {
                    ret.margin.top = ret.margin.bottom = ret.margin.left = ret.margin.right = conf.margin.all;
                }
            }
        }
        
        return this;
    };
    
    /**
    Set data to viz
    @method data
    @chainable
    @param data {Array[Object]}
    */
    M3.Dataviz.prototype.data = function(data) {
        this.data = data;
        return this;
    }
    
    /**
    @method draw
    Draw the datavisualization
    
    */
    M3.DataViz.prototype.draw = function(data, config) {
        this.beforeDraw();
        this.drawCanvas();
        this.afterDraw();
    };
    
    M3.DataViz.prototype.drawCanvas = function() {
        var svg = d3.select(this.config.container).append("svg")
                    .attr("class", this.config.styles.svg)
                    .attr("transformation", "translate(" + this.config.margin.top + ", " + this.config.margin.left + ")")
    }
    
    /**
    Execute some code before to draw (a.k.a before to start to create the svg object)
    */
    M3.DataViz.prototype.beforeDraw = function() {
    }
    /**
    Execute some code ufter to draw (a.k.a ufter to create all svg of datavisualization)
    */
    M3.DataViz.prototype.afterDraw = function() {
    }
})();

    