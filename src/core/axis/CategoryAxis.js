(function() {
    "use strict";
    /**
    Class to manage Axis
    
    This class add some config properties
    
    <table>
        <thead>
            <tr><th>Config property</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>padding</td><td>0.1</td><td>Padding between steps on category axis</td></tr>
            <tr><td>outterPadding</td><td>0</td><td>Padding between columns with the border of chart</td></tr>
            <tr><td>rotate</td><td>"none"</td><td>Rotacion de los labels de los ticks [none, diagonal, vertical, verticalInv]</td></tr>
        </tbody>
    </table>
    
    @class M3.Axis.CategoryAxis
    @constructor
    @extends M3.Axis.AxisItem
    @module M3
    @submodule M3.Axis

    */
    M3.Axis.CategoryAxis = M3.Axis.CategoryAxis || M3.createClass(M3.Axis.AxisItem, function () {
        this._config = null;
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.CategoryAxis.prototype.getAxisScale = function(values) {
        var scope = this;
        this.scale = d3.scale.ordinal().rangeRoundBands(values, this._config.padding, this._config.outterPadding);
        this.scale.domain(this._data.map(function(d) {
                                        return d[scope._config.serie];
                                    }));
        return this.scale;
    };
    
    M3.Axis.CategoryAxis.prototype.draw = function(w, h, x, y) {
        M3.Axis.AxisItem.prototype.draw.call(this, w, h, x, y);
        
        if(this._config.show === true) {
            if(this._config.rotate == "diagonal") {
                this.axisSVG.selectAll("text")
                    .attr("transform", "rotate(-45)")
                    .attr("x", -9)
                    .attr("y", 10)
                    .style("text-anchor", "end")
                    .attr("dy", "0");
            } else if(this._config.rotate == "verticalInv") {
                this.axisSVG.selectAll("text")
                    .attr("transform", "rotate(90)")
                    .attr("x", 9)
                    .attr("y", 3)
                    .style("text-anchor", "start")
                    .attr("dy", "0");
            } else if(this._config.rotate == "vertical") {
                this.axisSVG.selectAll("text")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -9)
                    .attr("y", 2)
                    .style("text-anchor", "end")
                    .attr("dy", "0");
            }
        }
        return this;
    };
    
    
    
    M3.Axis.CategoryAxis.prototype.defaultConfig = function (conf) {
        return M3.extend({}, {
                                /*
                                padding between steps on category axis
                                */
                                padding: 0.1,
                                /**
                                padding between columns with the border of chart
                                */
                                outterPadding: 0,
                                /*
                                Rotacion de los labels de los ticks
                                [none, diagonal, vertical, verticalInv]
                                */
                                rotate: "none"
                            },
                            conf);
    };

})();