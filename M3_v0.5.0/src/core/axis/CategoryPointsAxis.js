(function() {
    "use strict";
    /**
    Class to manage Axis

    @class M3.Axis.CategoryPointsAxis
    @constructor
    @extends M3.Axis.CategoryAxis
    @module M3
    @submodule M3.Axis
    */
    
    M3.Axis.CategoryPointsAxis = M3.Axis.CategoryPointsAxis || M3.createClass(M3.Axis.CategoryAxis, function () {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.CategoryPointsAxis.prototype.getAxisScale = function(values) {
        var scope = this;
        this.scale = d3.scale.ordinal().rangePoints(values, this._config.padding);
        this.scale.domain(this._data.map(function(d) {
                                        return d[scope._config.serie];
                                    }));
        return this.scale;
    };
    
    

})();