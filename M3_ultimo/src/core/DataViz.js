(function() {
    "use strict";
    /**
    Base class for datavisualizations
    
    @class M3.DataViz
    @constructor
    @module M3
    */
    M3.DataViz = M3.DataViz || M3CreateClass(Object);
    
    M3.DataViz.MIN_WIDTH_SIZE = 200;
    M3.DataViz.MIN_HEIGHT_SIZE = 100;
    
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
    Text to show when there is no data
    @property
    */
    M3.DataViz.prototype.noDataText = "There is no data to display";
    
    /**
    List of behavirours
    @property data
    */
    M3.DataViz.prototype.behaviours = null;
    
    /**
    Set the config properties
    
    Default values:
    <table>
        <thead>
            <tr><th>Property</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>margin</td><td>{top: 5, bottom: 5, left: 5, right:5, all:NaN}</td><td></td></tr>
            <tr><td>width</td><td>Width of the container or 200 if it is zero</td><td>Width of the Datavisualization</td></tr>
            <tr><td>height</td><td>Height of the container or takes the with size if it is zero</td><td>Height of the datavisualization</td></tr>
            <tr><td>container</td><td>#chartContainer</td><td>Id of the html element that contains the datavisualization</td></tr>
            <tr><td>styles</td><td>{container:"m3" canvas:"canvas" }</td><td></td></tr>
            <tr><td>resize</td><td>options: "fixed":fix to the container, "ratio":maintein aspect ratio (aspectRatio property)</td><td></td></tr>
        </tbody>
    </table>
    
    This properties are calculated on runtime based on the previous properties:
    <table>
        <thead>
            <tr><th>Property</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>canvasWidth</td><td>Get its value from: widh - (margin.left + margin.right)</td><td>Is the width of the area where the datavisualization will be plotted</td></tr>
            <tr><td>canvasHeight</td><td>Get its value from: height - (margin.top + margin.bottom)</td><td>Is the height of the area where the datavisualization will be plotted</td></tr>
            <tr><td>aspectRatio</td><td>Get its value from: heigh / width</td><td>The aspectRatio for autoresizing</td></tr>
        </tbody>
    </table>
    
    If you set margin.all = 15, so margin.left, margin.right, margin.bottom and margin.top are setted to 15.
    
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
            container:"#chartContainer",
            styles: {
                container: "m3",
                canvas:"canvas",
                nodatatext:"nodatatext"
            },
            resize:"fixed"
        };
        
        var ret = {};
        /*//if there is a previous config
        if(this.config && conf) {
        //if(this.config !== undefined && this.config !== null && conf !== undefined) {
            ret = M3.extend(this.config, conf)
        } else {
            ret = M3.extend(defaults, (conf)?conf:{});
        }*/
        if(this.config) {
            ret = M3.extend(this.config, (conf)?conf:{})
        } else {
            ret = M3.extend(defaults, (conf)?conf:{});
        }
        
        //if(ret["width"] === undefined || ret["width"] === null || isNaN(ret["width"])) {
        if(!+ret.width || +ret.width < M3.DataViz.MIN_WIDTH_SIZE) {
            ret.width = M3.Utils.getWidthOfDiv(ret.container);
            if(!+ret.width || +ret.width < M3.DataViz.MIN_WIDTH_SIZE) ret.width = M3.DataViz.MIN_WIDTH_SIZE;
        }
        //if(ret["height"] === undefined || ret["height"] === null || isNaN(ret["height"])) {
        if(!+ret.height ||  +ret.height < M3.DataViz.MIN_HEIGHT_SIZE ) {
            ret["height"] = M3.Utils.getHeightOfDiv(ret.container);
            //if(isNaN(ret.height) || ret.height === 0 ) ret.height = ret.width;
            if(!+ret.height ||  +ret.height < M3.DataViz.MIN_HEIGHT_SIZE ) ret.height = M3.DataViz.MIN_HEIGHT_SIZE;
        }
        
        ret.aspectRatio = ret.height / ret.width;
        
        //check if "all" is a Number
        //if(ret.margin.all !== undefined && ret.margin.all !== null && !isNaN(ret.margin.all)) {
        if(+ret.margin.all || +ret.margin.all === 0) {
            ret.margin.top = ret.margin.bottom = ret.margin.left = ret.margin.right = conf.margin.all;
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
    M3.DataViz.prototype.draw = function(data, conf) {
        /*if(conf) { 
            this.setConfig(conf); 
        } else if(!this.config === undefined || this.config === null) {
            this.setConfig();
        }*/
        this.setConfig((conf)?conf:null);
        
        if(data) { this.setData(data); }
        
        this.beforeDraw();
        
        if(this.hasCanvas()) {
            this.clear();
        } else {
            this.drawContainer().drawCanvas();
        }
        
        //if(this.data === undefined || this.data == null || (this.data instanceof Array && this.data.length === 0) ) {
        if(!this.data || !this.data.length) {
            this.showNoDataMsj();   
        } else {
            this.drawInner();
        }
        
        this.afterDraw();
        
        if(this.behaviours && this.behaviours.length) {
            for(var i = 0; i < this.behaviours.length; i++) {
                //if(this.behaviours[i] !== undefined && this.behaviours[i] !== null) {
                if(this.behaviours[i]) {
                    this.behaviours[i].run(this);
                }
            }
        }
        //var scope = this;
        //d3.select(window).on("resize", function(){ console.log("resize"); scope.resize(); });
        return this;
    };
    
    
    /**
    Return a reference to canvas svg element
    
    @protected
    */
    M3.DataViz.prototype.getCanvas = function() {
        return d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas);
    }
    
    /**
    Indicate if canvas svg element exist
    
    @protected
    */
    M3.DataViz.prototype.hasCanvas = function() {
        var canvas = this.getCanvas();
        return (canvas && canvas.length && canvas[0][0]);
    }
    
    /**
    Display the message of no data
    
    @method showNoDataMsj
    @protected
    @chainable
    */
    M3.DataViz.prototype.showNoDataMsj = function() {
        //var canvas = d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas);
        var canvas = this.getCanvas();
        
        if(canvas) {
            var y = this.config.margin.top + Math.round(this.config.canvasHeight/2);
            var x = Math.round(this.config.canvasWidth / 2);
            canvas.append("text")
                .attr("class", this.config.styles.nodatatext)
                .attr("transform", "translate(" + x + ", " + y + ")")
                .attr("text-anchor", "middle")
                .text(this.noDataText); 
        }
        return this;
    }
    
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
                    .attr("transform", "translate(" + this.config.margin.left + ", " + this.config.margin.top + ")")
                    .attr("width", this.config.canvasWidth)
                    .attr("height", this.config.canvasHeight);
        elem.append("rect")
            .attr("width", this.config.canvasWidth)
            .attr("height", this.config.canvasHeight)
            .attr("class", "background");
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
    
    /*
    Remove all internal data and remove svg elements.
    
    @method remove
    */
    M3.DataViz.prototype.remove = function() {
        this.clear();
        d3.select(this.config.container + " ." + this.config.styles.container).remove();
        this.data = null;
        this.config = null;
    }
    
    
    /**
    Remove data visualization (a.k.a. series, lines, axis, etc, anything inside "canvas" element).
    
    @chainable
    */
    M3.DataViz.prototype.clear = function() {
        if(this.behaviours !==  null) {
            for(var i = 0; i < this.behaviours.length; i++) {
                if(this.behaviours[i] !== undefined && this.behaviours[i] !== null) {
                    if(this.behaviours[i].remove !== undefined && this.behaviours[i].remove !== null) {
                        this.behaviours[i].remove(this);
                    }
                }
            }
        }
        
        d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas).remove();
        return this.drawCanvas();
    }
    
    /**
    Resize DataViz. If width/height are not setted the new size is calculated throught config.aspectRatio property. If width/height are lower
    than the default min sizes the default min size are used.
    
    @param [width] {Number}
    @param [height] {Number}
    
    @chainable
    */
    M3.DataViz.prototype.resize = function(width, height) {
        //var w = (width === undefined || width === null || isNaN(width)) ? M3.Utils.getWidthOfDiv(this.config.container) : width;
        var w = (!+width || +width < M3.DataViz.MIN_WIDTH_SIZE) ? M3.Utils.getWidthOfDiv(this.config.container) : width;
        w = (w < M3.DataViz.MIN_WIDTH_SIZE) ? M3.DataViz.MIN_WIDTH_SIZE : w;
        
        var h = NaN;
        if(this.config.resize == "fixed") {
            //h = (height === undefined || height === null || isNaN(height)) ? M3.Utils.getHeightOfDiv(this.config.container) : height;
            h = (!+height || +height < M3.DataViz.MIN_HEIGHT_SIZE) ? M3.Utils.getHeightOfDiv(this.config.container) : height;
            h = (h < M3.DataViz.MIN_HEIGHT_SIZE) ? M3.DataViz.MIN_HEIGHT_SIZE : h;
        } else {
            //h = (height === undefined || height === null || isNaN(height)) ? w * this.config.aspectRatio : height;
            h = (!+height || +height < M3.DataViz.MIN_HEIGHT_SIZE) ? w * this.config.aspectRatio : height;
            h = (h < M3.DataViz.MIN_HEIGHT_SIZE) ? M3.DataViz.MIN_HEIGHT_SIZE : h;
        }
        //console.log("resize: " + w + "/" + h);
        this.setConfig({width:w, height:h});
        d3.select(this.config.container + " ." + this.config.styles.container)
            .attr("width", this.config.width)
            .attr("height", this.config.height);
        d3.select(this.config.container + " ." + this.config.styles.container +" > rect")
            .attr("width", this.config.width)
            .attr("height", this.config.height);
        d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas)
            .attr("width", this.config.canvasWidth)
            .attr("height", this.config.canvasHeight);
        d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas + " > rect")
            .attr("width", this.config.canvasWidth)
            .attr("height", this.config.canvasHeight);
        d3.select(this.config.container + " ." + this.config.styles.container + " ." + this.config.styles.canvas + " ." + this.config.styles.nodatatext)
            .attr("transform", "translate(" + Math.round(this.config.canvasWidth/2) + ", " + Math.round(this.config.canvasHeight/2) + ")");
        
        return this;
    };
})();

    