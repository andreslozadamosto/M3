(function() {
    "use strict";
    /**
    Class to manage Axis

    @class M3.Axis.LinealAxis
    @constructor
    @extends M3.Axis.AxisItem
    @module M3
    @submodule M3.Axis
    */
    
    M3.Axis.LinealAxis = M3.Axis.LinealAxis || M3.createClass(M3.Axis.AxisItem, function () {
        this._config = this.defaultConfig();
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    
    M3.Axis.LinealAxis.prototype.getAxisScale = function(values) {
        var scope = this;
        if(this.scale == null) {
            this.scale = d3.scale.linear().range(values);
            
            
            var maxValue = (!isNaN(this._config.maxValue))
                                                        ?this._config.maxValue
                                                        :d3.max(scope._data, function(d){
                                                                    if(scope._config.serie instanceof Array) {
                                                                        var max = 0;
                                                                        for(var i = 0; i < scope._config.serie.length; i++) {
                                                                            if(max < (+d[scope._config.serie[i]])) {
                                                                                max = +d[scope._config.serie[i]];
                                                                            }
                                                                        }
                                                                        return max;
                                                                    } else {
                                                                        return +d[scope._config.serie];
                                                                    }
                                                                }
                                                            );
            var minValue = (!isNaN(this._config.minValue))
                                                        ?this._config.minValue
                                                        :d3.min(scope._data, function(d){
                                                                                if(scope._config.serie instanceof Array) {
                                                                                    var min = maxValue;
                                                                                    for(var i = 0; i < scope._config.serie.length; i++) {
                                                                                        if(min > (+d[scope._config.serie[i]])) {
                                                                                            min = +d[scope._config.serie[i]];
                                                                                        }
                                                                                    }
                                                                                    return min;
                                                                                } else {
                                                                                    return +d[scope._config.serie];
                                                                                }
                                                                            }
                                                                        );
            if(minValue > 0 && isNaN(this._config.minValue) && this._config.fitToZero === true) {
                minValue = 0;
            }
            
            this.scale.domain([minValue, maxValue]);
            
        } else {
            this.scale.range(values);
        }
        if(this._config.useNiceValues === true) { this.scale.nice(); }
        return this.scale;
    };
    
    M3.Axis.LinealAxis.prototype.getAxis = function() {
        M3.Axis.AxisItem.prototype.getAxis.call(this);
        

        if(!isNaN(this._config.ticks)) { this.axis.ticks(this._config.ticks); }
        //this.axis.tickValues([25, 60, 70]);
        if(!isNaN(this._config.fixedTicks)) {
            var vals = this.scale.domain();
            var range = vals[1] - vals[0];
            var offset = range / (this._config.fixedTicks - 1);
            var values = [vals[0]];
            for(var i=1; i < this._config.fixedTicks - 1; i++) {
                values[i] = Math.ceil(values[i-1] + offset);
            }
            values[i] = vals[1];
            this.axis.tickValues(values);
        }
        return this.axis;
    };
    
    M3.Axis.LinealAxis.prototype.defaultConfig = function () {
        return M3.extend({}, M3.Axis.AxisItem.prototype.defaultConfig.call(this), {
                                /*
                                autoextiende el rango de valores para que coincida con el inicio/fin del dominio
                                */
                                useNiceValues:true,
                                /*
                                cantidad de ticks en el eje
                                */
                                ticks: NaN,
                                //oculta el primer tick (el cero)
                                showFirst:true,
                                //define el minimo valor del eje
                                minValue:NaN,
                                //define el maximo valor del eje
                                maxValue:NaN,
                                //Muesta exactamente la cantidad de ticks especificados
                                fixedTicks:NaN,
                                pos:"left",
                                axis:"y",
                                serie:"value",
                                //setea el inicio del dominio en cero
                                fitToZero:true
                            });
    };
    
    M3.Axis.LinealAxis.prototype.draw = function(w, h, x, y) {
        var it = M3.Axis.AxisItem.prototype.draw.call(this, w, h, x, y)
        if(!this._config.showFirst) {
            this._canvas.select(".tick").remove();
        }
        return it;
    };
    
    M3.Axis.LinealAxis.prototype.afterAddAxis = function () {
        this.axisSVG.attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos + " lineal")
    }
})();