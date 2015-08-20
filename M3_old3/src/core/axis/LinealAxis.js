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
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.LinealAxis.prototype.getAxisScale = function(values) {
        var scope = this;

        this.scale = d3.scale.linear().range(values);
        this.scale.domain([0, d3.max(scope._data, function(d){
                                                if(scope._config.serie instanceof Array) {
                                                    var max = 0;
                                                    for(var i = 0; i < scope._config.serie.length; i++) {
                                                        if(max < (+d[scope._config.serie[i]])) {
                                                            max = d[scope._config.serie[i]];
                                                        }
                                                    }
                                                    return max;
                                                } else {
                                                    return +d[scope._config.serie];
                                                }
                                            })]);
        if(this._config.useNiceValues === true) { this.scale.nice(); }
        
        return this.scale;
    };
    
    M3.Axis.LinealAxis.prototype.getAxis = function() {
        M3.Axis.AxisItem.prototype.getAxis.call(this);
        
        if(!isNaN(this._config.ticks)) { this.axis.ticks(this._config.ticks); }
        
        return this.axis;
    };
    
    M3.Axis.LinealAxis.prototype.defaultConfig = function (conf) {
        return M3.extend({}, {
                                /*
                                autoextiende el rango de valores para que coincida con el inicio/fin del dominio
                                */
                                useNiceValues:true,
                                /*
                                cantidad de ticks en el eje
                                */
                                ticks: 10
                            },
                            conf);
    };
})();