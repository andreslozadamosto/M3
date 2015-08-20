(function() {
    "use strict";
    /**
    Base class for datavisualizations
    
    @class M3.DataViz
    @constructor
    @module M3
    */
    M3.DataViz = M3.DataViz || M3CreateClass(Object);
    
    /**
    Config properties storage.
    @property config
    */
    M3.DataViz.prototype.config = null;
    
    /**
    Data to represent on the datavisualization.
    @property data
    */
    M3.DataViz.prototype.data = null;
    /**
    List of behavirours
    @property data
    */
    M3.DataViz.prototype.behaviours = null;
    
    /**
    Set the config properties
    
    Default values
    <table>
        <thead>
            <tr><th>Property</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>margin</td><td>{top: 5, bottom: 5, left: 5, right:5, all:NaN}</td><td></td></tr>
            <tr><td>width</td><td>200</td><td></td></tr>
            <tr><td>margin</td><td>100</td><td></td></tr>
            <tr><td>container</td><td>#chartContainer</td><td></td></tr>
            <tr><td>styles</td><td>{container:"m3" canvas:"canvas" }</td><td></td></tr>
        </tbody>
    </table>
    
    Other properties are calculated on runtime.
    
    If you set margin.all = 15, so margin.left, margin.right, margin.bottom and margin.top are setted to 15.
    
    With the properties width/height/margin are calculated canvasWidth and canvasHeight. The first is Widh - (margin.left + margin.right)
    and the second is the result of height - (margin.top - margin.bottom).
    
    @method setConfig
    @chainable
    @param conf {Object} object with properties
    @return Instance reference
    */
    M3.DataViz.prototype.setConfig = function(conf) {
        var defaults = {
            margin: {
                top:5, bottom:5, left:5, right:5, all:NaN
            },
            width:200,
            height:100,
            container:"#chartContainer",
            styles: {
                container: "m3",
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
        ret.canvasWidth = ret.width - (ret.margin.left + ret.margin.right);
        ret.canvasHeight = ret.height - (ret.margin.top + ret.margin.bottom);
        
        this.config = ret;
        return this;
    };
    
    /**
    Set data to viz
    @method data
    @chainable
    @param data {Array}
    */
    M3.DataViz.prototype.setData = function(value) {
        this.data = value;
        return this;
    };
    
    /**
    Draw the datavisualization.

    @method draw
    @param [data] {Array}
    @param [config] {Object}
    @chainable
    */
    M3.DataViz.prototype.draw = function(data, config) {
        if(config !== undefined) { this.setConfig(config); }
        if(data !== undefined) { this.setData(data); }
        this.beforeDraw();
        this.drawContainer().drawCanvas();
        this.drawInner();
        this.afterDraw();
        
        if(this.behaviours !==  null) {
            for(var i = 0; i < this.behaviours.length; i++) {
                if(this.behaviours[i] !== undefined && this.behaviours[i] !== null) {
                    this.behaviours[i].run(this);
                }
            }
        }
        return this;
    };
    
    /**
    Draw the data
    
    @method drawInner
    @chainable
    @protected
    */
    M3.DataViz.prototype.drawInner = function() {
        return this;
    };
    
    /**
    Add a viz container (a.k.a SVG element)
    
    @method drawContainer
    @chainable
    @protected
    */
    M3.DataViz.prototype.drawContainer = function() {
        var elem = d3.select(this.config.container).append("svg")
            .attr("class", this.config.styles.container)
            .attr("width", this.config.width)
            .attr("height", this.config.height);
        elem.append("rect")
            .attr("width", this.config.width)
            .attr("height", this.config.height)
            .attr("class", "background");
            /*.attr("stroke", "#000000")
            .attr("stroke-width", 0.1)
            .attr("fill", "#EEEEEE");*/
        return this;
    };
    
    /**
    Draw the "g" element into "svg" (container) as canvas to draw the viz.
    
    @method drawCanvas
    @chainable
    @protected
    */
    M3.DataViz.prototype.drawCanvas = function() {
        var elem = d3.select(this.config.container + " ." + this.config.styles.container).append("g")
                    .attr("class", this.config.styles.canvas)
                    .attr("transform", "translate(" + this.config.margin.top + ", " + this.config.margin.left + ")")
                    .attr("width", this.config.canvasWidth)
                    .attr("height", this.config.canvasHeight);
        elem.append("rect")
            .attr("width", this.config.canvasWidth)
            .attr("height", this.config.canvasHeight)
            .attr("class", "background");
            //.attr("fill", "blue");
        return this;
    };
    
    /**
    Execute some code before to draw (a.k.a before to start to create the svg object)
    
    @method beforeDraw
    @protected
    */
    M3.DataViz.prototype.beforeDraw = function() {
    };
    
    /**
    Execute some code ufter to draw (a.k.a ufter to create all svg of datavisualization)
    
    @method afterDraw
    @protected
    */
    M3.DataViz.prototype.afterDraw = function() {
    };
})();

    