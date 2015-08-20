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
        //if(data !== undefined) { this.data = data; }
        if(data) { this.data = data; }
        //if(config !== undefined) { this.config = config; }
        if(config) { this.config = config; }
        
        //if(this.data === undefined || this.data === null) { throw new Error("AxisManager - No data setted"); return; }
        if(!this.data) { throw new Error("AxisManager - No data setted"); return; }
        //if(this.config === undefined || this.config === undefined) { throw new Error("AxisManager - No config setted"); return; }
        if(!this.config) { throw new Error("AxisManager - No config setted"); return; }
        
        //if(this.config.axis === undefined || this.config.axis === null) { return; }
        
        //if(!(this.config.axis instanceof Array)) { return; }
        var axisList = this.fillAxis(this.config.axis);
        //for(var i = 0; i < this.config.axis.length; i++) {
        for(var i = 0; i < axisList.length; i++) {
            var confAxis = this.defaultConf(axisList[i]);
            this.axis[axisList[i].pos] = {
                                                axis: this.getAxisObj(confAxis.clazz).config(confAxis),
                                                conf:confAxis
                                                //conf:this.config.axis[i]
                                            };
        }
        //if(this.axis.left !== null) { this.drawLeftAxis(this.axis.left); }
        if(this.axis.left) { this.drawLeftAxis(this.axis.left); }
        //if(this.axis.bottom !== null) { this.drawBottomAxis(this.axis.bottom); }
        if(this.axis.bottom) { this.drawBottomAxis(this.axis.bottom); }
        //if(this.axis.right !== null) { this.drawRightxis(this.axis.right); }
        if(this.axis.right) { this.drawRightxis(this.axis.right); }
        //if(this.axis.top !== null) { this.drawTopAxis(this.axis.top); }
        if(this.axis.top) { this.drawTopAxis(this.axis.top); }
        
        return this;
    };
    
    M3.Axis.AxisManager.prototype.fillAxis = function(axis) {
        if(axis == null) {
            return [{pos:"left"}, {pos:"bottom"}];
        } else {
            var a = [];
            var hasAxis = [false, false];
            axis.forEach(function(item, indx, arr){
                //if(item !== undefined && item !== null && item.pos !== undefined && item.pos !== null) {
                if(item && item.pos) {
                    if(item.pos == "left" || item.pos == "right") {
                        hasAxis[0] = true;
                        a.push(item);
                    } else if(item.pos == "bottom" || item.pos == "top") {
                        hasAxis[1] = true;
                        a.push(item);
                    }
                }
            });
            if(!hasAxis[0]) a.push({pos:"letf"});
            if(!hasAxis[1]) a.push({pos:"bottom"});
            return a;
        }
    }
    
    M3.Axis.AxisManager.prototype.resize = function(config) {
        this.setConfig(config);
        //if(this.axis.left !== null) { this.drawLeftAxis(this.axis.left, true); }
        if(this.axis.left) { this.drawLeftAxis(this.axis.left, true); }
        //if(this.axis.bottom !== null) { this.drawBottomAxis(this.axis.bottom, true); }
        if(this.axis.bottom) { this.drawBottomAxis(this.axis.bottom, true); }
        //if(this.axis.right !== null) { this.drawRightxis(this.axis.right, true); }
        if(this.axis.right) { this.drawRightxis(this.axis.right, true); }
        //if(this.axis.top !== null) { this.drawTopAxis(this.axis.top, true); }
        if(this.axis.top) { this.drawTopAxis(this.axis.top, true); }
    };
    
    
    M3.Axis.AxisManager.prototype.getAxisObj = function(value) {
        var clazz = this.getClassName(value);
        return new clazz();
    }
    
    M3.Axis.AxisManager.prototype.getClassName = function(value) {
        var claz = M3, i = 0;
        var vec = value.split(".");
        while(i < vec.length){
            claz = claz[vec[i++]];
        }
        return claz;
    }

    /**
    Draw rigth axis
    
    @method drawRightxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawRightxis = function(axis, resize) {
        var canvas = d3.select(this.config.container + " .canvas");
        
        //if(axis.axis === null) {
        if(!axis.axis) {
            var claz = this.getClassName(axis.conf.clazz);
            axis.axis = new claz();
        }
        
        var x = this.config.canvasWidth - this.getOffset("right");
        var y = this.getOffset("top");
        var w = axis.axis._config.width;
        var h = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        
        if(resize === true) {
            axis.axis.resize(w, h, x, y);
        } else {
            axis.axis.canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
        }
    };

    /**
    Draw left axis
    
    @method drawLeftAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawLeftAxis = function(axis, resize) {
        var canvas = d3.select(this.config.container + " .canvas");
        
        //if(axis.axis === null) {
        if(!axis.axis) {
            var claz = this.getClassName(axis.conf.clazz);
            axis.axis = new claz();
        }
    
        var x = axis.axis._config.width + ((axis.axis._config.labelPosition == "outer"  && axis.axis._config.label !== "")?axis.axis._config.labelWidth:0);
        var y = this.getOffset("top");
        var w = axis.axis._config.width;
        var h = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        
        if(resize === true) {
            axis.axis.resize(w, h, x, y);
        } else {
            axis.axis.canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
        }
    };
    
    /**
    Draw bottom axis
    
    @method drawBottomAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawBottomAxis = function(axis, resize) {
        var canvas = d3.select(this.config.container + " .canvas");
        
        //if(axis.axis === null) {
        if(!axis.axis) {
            var claz = this.getClassName(axis.conf.clazz);
            axis.axis = new claz();
        }
        
        var x = this.getOffset("left");
        var y = this.config.canvasHeight - this.getOffset("bottom");
        var w = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var h = axis.axis._config.width;
        
        if(resize === true) {
            axis.axis.resize(w, h, x, y);
        } else {
            axis.axis.canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
        }
    };
    
    /**
    Draw top axis
    
    @method drawTopAxis
    @param axis {object}
    @protected
    */
    M3.Axis.AxisManager.prototype.drawTopAxis = function(axis, resize) {
        var canvas = d3.select(this.config.container + " .canvas");
        
        //if(axis.axis === null) {
        if(!axis.axis) {
            var claz = this.getClassName(axis.conf.clazz);
            axis.axis = new claz();
        }
        
        var x = this.getOffset("left");
        var y = axis.axis._config.width + ((axis.axis._config.labelPosition == "outer" && axis.axis._config.label !== "")?axis.axis._config.labelWidth:0);
        var w = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var h = axis.axis._config.width;
        
        if(resize === true) {
            axis.axis.resize(w, h, x, y);
        } else {
            axis.axis.canvas(canvas).config(axis.conf).data(this.data).draw(w, h, x, y);
        }
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
        if(this.axis[pos] !== null && this.axis[pos].axis._config.show === true) {
            offset += this.axis[pos].axis._config.width;
            offset += (this.axis[pos].axis._config.labelPosition == "outer" && this.axis[pos].axis._config.label !== "")?this.axis[pos].axis._config.labelWidth:0;
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
        var config = {
            pos:"left",
            clazz:"Axis.LinealAxis"
        };
        
        config = M3.extend({}, conf);
        
        if(["left", "right", "bottom", "top"].indexOf(config.pos) < 0) {
            //conf.pos = "left";
            throw new Error("AxisManger: Incorrect Axis position. Please, use one of the following values: left, right, top, bottom");
        }
        if(!config.clazz) {
            config.clazz = (conf.pos == "left" || config.pos == "right")?"Axis.LinealAxis":"Axis.CategoryAxis";
        }
        /*
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
        */
        return config;
    };
    
})();