(function() {
    "use strict";
    /**
    Class to manage Axis

    @class M3.Axis.Stacked100Axis
    @constructor
    @extends M3.Axis.LinealAxis
    @module M3
    @submodule M3.Axis
    */
    
    M3.Axis.Stacked100Axis = M3.Axis.Stacked100Axis || M3.createClass(M3.Axis.LinealAxis, function () {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.Stacked100Axis.prototype.getAxisScale = function(values) {
        //if(this.scale == null) {
        if(!this.scale) {
            this.scale = d3.scale.linear().range(values);
            this.scale.domain([0, 100]);
        } else {
            this.scale.range(values);
        }
        return this.scale;
    };
    
    M3.Axis.Stacked100Axis.prototype.afterAddAxis = function () {
        this.axisSVG.attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos + " stacked100")
    }

   
})();