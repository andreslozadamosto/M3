(function() {
    "use strict";
    /**
    Class to manage Axis

    @class M3.Axis.AxisManager
    @constructor
    @module M3
    @submodule M3.Axis
    */
    M3.Axis.AxisManager = function () {
        this.config = null;
        this.data = null;
        this.axis = {left:null, right:null, top:null, bottom:null };
    };
    
    
    /**
    Set Axis configuration.

    @method setConfig
    @param value {Object} Configuration Values
    @return AxisManager (this)
    @chainable
    */
    M3.Axis.AxisManager.prototype.setConfig = function(value) {
        this.config = value;
        return this;
    };
    
    /**
    Set data to display on datavisualization. It's used to define the domain and axis limits.
    
    @method setData
    @param value {Array}
    @chainable
    */
    M3.Axis.AxisManager.prototype.setData = function(value) {
        this.data = value;
        return this;
    };
    
    /**
    Shows and draws the axis.
    
    @method show
    @param [data] {Array}
    @param [config] {Array}
    @chainable
    */
    M3.Axis.AxisManager.prototype.show = function(data, config) {
        if(data !== undefined) { this.data = data; }
        if(config !== undefined) { this.config = config; }
        
        if(this.data === undefined || this.data === null) { return; }
        if(this.config === undefined || this.config === undefined) { return; }
        
        if(this.config.axis === undefined || this.config.axis === null) { return; }
        
        if(!(this.config.axis instanceof Array)) { return; }
        
        for(var i = 0; i < this.config.axis.length; i++) {
            this.axis[this.config.axis[i].pos] = {
                                                axis: null,
                                                conf: this.defaultConf(this.config.axis[i])
                                            };
        }
        if(this.axis.left !== null) { this.drawLeftAxis(this.axis.left); }
        if(this.axis.bottom !== null) { this.drawBottomAxis(this.axis.bottom); }
        if(this.axis.right !== null) { this.drawRightxis(this.axis.right); }
        if(this.axis.top !== null) { this.drawTopAxis(this.axis.top); }
        
        return this;
    };
    
    /**
    Draw rigth axis
    
    @method drawRightxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawRightxis = function(axis) {
        var x = this.config.canvasWidth - this.getOffset("right");
        var y = this.getOffset("top");
        var w = axis.conf.width;
        var h = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        
        var canvas = d3.select(this.config.container + " .canvas");
        
        var claz = M3, i = 0;
        var vec = axis.conf.clazz.split(".");
        while(i < vec.length){
            claz = claz[vec[i++]];
        }
        
        axis.axis = (new claz()).canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
    };

    /**
    Draw left axis
    
    @method drawLeftAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawLeftAxis = function(axis) {
        var x = axis.conf.width + ((axis.conf.labelPosition == "outer"  && axis.conf.label !== "")?axis.conf.labelWidth:0);
        var y = this.getOffset("top");
        var w = axis.conf.width;
        var h = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        
        var canvas = d3.select(this.config.container + " .canvas");
        
        var claz = M3, i = 0;
        var vec = axis.conf.clazz.split(".");
        while(i < vec.length){
            claz = claz[vec[i++]];
        }
        
        axis.axis = (new claz()).canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
    };
    
    /**
    Draw bottom axis
    
    @method drawBottomAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawBottomAxis = function(axis) {
        var x = this.getOffset("left");
        var y = this.config.canvasHeight - this.getOffset("bottom");
        var w = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var h = axis.conf.width;
        
        var canvas = d3.select(this.config.container + " .canvas");
        
        var claz = M3, i = 0;
        var vec = axis.conf.clazz.split(".");
        while(i < vec.length){
            claz = claz[vec[i++]];
        }
        
        axis.axis = (new claz()).canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
    };
    
    /**
    Draw top axis
    
    @method drawTopAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawTopAxis = function(axis) {
        var x = this.getOffset("left");
        var y = axis.conf.width + ((axis.conf.labelPosition == "outer" && axis.conf.label !== "")?axis.conf.labelWidth:0);
        var w = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var h = axis.conf.width;
        
        var canvas = d3.select(this.config.container + " .canvas");
        
        var claz = M3, i = 0;
        var vec = axis.conf.clazz.split(".");
        while(i < vec.length){
            claz = claz[vec[i++]];
        }
        
        axis.axis = (new claz()).canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
    };
    
    /**
    Gets the offset a side of the chart.
    For example getOffset("left") gets the widht of y left axis that is equal to = "label width" + "axis width". Where both properties are
    defined in the configuration object (labelWidth and width).
    
    @method getOffset
    @param pos {String} The side that want to get the offset [left, right, top, bottom]
    @return A value of offset (Number).
    @protected
    */
    M3.Axis.AxisManager.prototype.getOffset = function(pos) {
        var offset = 0;
        if(this.axis[pos] !== null && this.axis[pos].conf.show === true) {
            offset += this.axis[pos].conf.width;
            offset += (this.axis[pos].conf.labelPosition == "outer" && this.axis[pos].conf.label !== "")?this.axis[pos].conf.labelWidth:0;
        }
        return offset;
    };
    
    /**
    Set default config
    
    @method defaultConf
    @param conf
    @protected
    */
    M3.Axis.AxisManager.prototype.defaultConf = function(conf) {
        var config = {};
        config.id = "";
        //config.axis = "y"; //[y,x]
        config.pos = "left"; //[left, right, top, bottom]
        config.label = "";
        config.labelPosition = "outer"; //[none, inner, outer]

        config.serie = this.config.itemValue;
        config.width = 35;
        config.show = true;
        config.labelWidth = 18;
        
        config.clazz = "Axis.LinealAxis";
        config.tickSize = NaN;
        config.tickPadding = NaN;
        
        config = M3.extend({}, config, conf);
        
        if(config.pos == "left" || config.pos == "right") {
            config.axis = "y";
            config.width = (config.width === undefined || config.width === null || isNaN(config.width))?35:config.width;
        } else {
            config.axis = "x";
            config.width = (conf.width === undefined || conf.width === null || isNaN(conf.width))?20:config.width;
            config.serie = (conf.serie === undefined || conf.serie === null)?((this.config.itemLabel !== undefined && this.config.itemLabel !== null)?this.config.itemLabel:"label"):config.serie;
        }
        config.labelWidth = (config.labelWidth === undefined || config.labelWidth === null || isNaN(config.labelWidth))?18:config.labelWidth;
        
        if(config.axis == "y") {
            config.tickFormat = (conf.tickFormat === undefined || conf.tickFormat === null)?((this.config.valueFormat === undefined || this.config.valueFormat === null)?function (d) { return d3.format("s")(d); }:this.config.valueFormat):config.tickFormat;
        } else {
            config.tickFormat = (conf.tickFormat === undefined || conf.tickFormat === null)?((this.config.labelFormat === undefined || this.config.labelFormat === null)?function (d) { return d; }:this.config.labelFormat):config.tickFormat;
        }
        
        return config;
    };
    
})();