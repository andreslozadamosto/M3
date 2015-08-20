(function() {
    "use strict";
    /**
    Class to manage Axis

    @class M3.Axis.StackedAxis
    @constructor
    @extends M3.Axis.LinealAxis
    @module M3
    @submodule M3.Axis
    */
    
    M3.Axis.StackedAxis = M3.Axis.StackedAxis || M3.createClass(M3.Axis.LinealAxis, function () {
        this._config = this.defaultConfig();
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.StackedAxis.prototype.getAxisScale = function(values) {
        var scope = this;
        //if(this.scale == null) {
        if(!this.scale) {
            this.scale = d3.scale.linear().range(values);
            this.scale.domain([0, d3.max(scope._data, function(d){
                                                    var sum = 0;
                                                    for(var i = 0; i < scope._config.serie.length; i++) {
                                                        sum += +d[scope._config.serie[i]];
                                                    }
                                                    return sum;
                                                })]);
        } else {
            this.scale.range(values);
        }
        if(this._config.useNiceValues === true) { this.scale.nice(); }
        return this.scale;
    };
    
    M3.Axis.StackedAxis.prototype.afterAddAxis = function () {
        this.axisSVG.attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos + " stacked")
    }

   
})();