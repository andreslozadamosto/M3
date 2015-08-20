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
        this._config = this.defaultConfig();
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
        //if(this.scale == null) {
        if(!this.scale) {
            this.scale = d3.scale.ordinal().rangeRoundBands(values, this._config.padding, this._config.outterPadding);
            this.scale.domain(this._data.map(function(d) {
                                            return d[scope._config.serie];
                                        }));
        } else {
            this.scale.rangeRoundBands(values, this._config.padding, this._config.outterPadding);
        }
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
    
    M3.Axis.CategoryAxis.prototype.afterAddAxis = function () {
        if(this._config.axis == "x") {
            this.axisSVG.selectAll(".tick text")
                .call(wrap, this.scale.rangeBand(), "x");
        } else {
            this.axisSVG.selectAll(".tick text")
                .call(wrap, this._config.width, "y", (!isNaN(this._config.innerTickSize))?this._config.innerTickSize+2:8);
        }
        this.axisSVG.attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos + " category")
    }
    
    function wrap(text, width, axis, tickSize) {
      text.each(function() {
          if(this.getComputedTextLength() > width) {
              var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy =(axis=="x")?parseFloat(text.attr("dy")):0,
                tspan = text.text(null).append("tspan").attr("x", (axis=="x")?0:tickSize*-1).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                  line.push(word);
                  tspan.text(line.join(" "));
                  if (tspan.node().getComputedTextLength() > width) {
                      line.pop();
                      tspan.text(line.join(" "));
                      line = [word];
                      tspan = text.append("tspan").attr("x", (axis=="x")?0:tickSize*-1).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                  }
              }
          }
      });
    }
    
    M3.Axis.CategoryAxis.prototype.defaultConfig = function () {
        
        return M3.extend({}, M3.Axis.AxisItem.prototype.defaultConfig.call(this),{
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
                                rotate: "none",
                                pos:"bottom",
                                axis:"x",
                                serie:"label",
                                width: 20, 
                                tickFormat:function (d, i) { return d; }
                            });
        
    };

})();