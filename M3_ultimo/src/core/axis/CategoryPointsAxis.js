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
        this._config = this.defaultConfig();
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    
    M3.Axis.CategoryPointsAxis.prototype.getAxisScale = function(values) {
        var scope = this;
        //if(this.scale == null) {
        if(!this.scale) {
            this.scale = d3.scale.ordinal().rangePoints(values, this._config.padding);
            this.scale.domain(this._data.map(function(d) {
                                            return d[scope._config.serie];
                                        }));
        } else {
            this.scale.rangePoints(values, this._config.padding);
        }
        return this.scale;
    };
    
    M3.Axis.CategoryPointsAxis.prototype.afterAddAxis = function () {
        var ticks = this.axisSVG.selectAll(".tick text");
        if(ticks && ticks.length && ticks[0] && ticks.length){
            if(this._config.axis == "x") {
                ticks.call(wrap, +this.scale.range()[1], ticks[0].length-1);
            } else {
                ticks.call(wrap, this._config.width, -1);
            }
        }
        this.axisSVG.attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos + " categoryPoints")
    }
    
    function wrap(text, width, cant) {
        var scope = 2;
      text.each(function(a,b) {
          var w = (cant == -1)?width:(b == 0 || cant == b)?width*0.5:width;
          var dx = (cant < 0)?"-0.9em":(cant == b)?"0.2em":"0em";
          if(this.getComputedTextLength() > w) {
              var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                anchor = (cant < 0)?"end":(b == 0)?"start":(cant == b)?"end":"middle",
                tspan = text.text(null).append("tspan").attr("x", 0).attr("dx", dx).attr("y", y).attr("dy", dy + "em").style("text-anchor", anchor);
              while (word = words.pop()) {
                  line.push(word);
                  tspan.text(line.join(" "));
                  if (tspan.node().getComputedTextLength() > w) {
                      line.pop();
                      tspan.text(line.join(" "));
                      line = [word];
                      tspan = text.append("tspan").attr("x", 0).attr("dx", dx).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").style("text-anchor", anchor).text(word);
                  }
              }
          }
      });
    }

})();