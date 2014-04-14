(function() {
    
    "use strict";
    /**
    Module for axis
    
    @module M3
    @submodule M3.Axis
    */
    M3.Axis = {};
    
    /**
    Class to draw an Axis.
    
    @class M3.Axis.AxisItem
    @constructor
    @module M3
    @submodule M3.Axis
    
    @example 
        var width = 200, height:100. xOffset = 10, yOffset = 10;
        var axis = new M3.AxisItem();
        axis.config(config).canvas(d3.select(".m3 .canvas")).data(datos).draw(width, height, xOffset, yOffset);
    */
    M3.Axis.AxisItem = function () {
        this._config = null;
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    };
    
    /**
    Set the Canvas chart. Is the place where the axis will be drawn.
    
    @method canvas
    @param value {Object} Reference to a svg element
    @chainable
    @return AxisItem (this).
    */
    M3.Axis.AxisItem.prototype.canvas = function(value) {
        this._canvas = value;
        return this;
    };
    
    /**
    Extend the settings passed as a parameter to add the missing properties.
    
    Default properties:
    {
    
    }
    
    @private
    @method defaultConfig.
    @param conf {Object}
    @return A mixin object between conf and default object properties.
    
    @todo Refactoring: pasar la configuracion default que esta en AxisMAnager acá
    */
    M3.Axis.AxisItem.prototype.defaultConfig = function (conf) {
        return M3.extend({}, {
                            },
                            conf);
    };
    
    /**
    Set the configuration to the axis
    
    __Properties accepted:__
    <table>
        <thead>
            <tr><th>Config property</th><th>Optional</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>pos</td><td>No</td><td></td><td>Posicion del eje [left, right, bottom, top].</td></tr>
            <tr><td>label</td><td>Yes</td>Empty value<td></td><td>Nombre del eje.</td></tr>
            <tr><td>labelPosition</td><td>Yes</td><td>none</td><td>[none, inner, outer] @default outer.</td></tr>
            <tr><td>serie</td><td>Yes</td><td>value</td><td>Nombre de la propiedad que se mostrará sobre el eje. Puede ser un string o un array si varias series se plotean sobre el eje.</td></tr>
            <tr><td>width</td><td>Yes</td><td>35 for y axis, 20 for x axis</td><td>Ancho del espacio del eje.</td></tr>
            <tr><td>show</td><td>Yes</td><td>True</td><td>Indica si se visualiza o no el eje.</td></tr>
            <tr><td>labelWidth</td><td>Yes</td><td>18</td><td>Ancho del espacio para el label del eje.</td></tr>
            <tr><td>clazz</td><td>Yes</td><td>Axis.LinealAxis</td><td>Nombre de la clase del axis a crear.</td></tr>
            <tr><td>axis</td><td>Yes</td><td>y when pos is left/right, x when pos is top/bottom</td><td>[x,y].</td></tr>
            <tr><td>ticketSize</td><td>Yes</td><td>6 (d3 defaul)</td><td>The size of de line of each tick on the axis (default: 6).</td></tr>
            <tr><td>tickPadding</td><td>Yes</td><td>3 (d3 default)</td><td>The space between the line tick with the label of tick.</td></tr>
            <tr><td>tickFormat</td><td>Yes</td><td>"s" (d3 default format). For x axis don't trasnform the label</td><td>Format function for each tick label.
            If chart config has _labelFormat_ or/and _valueFormat_ it's are the default values.<br>_Example:_
                function(d, indx) {
                    return d3.format("s");
                }
            </td></tr>
        </tbdoy>
    </table>
    
    @method config
    @param value {Object}
    @chainable
    @return Mixed object between value and default properties.
    */
    M3.Axis.AxisItem.prototype.config = function(value) {
        this._config = this.defaultConfig(value);
        return this;
    };
    
    /**
    Set data values.
    
    @method data
    @param value {Array}
    @chainable
    @return AxisItem (this)
    */
    M3.Axis.AxisItem.prototype.data = function(value) {
        this._data = value;
        return this;
    };
    
    /**
    Get the scale for the axis. 
    (Scale factory)
    
    @method getAxisScale
    @param values
    @protected
    */
    M3.Axis.AxisItem.prototype.getAxisScale = function(values) {
        var scope = this;
        this.scale = d3.scale.linear().range(values);
        var max = d3.max(scope._data, function(d){
                                                return +d[scope._config.serie];
                                            });
        this.scale.domain([0, max]);
        return this.scale;
    };
    
    /**
    Set the scale for the axis
    
    @method getScale
    @protected
    */
    M3.Axis.AxisItem.prototype.getScale = function() {
        var values = null;
        if(this._config.axis == "y") {
            values = [this._h, 0];
        } else {
            values = [0, this._w];
        }
        
        this.scale = this.getAxisScale(values);
        
        return this.scale;
    };
    
    /**
    Create the d3 axis.
    
    @method getAxis
    @return D3 axis reference.
    @protected
    */
    M3.Axis.AxisItem.prototype.getAxis = function() {
        var scope = this;

        this.axis = d3.svg.axis()
            .scale(scope.getScale())
            .orient(this._config.pos);
        
        if(this._config.tickFormat !== null) { this.axis.tickFormat(this._config.tickFormat); }
        if(!isNaN(this._config.tickSize)) { this.axis.innerTickSize(this._config.tickSize); }
        if(!isNaN(this._config.tickPadding)) { this.axis.tickPadding(this._config.tickPadding); }
        
        return this.axis;
    };
    
    /**
    Add a rect as backgroud for the axis.
    
    @method addRect
    @param elem {Object} reference to the axis avg.
    @param w {Number} With of the rectange background
    @param h {Number} Heigt of the rectange background
    
    @protected
    */
    M3.Axis.AxisItem.prototype.addRect = function(elem, w, h) {
        return elem.insert("rect", "g")
            .attr("class", "background")
            .attr("width", w)
            .attr("height", h)
            .attr("transform", "translate(" + ((this._config.axis == "y" && this._config.pos == "left")?(w * -1):0) + ", " + 0 + ")");
    };
    
    /**
    Add Axis label (title).
    
    @method addLabel
    @param elem {Object} reference to axis svg.
    @protected
    */
    M3.Axis.AxisItem.prototype.addLabel = function(elem) {
        if(this._config.labelPosition != "none") {
            var txt = this._config.label;
            var text = elem.append("text");
            var y, x, transform = "", dy;
            text.text(txt);
            if(this._config.labelPosition == "outer") {
                if(this._config.axis == "y") {
                    y = (this._config.pos == "left")? (this._config.width * -1) : this._config.width;
                    x = elem.select("rect").attr("height") / -2;
                    transform =  "rotate(-90)";
                    dy = (this._config.pos === "left") ?  "-0.5em" : "1em";
                } else {
                    x = elem.select("rect").attr("width") / 2;
                    y = (this._config.pos=="bottom")?this._config.width:(this._config.width * -1);
                    dy = (this._config.pos=="bottom")?"1em":"-0.5em";
                }
                text.attr("y", y)
                    .attr("x", x)
                    .attr("transform", transform)
                    .attr("dy", dy)
                    .style("text-anchor", "middle")
                    .attr("class", "label");
            } else {
                if(this._config.axis == "y") {
                    dy = (this._config.pos=="left")?"0.5em":"-1em";
                    y = 6;
                    transform = "rotate(-90)";
                }
                text.attr("transform", transform)
                    .attr("y", y)
                    .attr("dy", dy)
                    .attr("x", x)
                    .style("text-anchor", "end");
            }
        }
    };

    /**
    Draw the axis into the canvas.
    
    @method draw
    @param w {Number} Wicth of the axis
    @param h {Number} Height of the axis
    @param x {Number} Offsset from the left border canvas
    @param y {Number} Offsset from the left border canvas
    @chainable
    */
    M3.Axis.AxisItem.prototype.draw = function(w, h, x, y) {
        this._w = w;
        this._h = h;
        
        this.getAxis();
        
        if(this._config.show) {
            this.axisSVG = this._canvas.append("g")
                .attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos)
                .attr("transform", "translate(" + x + ", " + y + ")")
                .call(this.axis);
        
            this.addRect(this.axisSVG, w, h);
            this.addLabel(this.axisSVG);
        }

        return this;
    };
})();