(function() {
    "use strict";
    if (typeof Object.create !== "function") {
        (function() {
            var a = function() {};
            Object.create = function(b) {
                if (arguments.length > 1) {
                    throw Error("Second argument not supported");
                }
                if (b === null) {
                    throw Error("Cannot set a null [[Prototype]]");
                }
                if (typeof b != "object") {
                    throw TypeError("Argument must be an object");
                }
                a.prototype = b;
                return new a();
            };
        })();
    }
})();

var M3CreateClass = M3CreateClass || function a() {
    "use strict";
    return function(a, b) {
        var c = function() {
            a.call(this);
            if (b !== null && b !== undefined) {
                b.call(this);
            }
        };
        c.prototype = Object.create(a.prototype);
        c.prototype.constructor = c;
        c.prototype.__super__ = a;
        return c;
    };
}();

var M3Exted = M3Exted || function() {
    "use strict";
    return function() {
        var a = function(a) {
            var b;
            if (!a || jQuery.type(a) !== "object" || a.nodeType || jQuery.isWindow(a)) {
                return false;
            }
            try {
                if (a.constructor && !hasOwn.call(a, "constructor") && !hasOwn.call(a.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (c) {
                return false;
            }
            if (support.ownLast) {
                for (b in a) {
                    return hasOwn.call(a, b);
                }
            }
            return b === undefined || hasOwn.call(a, b);
        };
        var b = {};
        if (arguments !== null && arguments.length > 0) {
            for (var c = 0; c < arguments.length; c++) {
                var d;
                if (arguments[c] !== undefined && arguments[c] !== null) {
                    for (d in arguments[c]) {
                        if (a(arguments[c][d]) === true && b[d] !== undefined) {
                            b[d] = M3Exted(b[d], arguments[c][d]);
                        } else {
                            b[d] = arguments[c][d];
                        }
                    }
                }
            }
        }
        return b;
    };
}();

var M3Mixin = M3Mixin || function() {
    "use strict";
    return function() {
        var a = {};
        if (arguments !== null && arguments.length > 0) {
            for (var b = 0; b < arguments.length; b++) {
                var c;
                if (arguments[b] !== undefined && arguments[b] !== null) {
                    for (c in arguments[b]) {
                        if (a[c] === undefined) {
                            a[c] = arguments[b][c];
                        } else if (typeof arguments[b][c] == "object") {
                            a[c] = M3Mixin(a[c], arguments[b][c]);
                        }
                    }
                }
            }
        }
        return a;
    };
}();

var M3 = M3 || new (M3CreateClass(Object, function() {
    "use strict";
    this.version = "0.0.0";
    this.createClass = M3CreateClass;
    this.extend = M3Exted;
    this.mixin = M3Mixin;
    this.Axis = {};
    this.Series = {};
}))();

(function() {
    "use strict";
    M3.utils = M3.Utils || {
        getMaxValue: function(a) {
            return a.data !== null ? d3.max(a.data, function(b) {
                return b[a.config.itemValue];
            }) : NaN;
        },
        getMinValue: function(a) {
            return a.data !== null ? d3.min(a.data, function(b) {
                return b[a.config.itemValue];
            }) : NaN;
        }
    };
})();

(function() {
    "use strict";
    M3.DataViz = M3.DataViz || M3CreateClass(Object);
    M3.DataViz.prototype.config = null;
    M3.DataViz.prototype.data = null;
    M3.DataViz.prototype.behaviours = null;
    M3.DataViz.prototype.setConfig = function(a) {
        var b = {
            margin: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
                all: NaN
            },
            width: 200,
            height: 100,
            container: "#chartContainer",
            styles: {
                container: "m3",
                canvas: "canvas"
            }
        };
        var c = M3.extend(b, a);
        if (a !== undefined && a !== null) {
            if (a.margin !== undefined && a.margin !== null) {
                var d = +a.margin.all;
                if (!isNaN(d) && typeof d == "number") {
                    c.margin.top = c.margin.bottom = c.margin.left = c.margin.right = a.margin.all;
                }
            }
        }
        c.canvasWidth = c.width - (c.margin.left + c.margin.right);
        c.canvasHeight = c.height - (c.margin.top + c.margin.bottom);
        this.config = c;
        return this;
    };
    M3.DataViz.prototype.setData = function(a) {
        this.data = a;
        return this;
    };
    M3.DataViz.prototype.draw = function(a, b) {
        if (b !== undefined) {
            this.setConfig(b);
        }
        if (a !== undefined) {
            this.setData(a);
        }
        this.beforeDraw();
        this.drawContainer().drawCanvas();
        this.drawInner();
        this.afterDraw();
        if (this.behaviours !== null) {
            for (var c = 0; c < this.behaviours.length; c++) {
                if (this.behaviours[c] !== undefined && this.behaviours[c] !== null) {
                    this.behaviours[c].run(this);
                }
            }
        }
        return this;
    };
    M3.DataViz.prototype.drawInner = function() {
        return this;
    };
    M3.DataViz.prototype.drawContainer = function() {
        var a = d3.select(this.config.container).append("svg").attr("class", this.config.styles.container).attr("width", this.config.width).attr("height", this.config.height);
        a.append("rect").attr("width", this.config.width).attr("height", this.config.height).attr("class", "background");
        return this;
    };
    M3.DataViz.prototype.drawCanvas = function() {
        var a = d3.select(this.config.container + " ." + this.config.styles.container).append("g").attr("class", this.config.styles.canvas).attr("transform", "translate(" + this.config.margin.top + ", " + this.config.margin.left + ")").attr("width", this.config.canvasWidth).attr("height", this.config.canvasHeight);
        a.append("rect").attr("width", this.config.canvasWidth).attr("height", this.config.canvasHeight).attr("class", "background");
        return this;
    };
    M3.DataViz.prototype.beforeDraw = function() {};
    M3.DataViz.prototype.afterDraw = function() {};
})();

(function() {
    "use strict";
    M3.AbstractChart = M3.AbstractChart || M3CreateClass(M3.DataViz);
    M3.AbstractChart.prototype.setConfig = function(a) {
        var b = function(a) {
            return a;
        };
        var c = function(a) {
            return d3.format("s")(a);
        };
        var d = {
            itemValue: "value",
            itemLabel: "label",
            labelFormat: b,
            valueFormat: c
        };
        var e = M3.mixin(a, d);
        M3.DataViz.prototype.setConfig.call(this, e);
        return this;
    };
})();

(function() {
    "use strict";
    M3.Axis = {};
    M3.Axis.AxisItem = function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    };
    M3.Axis.AxisItem.prototype.canvas = function(a) {
        this._canvas = a;
        return this;
    };
    M3.Axis.AxisItem.prototype.defaultConfig = function(a) {
        return M3.extend({}, {}, a);
    };
    M3.Axis.AxisItem.prototype.config = function(a) {
        this._config = this.defaultConfig(a);
        return this;
    };
    M3.Axis.AxisItem.prototype.data = function(a) {
        this._data = a;
        return this;
    };
    M3.Axis.AxisItem.prototype.getAxisScale = function(a) {
        var b = this;
        this.scale = d3.scale.linear().range(a);
        var c = d3.max(b._data, function(a) {
            return +a[b._config.serie];
        });
        this.scale.domain([ 0, c ]);
        return this.scale;
    };
    M3.Axis.AxisItem.prototype.getScale = function() {
        var a = null;
        if (this._config.axis == "y") {
            a = [ this._h, 0 ];
        } else {
            a = [ 0, this._w ];
        }
        this.scale = this.getAxisScale(a);
        return this.scale;
    };
    M3.Axis.AxisItem.prototype.getAxis = function() {
        var a = this;
        this.axis = d3.svg.axis().scale(a.getScale()).orient(this._config.pos);
        if (this._config.tickFormat !== null) {
            this.axis.tickFormat(this._config.tickFormat);
        }
        if (!isNaN(this._config.tickSize)) {
            this.axis.innerTickSize(this._config.tickSize);
        }
        if (!isNaN(this._config.tickPadding)) {
            this.axis.tickPadding(this._config.tickPadding);
        }
        return this.axis;
    };
    M3.Axis.AxisItem.prototype.addRect = function(a, b, c) {
        return a.insert("rect", "g").attr("class", "background").attr("width", b).attr("height", c).attr("transform", "translate(" + (this._config.axis == "y" && this._config.pos == "left" ? b * -1 : 0) + ", " + 0 + ")");
    };
    M3.Axis.AxisItem.prototype.addLabel = function(a) {
        if (this._config.labelPosition != "none") {
            var b = this._config.label;
            var c = a.append("text");
            var d, e, f = "", g;
            c.text(b);
            if (this._config.labelPosition == "outer") {
                if (this._config.axis == "y") {
                    d = this._config.pos == "left" ? this._config.width * -1 : this._config.width;
                    e = a.select("rect").attr("height") / -2;
                    f = "rotate(-90)";
                    g = this._config.pos === "left" ? "-0.5em" : "1em";
                } else {
                    e = a.select("rect").attr("width") / 2;
                    d = this._config.pos == "bottom" ? this._config.width : this._config.width * -1;
                    g = this._config.pos == "bottom" ? "1em" : "-0.5em";
                }
                c.attr("y", d).attr("x", e).attr("transform", f).attr("dy", g).style("text-anchor", "middle").attr("class", "label");
            } else {
                if (this._config.axis == "y") {
                    g = this._config.pos == "left" ? "0.5em" : "-1em";
                    d = 6;
                    f = "rotate(-90)";
                }
                c.attr("transform", f).attr("y", d).attr("dy", g).attr("x", e).style("text-anchor", "end");
            }
        }
    };
    M3.Axis.AxisItem.prototype.draw = function(a, b, c, d) {
        this._w = a;
        this._h = b;
        this.getAxis();
        if (this._config.show) {
            this.axisSVG = this._canvas.append("g").attr("class", this._config.axis + " axis " + this._config.axis + this._config.pos).attr("transform", "translate(" + c + ", " + d + ")").call(this.axis);
            this.addRect(this.axisSVG, a, b);
            this.addLabel(this.axisSVG);
        }
        return this;
    };
})();

(function() {
    "use strict";
    M3.Axis.CategoryAxis = M3.Axis.CategoryAxis || M3.createClass(M3.Axis.AxisItem, function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this.axis = null;
        this.axisSVG = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    M3.Axis.CategoryAxis.prototype.getAxisScale = function(a) {
        var b = this;
        this.scale = d3.scale.ordinal().rangeRoundBands(a, this._config.padding, this._config.outterPadding);
        this.scale.domain(this._data.map(function(a) {
            return a[b._config.serie];
        }));
        return this.scale;
    };
    M3.Axis.CategoryAxis.prototype.draw = function(a, b, c, d) {
        M3.Axis.AxisItem.prototype.draw.call(this, a, b, c, d);
        if (this._config.show === true) {
            if (this._config.rotate == "diagonal") {
                this.axisSVG.selectAll("text").attr("transform", "rotate(-45)").attr("x", -9).attr("y", 10).style("text-anchor", "end").attr("dy", "0");
            } else if (this._config.rotate == "verticalInv") {
                this.axisSVG.selectAll("text").attr("transform", "rotate(90)").attr("x", 9).attr("y", 3).style("text-anchor", "start").attr("dy", "0");
            } else if (this._config.rotate == "vertical") {
                this.axisSVG.selectAll("text").attr("transform", "rotate(-90)").attr("x", -9).attr("y", 2).style("text-anchor", "end").attr("dy", "0");
            }
        }
        return this;
    };
    M3.Axis.CategoryAxis.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            padding: .1,
            outterPadding: 0,
            rotate: "none"
        }, a);
    };
})();

(function() {
    "use strict";
    M3.Axis.CategoryPointsAxis = M3.Axis.CategoryPointsAxis || M3.createClass(M3.Axis.CategoryAxis, function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    M3.Axis.CategoryPointsAxis.prototype.getAxisScale = function(a) {
        var b = this;
        this.scale = d3.scale.ordinal().rangePoints(a, this._config.padding);
        this.scale.domain(this._data.map(function(a) {
            return a[b._config.serie];
        }));
        return this.scale;
    };
})();

(function() {
    "use strict";
    M3.Axis.LinealAxis = M3.Axis.LinealAxis || M3.createClass(M3.Axis.AxisItem, function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    M3.Axis.LinealAxis.prototype.getAxisScale = function(a) {
        var b = this;
        this.scale = d3.scale.linear().range(a);
        this.scale.domain([ 0, d3.max(b._data, function(a) {
            if (b._config.serie instanceof Array) {
                var c = 0;
                for (var d = 0; d < b._config.serie.length; d++) {
                    if (c < +a[b._config.serie[d]]) {
                        c = a[b._config.serie[d]];
                    }
                }
                return c;
            } else {
                return +a[b._config.serie];
            }
        }) ]);
        if (this._config.useNiceValues === true) {
            this.scale.nice();
        }
        return this.scale;
    };
    M3.Axis.LinealAxis.prototype.getAxis = function() {
        M3.Axis.AxisItem.prototype.getAxis.call(this);
        if (!isNaN(this._config.ticks)) {
            this.axis.ticks(this._config.ticks);
        }
        return this.axis;
    };
    M3.Axis.LinealAxis.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            useNiceValues: true,
            ticks: 10
        }, a);
    };
})();

(function() {
    "use strict";
    M3.Axis.Stacked100Axis = M3.Axis.Stacked100Axis || M3.createClass(M3.Axis.LinealAxis, function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    M3.Axis.Stacked100Axis.prototype.getAxisScale = function(a) {
        this.scale = d3.scale.linear().range(a);
        this.scale.domain([ 0, 100 ]);
        return this.scale;
    };
})();

(function() {
    "use strict";
    M3.Axis.StackedAxis = M3.Axis.StackedAxis || M3.createClass(M3.Axis.LinealAxis, function() {
        this._config = null;
        this._data = null;
        this.scale = null;
        this._canvas = null;
        this._h = 0;
        this._w = 0;
    });
    M3.Axis.StackedAxis.prototype.getAxisScale = function(a) {
        var b = this;
        this.scale = d3.scale.linear().range(a);
        this.scale.domain([ 0, d3.max(b._data, function(a) {
            var c = 0;
            for (var d = 0; d < b._config.serie.length; d++) {
                c += +a[b._config.serie[d]];
            }
            return c;
        }) ]);
        if (this._config.useNiceValues === true) {
            this.scale.nice();
        }
        return this.scale;
    };
})();

(function() {
    "use strict";
    M3.Axis.AxisManager = function() {
        this.config = null;
        this.data = null;
        this.axis = {
            left: null,
            right: null,
            top: null,
            bottom: null
        };
    };
    M3.Axis.AxisManager.prototype.setConfig = function(a) {
        this.config = a;
        return this;
    };
    M3.Axis.AxisManager.prototype.setData = function(a) {
        this.data = a;
        return this;
    };
    M3.Axis.AxisManager.prototype.show = function(a, b) {
        if (a !== undefined) {
            this.data = a;
        }
        if (b !== undefined) {
            this.config = b;
        }
        if (this.data === undefined || this.data === null) {
            return;
        }
        if (this.config === undefined || this.config === undefined) {
            return;
        }
        if (this.config.axis === undefined || this.config.axis === null) {
            return;
        }
        if (!(this.config.axis instanceof Array)) {
            return;
        }
        for (var c = 0; c < this.config.axis.length; c++) {
            this.axis[this.config.axis[c].pos] = {
                axis: null,
                conf: this.defaultConf(this.config.axis[c])
            };
        }
        if (this.axis.left !== null) {
            this.drawLeftAxis(this.axis.left);
        }
        if (this.axis.bottom !== null) {
            this.drawBottomAxis(this.axis.bottom);
        }
        if (this.axis.right !== null) {
            this.drawRightxis(this.axis.right);
        }
        if (this.axis.top !== null) {
            this.drawTopAxis(this.axis.top);
        }
        return this;
    };
    M3.Axis.AxisManager.prototype.drawRightxis = function(a) {
        var b = this.config.canvasWidth - this.getOffset("right");
        var c = this.getOffset("top");
        var d = a.conf.width;
        var e = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        var f = d3.select(this.config.container + " .canvas");
        var g = M3, h = 0;
        var i = a.conf.clazz.split(".");
        while (h < i.length) {
            g = g[i[h++]];
        }
        a.axis = new g().canvas(f).config(a.conf).data(this.data).draw(d, e, b, c);
    };
    M3.Axis.AxisManager.prototype.drawLeftAxis = function(a) {
        var b = a.conf.width + (a.conf.labelPosition == "outer" && a.conf.label !== "" ? a.conf.labelWidth : 0);
        var c = this.getOffset("top");
        var d = a.conf.width;
        var e = this.config.canvasHeight - this.getOffset("top") - this.getOffset("bottom");
        var f = d3.select(this.config.container + " .canvas");
        var g = M3, h = 0;
        var i = a.conf.clazz.split(".");
        while (h < i.length) {
            g = g[i[h++]];
        }
        a.axis = new g().canvas(f).config(a.conf).data(this.data).draw(d, e, b, c);
    };
    M3.Axis.AxisManager.prototype.drawBottomAxis = function(a) {
        var b = this.getOffset("left");
        var c = this.config.canvasHeight - this.getOffset("bottom");
        var d = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var e = a.conf.width;
        var f = d3.select(this.config.container + " .canvas");
        var g = M3, h = 0;
        var i = a.conf.clazz.split(".");
        while (h < i.length) {
            g = g[i[h++]];
        }
        a.axis = new g().canvas(f).config(a.conf).data(this.data).draw(d, e, b, c);
    };
    M3.Axis.AxisManager.prototype.drawTopAxis = function(a) {
        var b = this.getOffset("left");
        var c = a.conf.width + (a.conf.labelPosition == "outer" && a.conf.label !== "" ? a.conf.labelWidth : 0);
        var d = this.config.canvasWidth - this.getOffset("left") - this.getOffset("right");
        var e = a.conf.width;
        var f = d3.select(this.config.container + " .canvas");
        var g = M3, h = 0;
        var i = a.conf.clazz.split(".");
        while (h < i.length) {
            g = g[i[h++]];
        }
        a.axis = new g().canvas(f).config(a.conf).data(this.data).draw(d, e, b, c);
    };
    M3.Axis.AxisManager.prototype.getOffset = function(a) {
        var b = 0;
        if (this.axis[a] !== null && this.axis[a].conf.show === true) {
            b += this.axis[a].conf.width;
            b += this.axis[a].conf.labelPosition == "outer" && this.axis[a].conf.label !== "" ? this.axis[a].conf.labelWidth : 0;
        }
        return b;
    };
    M3.Axis.AxisManager.prototype.defaultConf = function(a) {
        var b = {};
        b.id = "";
        b.pos = "left";
        b.label = "";
        b.labelPosition = "outer";
        b.serie = this.config.itemValue;
        b.width = 35;
        b.show = true;
        b.labelWidth = 18;
        b.clazz = "Axis.LinealAxis";
        b.tickSize = NaN;
        b.tickPadding = NaN;
        b = M3.extend({}, b, a);
        if (b.pos == "left" || b.pos == "right") {
            b.axis = "y";
            b.width = b.width === undefined || b.width === null || isNaN(b.width) ? 35 : b.width;
        } else {
            b.axis = "x";
            b.width = a.width === undefined || a.width === null || isNaN(a.width) ? 20 : b.width;
            b.serie = a.serie === undefined || a.serie === null ? this.config.itemLabel !== undefined && this.config.itemLabel !== null ? this.config.itemLabel : "label" : b.serie;
        }
        b.labelWidth = b.labelWidth === undefined || b.labelWidth === null || isNaN(b.labelWidth) ? 18 : b.labelWidth;
        if (b.axis == "y") {
            b.tickFormat = a.tickFormat === undefined || a.tickFormat === null ? this.config.valueFormat === undefined || this.config.valueFormat === null ? function(a) {
                return d3.format("s")(a);
            } : this.config.valueFormat : b.tickFormat;
        } else {
            b.tickFormat = a.tickFormat === undefined || a.tickFormat === null ? this.config.labelFormat === undefined || this.config.labelFormat === null ? function(a) {
                return a;
            } : this.config.labelFormat : b.tickFormat;
        }
        return b;
    };
})();

(function() {
    "use strict";
    M3.Series = M3.series || {};
    M3.Series.ChartSerie = function() {};
    M3.Series.ChartSerie.prototype.draw = function(a, b, c, d, e) {
        if (console) {
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            console.log(e);
        }
        return e;
    };
    M3.Series.ChartSerie.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            y: "left",
            x: "bottom",
            itemValue: "value",
            itemLabel: "label"
        }, a);
    };
})();

(function() {
    "use strict";
    M3.Series.ColumnSerie = M3.Series.ColumnSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.ColumnSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = d.select("rect").attr("height");
        var h = d.selectAll(".column").data(a).enter().append("g").attr("class", "rect");
        var i = c.axis[f.y].axis.scale;
        var j = c.axis[f.x].axis.scale;
        h.append("rect").attr("class", "column serie s" + e).attr("x", function(a) {
            return j(a[f.itemLabel]);
        }).attr("y", function(a) {
            return i(a[f.itemValue]);
        }).attr("height", function(a) {
            if (f.itemValueMin !== undefined && a[f.itemValueMin] !== undefined && a[f.itemValueMin] !== null) {
                return g - i(a[f.itemValue] - a[f.itemValueMin]);
            } else {
                return g - i(a[f.itemValue]);
            }
        }).attr("width", j.rangeBand());
        e++;
        return e;
    };
    M3.Series.ColumnSerie.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            itemValueMin: "valueMin"
        }, M3.Series.ChartSerie.prototype.defaultConfig.call(this, a));
    };
})();

(function() {
    "use strict";
    M3.Series.GroupColumnSerie = M3.Series.GroupColumnSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.GroupColumnSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = d.select("rect").attr("height");
        var h = c.axis[f.y].axis.scale;
        var i = c.axis[f.x].axis.scale;
        var j = d3.scale.ordinal();
        j.domain(f.itemValue).rangeRoundBands([ 0, i.rangeBand() ]);
        var k = d.selectAll(".group").data(a).enter().append("g").attr("class", "group").attr("transform", function(a) {
            return "translate(" + i(a[f.itemLabel]) + ",0)";
        });
        d.selectAll(".group").append("rect").attr("width", i.rangeBand()).attr("height", g).attr("class", "background");
        k = d.selectAll(".group").append("g").attr("class", "series");
        var l = f.itemValue;
        k.selectAll("rect").data(function(a) {
            var b = [];
            for (var c = 0; c < l.length; c++) {
                b[c] = {
                    label: l[c],
                    value: a[l[c]]
                };
            }
            return b;
        }).enter().append("rect").attr("width", j.rangeBand()).attr("x", function(a) {
            return j(a.label);
        }).attr("y", function(a) {
            return h(a.value);
        }).attr("height", function(a) {
            return g - h(a.value);
        }).attr("class", function(a) {
            var b = l.indexOf(a.label);
            b += b >= 0 ? 1 : 0;
            b = b > 10 ? b / 10 : b;
            return "column serie s" + b;
        });
        return e + l.length;
    };
})();

(function() {
    "use strict";
    M3.Series.StackedColumnSerie = M3.Series.StackedColumnSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.StackedColumnSerie.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            fullStack: false,
            normalize: true
        }, M3.Series.ChartSerie.prototype.defaultConfig.call(this, a));
    };
    M3.Series.StackedColumnSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = d.select("rect").attr("height");
        var h = c.axis[f.y].axis.scale;
        var i = c.axis[f.x].axis.scale;
        var j = f.itemValue;
        var k = d3.layout.stack().values(function(a) {
            var b = [];
            for (var c = 0; c < j.length; c++) {
                b[c] = {
                    label: j[c],
                    value: a[j[c]]
                };
            }
            return b;
        });
        var l = k(a);
        if (f.fullStack !== undefined && f.fullStack === true) {
            if (f.normalize !== undefined && f.normalize === true) {
                var m = a.map(function(a) {
                    var b = 0;
                    for (var c = 0; c < j.length; c++) {
                        b += +a[j[c]];
                    }
                    return b;
                });
                l = l.map(function(a, b) {
                    var c = {};
                    c[f.itemLabel] = a[f.itemLabel];
                    j.forEach(function(d) {
                        c[d] = a[d] === 0 ? 0 : +a[d] * 100 / m[b];
                    });
                    return c;
                });
            }
        }
        var n = d.selectAll(".group").data(l).enter().append("g").attr("class", "group").attr("transform", function(a) {
            return "translate(" + i(a.label) + ",0)";
        });
        d.selectAll(".group").append("rect").attr("width", i.rangeBand()).attr("height", g).attr("class", "background");
        n = d.selectAll(".group").append("g").attr("class", "series");
        n.selectAll(".group").data(function(a) {
            var b = [];
            for (var c = 0; c < j.length; c++) {
                var d = 0;
                for (var e = 0; e < c; e++) {
                    d += +a[j[e]];
                }
                b[c] = {
                    label: j[c],
                    value: +a[j[c]],
                    valueMin: c === 0 ? 0 : d
                };
            }
            return b;
        }).enter().append("rect").attr("x", function(a) {
            return i(a.label);
        }).attr("y", function(a) {
            return h(a.value + a.valueMin);
        }).attr("width", i.rangeBand()).attr("height", function(a) {
            return g - h(a.value);
        }).attr("class", function(a) {
            var b = j.indexOf(a.label);
            b += b >= 0 ? 1 : 0;
            b = b > 10 ? b / 10 : b;
            return "column serie s" + b;
        });
        return e + j.length;
    };
})();

(function() {
    "use strict";
    M3.Series.LineSerie = M3.Series.LineSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.LineSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = c.axis[f.y].axis.scale;
        var h = c.axis[f.x].axis.scale;
        var i = c.axis[f.x].conf.clazz.indexOf("CategoryAxis") > -1 ? true : false;
        var j = d3.svg.line().x(function(a) {
            return h(a[f.itemLabel]) + (i ? h.rangeBand() / 2 : 0);
        }).y(function(a) {
            return g(a[f.itemValue]);
        });
        d.append("path").datum(a).attr("class", "sl" + e).attr("d", j);
        var k = d.selectAll(".data-point-s" + e).data(a).enter().append("g").attr("class", "serie data-point-s" + e).attr("transform", function(a) {
            return "translate(" + (h(a[f.itemLabel]) + (i ? h.rangeBand() / 2 : 0)) + "," + g(a[f.itemValue]) + ")";
        });
        k.append("circle").attr("r", function() {
            return 3;
        });
        e++;
        return e;
    };
})();

(function() {
    "use strict";
    M3.Series.AreaSerie = M3.Series.AreaSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.AreaSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = d.select("rect").attr("height");
        var h = c.axis[f.y].axis.scale;
        var i = c.axis[f.x].axis.scale;
        var j = d3.svg.area().x(function(a) {
            return i(a[f.itemLabel]);
        }).y0(function(a) {
            if (a[f.itemValueMin] !== undefined && a[f.itemValueMin] !== null) {
                return h(a[f.itemValueMin]);
            } else {
                return g;
            }
        }).y1(function(a) {
            return h(a[f.itemValue]);
        });
        d.append("path").datum(a).attr("class", "s1").attr("d", j);
        e++;
    };
    M3.Series.AreaSerie.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            itemValueMin: "valueMin"
        }, M3.Series.ChartSerie.prototype.defaultConfig.call(this, a));
    };
})();

(function() {
    "use strict";
    M3.Series.StackedAreaSerie = M3.Series.StackedAreaSerie || M3.createClass(M3.Series.ChartSerie, function() {});
    M3.Series.StackedAreaSerie.prototype.defaultConfig = function(a) {
        return M3.extend({}, {
            fullStack: false,
            normalize: true
        }, M3.Series.ChartSerie.prototype.defaultConfig.call(this, a));
    };
    M3.Series.StackedAreaSerie.prototype.draw = function(a, b, c, d, e) {
        var f = this.defaultConfig(b);
        var g = d.select("rect").attr("height");
        var h = c.axis[f.y].axis.scale;
        var i = c.axis[f.x].axis.scale;
        var j = f.itemValue;
        var k = a;
        if (f.fullStack !== undefined && f.fullStack === true) {
            if (f.normalize !== undefined && f.normalize === true) {
                var l = a.map(function(a) {
                    var b = 0;
                    for (var c = 0; c < j.length; c++) {
                        b += +a[j[c]];
                    }
                    return b;
                });
                k = k.map(function(a, b) {
                    var c = {};
                    c[f.itemLabel] = a[f.itemLabel];
                    j.forEach(function(d) {
                        c[d] = a[d] === 0 ? 0 : +a[d] * 100 / l[b];
                    });
                    return c;
                });
            }
        }
        j.map(function(b, c) {
            var l = d3.svg.area().x(function(a) {
                return i(a[f.itemLabel]);
            }).y0(function(a) {
                if (c === 0) {
                    return g;
                } else {
                    var b = 0;
                    for (var d = 0; d < c; d++) {
                        b += +a[j[d]];
                    }
                    return h(b);
                }
            }).y1(function(a) {
                if (c === 0) {
                    return h(+a[b]);
                } else {
                    var d = 0;
                    for (var e = 0; e < c; e++) {
                        d += +a[j[e]];
                    }
                    d += +a[b];
                    return h(d);
                }
            });
            d.append("path").datum(k).attr("class", function() {
                var a = c + 1;
                a = c > 10 ? c / 10 : a;
                return "s" + a;
            }).attr("d", l);
            var m = d.selectAll(".data-point" + e).data(a).enter().append("g").attr("class", function() {
                var a = c + 1;
                a = c > 10 ? c / 10 : a;
                return "data-point-s" + a;
            }).attr("transform", function(a) {
                return "translate(" + i(a[f.itemLabel]) + "," + h(a[b]) + ")";
            });
            if (f.itemValueMin !== undefined && a[0][f.itemValueMin] === undefined || a[0][f.itemValueMin] === null) {
                m.append("circle").attr("r", function() {
                    return 3;
                });
            }
        });
        return e + j.length;
    };
})();

(function() {
    "use strict";
    M3.Chart = M3.Chart || M3CreateClass(M3.AbstractChart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.Chart.prototype.addAxis = function() {
        this.axis = new M3.Axis.AxisManager();
        this.axis.setConfig(this.config).setData(this.data).show();
    };
    M3.Chart.prototype.drawInner = function() {
        this.addAxis();
        this.drawChartArea();
        this.drawSeries();
        return this;
    };
    M3.Chart.prototype.drawSeries = function() {
        this.series = [];
        var a = d3.select(this.config.container + " .chartarea");
        var b = null;
        if (this.config.series === undefined || this.config.series === null) {
            b = [ this.configSerie({}) ];
        } else if (!(this.config.series instanceof Array)) {
            b = [ this.configSerie(this.config.series) ];
        } else {
            b = this.config.series;
        }
        var c = 1;
        for (var d = 0; d < b.length; d++) {
            var e = this.configSerie(b[d]);
            if (e !== undefined && e !== null && e.clazz !== undefined && e.clazz !== null) {
                var f = e.clazz.split(".");
                var g = M3, h = 0;
                while (h < f.length) {
                    g = g[f[h++]];
                }
                c = this.series[d] = new g().draw(this.data, e, this.axis, a, c);
            }
        }
    };
    M3.Chart.prototype.configSerie = function(a) {
        if (a.itemValue === undefined || a.itemValue === null) {
            a.itemValue = this.config.itemValue;
        }
        if (a.itemValue === undefined || a.itemValue === null) {
            a.itemLabel = this.config.itemLabel;
        }
        return a;
    };
    M3.Chart.prototype.drawChartArea = function() {
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        var b = 0;
        b += this.axis.axis.left !== null ? this.axis.getOffset("left") + 1 : 0;
        var c = 0;
        c += this.axis.axis.top !== null ? this.axis.getOffset("top") : 0;
        var d = this.config.canvasWidth;
        d -= this.axis.axis.left !== null ? this.axis.getOffset("left") + 1 : 0;
        d -= this.axis.axis.right !== null ? this.axis.getOffset("right") + 1 : 0;
        var e = this.config.canvasHeight;
        e -= this.axis.axis.top !== null ? this.axis.getOffset("top") : 0;
        e -= this.axis.axis.bottom !== null ? this.axis.getOffset("bottom") : 0;
        a.append("g").attr("class", "chartarea").attr("transform", "translate(" + b + ", " + c + ")").append("rect").attr("width", d).attr("height", e).attr("class", "background");
        return this;
    };
})();

(function() {
    "use strict";
    M3.AbstractPolarChart = M3.AbstractPolarChart || M3.createClass(M3.AbstractChart);
    M3.AbstractPolarChart.prototype.arc = null;
    M3.AbstractPolarChart.prototype.slices = null;
    M3.AbstractPolarChart.prototype.getArc = function() {
        var a = this;
        a.arc = d3.svg.arc().outerRadius(a.config.radius).innerRadius(0);
        return a.arc;
    };
    M3.AbstractPolarChart.prototype.getLayout = function() {
        var a = this;
        a.layout = d3.layout.pie().sort(null).value(function(b) {
            return b[a.config.itemValue];
        });
        return a.layout;
    };
    M3.AbstractPolarChart.prototype.addSlices = function() {
        var a = this;
        var b = null;
        var c = d3.select(this.config.container + " ." + this.config.styles.canvas);
        var d = c.append("g").attr("class", "chartarea").attr("transform", "translate(" + a.config.canvasWidth / 2 + "," + a.config.canvasHeight / 2 + ")");
        d.append("rect").attr("width", this.config.canvasWidth).attr("height", this.config.canvasHeight).attr("class", "background").attr("x", a.config.canvasWidth / -2).attr("y", a.config.canvasHeight / -2);
        var e = d.selectAll(".arc").data(a.layout(a.data)).enter().append("g").attr("class", "arc");
        e.append("path").attr("d", a.arc).attr("class", function(a, b) {
            var c = +b + 1;
            return "serie s" + (c < 11 ? c.toString() : (c % 10).toString());
        });
        if (b !== null) {
            slice.style("fill", function(c) {
                return b(c.data[a.config.itemValue]);
            });
        }
        this.slices = e;
        return e;
    };
    M3.AbstractPolarChart.prototype.beforeDraw = function() {
        M3.AbstractChart.prototype.beforeDraw.call(this);
        if (this.config.radius === undefined || this.config.radius === null || isNaN(this.config.radius)) {
            this.config.radius = Math.min(this.config.canvasWidth, this.config.canvasHeight) / 2;
        }
    };
})();

(function() {
    "use strict";
    M3.PieChart = M3.PieChart || M3.createClass(M3.AbstractPolarChart, function() {
        this.className = "PieChart";
    });
    M3.PieChart.prototype.drawInner = function() {
        this.getArc();
        this.getLayout();
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas pieChart");
        this.addSlices();
    };
})();

(function() {
    "use strict";
    M3.DonutChart = M3.DonutChart || M3.createClass(M3.PieChart, function() {
        this.className = "DonutChart";
    });
    M3.DonutChart.prototype.getArc = function() {
        var a = this;
        a.arc = d3.svg.arc().outerRadius(a.config.radius).innerRadius(a.config.radius - a.config.donutWidth);
        return a.arc;
    };
    M3.DonutChart.prototype.setConfig = function(a) {
        var b = {
            donutWidth: 20
        };
        var c = M3.mixin(a, b);
        M3.AbstractChart.prototype.setConfig.call(this, c);
        return this;
    };
    M3.DonutChart.prototype.drawInner = function() {
        M3.PieChart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas donutChart");
    };
})();

(function() {
    "use strict";
    M3.ArcChart = M3.ArcChart || M3.createClass(M3.DonutChart, function() {
        this.className = "ArcChart";
    });
    M3.ArcChart.prototype.drawInner = function() {
        var a = this;
        var b = a.data[0][a.config.itemValue];
        var c = 2 * Math.PI;
        var d = this.config.startAngle / 100 * c;
        var e = this.getArc().startAngle(d);
        var f = d3.select(this.config.container + " ." + this.config.styles.canvas);
        f.attr("class", "canvas arcChart");
        var g = f.append("g").attr("class", "chartarea").attr("transform", "translate(" + a.config.canvasWidth / 2 + "," + a.config.canvasHeight / 2 + ")");
        g.append("rect").attr("width", this.config.canvasWidth).attr("height", this.config.canvasHeight).attr("class", "background").attr("x", a.config.canvasWidth / -2).attr("y", a.config.canvasHeight / -2);
        g.append("path").datum({
            endAngle: c
        }).attr("class", "brackground").attr("d", e);
        g.append("path").datum({
            endAngle: d + b / 100 * c
        }).attr("class", "serie s1").attr("d", e);
    };
    M3.ArcChart.prototype.setConfig = function(a) {
        var b = {
            startAngle: 0
        };
        var c = M3.mixin(a, b);
        M3.DonutChart.prototype.setConfig.call(this, c);
        return this;
    };
})();

(function() {
    "use strict";
    M3.SliceChart = M3.SliceChart || M3.createClass(M3.ArcChart, function() {
        this.className = "SliceChart";
    });
    M3.SliceChart.prototype.getArc = function() {
        var a = this;
        a.arc = d3.svg.arc().outerRadius(a.config.radius);
        return a.arc;
    };
    M3.SliceChart.prototype.drawInner = function() {
        M3.ArcChart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas sliceChart");
    };
})();

(function() {
    "use strict";
    M3.KPIComplete = M3.KPIComplete || M3.createClass(M3.ArcChart);
    M3.KPIComplete.prototype.drawInner = function() {
        M3.ArcChart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas kpicompleteChart");
        var b = d3.select(this.config.container + " ." + this.config.styles.canvas + " .chartarea");
        b.attr("transform", "translate(" + this.config.radius + ", " + this.config.radius + ")");
        var c = d3.select(this.config.container + " ." + this.config.styles.canvas + " .chartarea rect");
        c.attr("x", this.config.radius / -1).attr("y", this.config.radius / -1);
        var d = +this.data[0].value;
        var e = d > 0 ? "acomplishment_ok" : d < 0 ? "acomplishment_bad" : "acomplishment_zero";
        a.select(".s1").attr("class", "serie " + e);
        var f = "";
        var g = b.append("text").attr("class", "title").attr("dy", "1em").attr("transform", "translate(" + (this.config.radius + 10) + ", " + this.config.radius * -1 + ")");
        if (this.data !== null) {
            f = this.config.titleItem !== undefined && this.config.titleItem !== "" ? this.config.titleItem : "title";
            if (this.data[0][f] !== undefined && this.data[0][f] !== null) {
                g.text(this.data[0][f]);
            }
        }
        b.append("text").attr("dy", ".35em").attr("class", "txtKPI").attr("text-anchor", "end").attr("transform", "translate(8,0)").text(this.data[0].value.toString());
        b.append("text").attr("dy", ".35em").attr("class", "txtKPI_porc").attr("text-anchor", "start").attr("transform", "translate(8,0)").text("%");
        b.append("text").attr("class", "obj_title").attr("dy", "1em").text("Ojetivo:").attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        g = b.append("text").attr("class", "obj_value").attr("dy", "1em").attr("dx", "4.4em").attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        if (this.data !== null) {
            f = this.config.targetItem !== undefined ? this.config.targetItem : "target";
            if (this.data[0][f] !== undefined && this.data[0][f] !== null) {
                g.text(this.data[0][f]);
            }
        }
        b.append("text").attr("class", "real_title").attr("dy", "2.5em").attr("dx", "1.2em").text("Real:").attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        g = b.append("text").attr("class", "real_value").attr("dy", "2.5em").attr("dx", "4.4em").attr("transform", "translate(" + (this.config.radius + 10) + ", " + 0 + ")");
        if (this.data !== null) {
            f = this.config.realItem !== undefined ? this.config.realItem : "real";
            if (this.data[0][f] !== undefined && this.data[0][f] !== null) {
                g.text(this.data[0][f]);
            }
        }
    };
})();

(function() {
    "use strict";
    M3.AreaChart = M3.AreaChart || M3CreateClass(M3.Chart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.AreaChart.prototype.configSerie = function(a) {
        var b = M3.LineChart.prototype.configSerie.call(this, {
            clazz: "Series.AreaSerie"
        });
        return M3.extend({}, b, M3.Chart.prototype.configSerie.call(this, a));
    };
    M3.AreaChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas areaChart");
    };
})();

(function() {
    "use strict";
    M3.ColumnChart = M3.ColumnChart || M3CreateClass(M3.Chart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.ColumnChart.prototype.configSerie = function(a) {
        var b = {
            clazz: "Series.ColumnSerie"
        };
        return M3.extend({}, b, M3.Chart.prototype.configSerie.call(this, a));
    };
    M3.ColumnChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas columnChart");
    };
})();

(function() {
    "use strict";
    M3.LineChart = M3.LineChart || M3CreateClass(M3.Chart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.LineChart.prototype.configSerie = function(a) {
        var b = {
            clazz: "Series.LineSerie"
        };
        return M3.extend({}, b, M3.Chart.prototype.configSerie.call(this, a));
    };
    M3.LineChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas lineChart");
    };
})();

(function() {
    "use strict";
    M3.StackedAreaChart = M3.StackedAreaChart || M3CreateClass(M3.Chart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.StackedAreaChart.prototype.configSerie = function(a) {
        var b = M3.AreaChart.prototype.configSerie.call(this, {
            clazz: "Series.StackedAreaSerie"
        });
        return M3.extend({}, b, M3.Chart.prototype.configSerie.call(this, a));
    };
    M3.StackedAreaChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas stackedAreaChart");
    };
})();

(function() {
    "use strict";
    M3.StackedColumnChart = M3.StackedColumnChart || M3CreateClass(M3.Chart, function() {
        this.axis = null;
        this.series = null;
    });
    M3.StackedColumnChart.prototype.configSerie = function(a) {
        var b = M3.ColumnChart.prototype.configSerie.call(this, {
            clazz: "Series.StackedColumnSerie"
        });
        return M3.extend({}, b, M3.Chart.prototype.configSerie.call(this, a));
    };
    M3.StackedColumnChart.prototype.drawInner = function() {
        M3.Chart.prototype.drawInner.call(this);
        var a = d3.select(this.config.container + " ." + this.config.styles.canvas);
        a.attr("class", "canvas stackedColumnChart");
    };
})();

(function() {
    "use strict";
    M3.behaviours = M3.behaviours || {};
    M3.behaviours.SerieValue = function() {};
    M3.behaviours.SerieValue.prototype.run = function(a) {
        var b = a.axis !== undefined && a.axis !== null ? a.axis.hasYLeft ? a.axis.yleft.scale : a.axis.yright.scale : null;
        var c = a.axis !== undefined && a.axis !== null ? a.axis.hasXBottom ? a.axis.xbottom.scale : a.axis.xtop.scale : null;
        if (a.className == "ColumnChart") {
            d3.selectAll(a.config.container + " .chartarea g").append("text").attr("x", function(b) {
                return c(b[a.config.itemLabel]) + c.rangeBand() / 2;
            }).attr("y", function(c) {
                return b(c[a.config.itemValue]);
            }).attr("dy", "1em").attr("class", "serieLabel").attr("text-anchor", "middle").text(function(b) {
                return a.config.yLabelFormat(b[a.config.itemValue]);
            });
        } else if (a.className == "LineChart" || a.className == "AreaChart") {
            d3.selectAll(a.config.container + " .chartarea g").append("text").attr("dy", function(b) {
                return M3.utils.getMaxValue(a) == b[a.config.itemValue] ? "1.5em" : "-0.6em";
            }).attr("class", "serieLabel").attr("text-anchor", function(b, c) {
                return c === 0 ? "start" : c == a.data.length - 1 ? "end" : "middle";
            }).text(function(b) {
                return a.config.yLabelFormat(b[a.config.itemValue]);
            });
        } else if (a.className == "PieChart" || a.className == "DonutChart") {
            d3.selectAll(a.config.container + " .chartarea g").append("text").attr("transform", function(b) {
                b.outerRadius = a.config.radius;
                b.innerRadius = a.config.radius;
                var c = a.arc.centroid(b);
                c[0] *= 1.5;
                c[1] *= 1.5;
                var d = a.config.radius;
                return "translate(" + (d + 14) * Math.sin((b.endAngle - b.startAngle) / 2 + b.startAngle) + "," + -1 * (d + 14) * Math.cos((b.endAngle - b.startAngle) / 2 + b.startAngle) + ")";
            }).attr("dy", ".35em").attr("class", "serieLabel_polar").attr("text-anchor", "middle").attr("text-anchor", function(a) {
                var b = (a.endAngle - a.startAngle) / 2 + a.startAngle;
                if (b > 7 * Math.PI / 4 && b < Math.PI / 4 || b > 3 * Math.PI / 4 && b < 5 * Math.PI / 4) {
                    return "middle";
                } else if (b >= Math.PI / 4 && b <= 3 * Math.PI / 4) {
                    return "start";
                } else if (b >= 5 * Math.PI / 4 && b <= 7 * Math.PI / 4) {
                    return "end";
                } else {
                    return "middle";
                }
            }).text(function(b) {
                return a.config.valueFormat(b[a.config.itemValue]);
            });
            d3.selectAll(a.config.container + " .chartarea g").append("line").attr("x1", function(b) {
                var c = a.config.radius;
                return c * Math.sin((b.endAngle - b.startAngle) / 2 + b.startAngle);
            }).attr("x2", function(b) {
                var c = a.config.radius;
                return (c + 10) * Math.sin((b.endAngle - b.startAngle) / 2 + b.startAngle);
            }).attr("y1", function(b) {
                var c = a.config.radius;
                return -1 * c * Math.cos((b.endAngle - b.startAngle) / 2 + b.startAngle);
            }).attr("y2", function(b) {
                var c = a.config.radius;
                return -1 * (c + 10) * Math.cos((b.endAngle - b.startAngle) / 2 + b.startAngle);
            }).attr("stroke", "rgb(204, 204, 204)");
        }
    };
})();

(function() {
    "use strict";
    M3.behaviours = M3.behaviours || {};
    M3.behaviours.Legend = function(a) {
        this.config = M3.extend({
            width: 15,
            position: "bottom",
            nameItem: "name"
        }, a !== undefined ? a : {});
    };
    M3.behaviours.Legend.prototype.run = function(a) {
        var b = d3.select(a.config.container + " svg .chartarea rect");
        var c = d3.select(a.config.container + " svg").append("g").attr("class", "legend");
        var d = 0, e = 0;
        var f = d3.scale.ordinal();
        var g = null;
        var h = [];
        for (var i = 0; i < a.config.series.length; i++) {
            g = a.config.series[i][this.config.nameItem];
            if (g instanceof Array) {
                h = h.concat(g);
            } else {
                h = h.concat([ g ]);
            }
        }
        f.domain(h);
        if (this.config.position == "bottom") {
            d = (a.axis !== undefined ? a.axis.getOffset("left") : 0) + a.config.margin.left;
            e = a.config.height - this.config.width;
            f.rangeRoundBands([ 0, b.attr("width") ]);
        } else if (this.config.position == "top right") {
            d = a.config.width - ((a.axis !== undefined ? a.axis.getOffset("right") : 0) + a.config.margin.right + 10);
            e = (a.axis !== undefined ? a.axis.getOffset("top") : 0) + a.config.margin.top;
            f.rangeRoundBands([ 0, this.config.width * h.length ]);
        }
        c.attr("transform", "translate(" + d + ", " + e + ")");
        for (i = 0; i < a.config.series.length; i++) {
            g = a.config.series[i][this.config.nameItem];
            if (g instanceof Array) {
                for (var j = 0; j < g.length; j++) {
                    var k = c.append("g");
                    if (this.config.position.indexOf("left") < 0 && this.config.position.indexOf("right") < 0) {
                        k.attr("transform", "translate(" + f(g[j]) + ", 0)");
                        k.append("rect").attr("class", "s" + (j + 1)).attr("width", 10).attr("height", 10);
                        k.append("text").attr("transform", "translate(" + 15 + ", 0)").attr("dy", "1em").attr("text-anchor", "start").text(g[j]);
                    } else {
                        k.attr("transform", "translate(0, " + f(g[j]) + ")");
                        k.append("rect").attr("class", "s" + (j + 1)).attr("width", 10).attr("height", 10);
                        k.append("text").attr("transform", "translate(-5, 0)").attr("dy", "1em").attr("text-anchor", "end").text(g[j]);
                    }
                }
            } else {
                var l = c.append("g");
                l.attr("transform", "translate(" + f(g) + ", 0)");
                if (this.config.position.indexOf("left") < 0 && this.config.position.indexOf("right") < 0) {
                    l.attr("transform", "translate(" + f(g) + ", 0)");
                    l.append("rect").attr("class", "s" + (i + 1)).attr("width", 10).attr("height", 10);
                    l.append("text").attr("transform", "translate(" + 15 + ", 0)").attr("dy", "1em").attr("text-anchor", "start").text(g);
                } else {
                    l.attr("transform", "translate(0, " + f(g) + ")");
                    l.append("rect").attr("class", "s" + (i + 1)).attr("width", 10).attr("height", 10);
                    l.append("text").attr("transform", "translate(-5, 0)").attr("dy", "1em").attr("text-anchor", "end").text(g);
                }
            }
        }
    };
})();

(function() {
    "use strict";
    M3.behaviours = M3.behaviours || {};
    M3.behaviours.Tooltip = function() {
        this.tooltip = null;
        this.tooltipStick = null;
        this.lastClick = null;
    };
    M3.behaviours.Tooltip.prototype.run = function(a) {
        var b = this;
        var c = d3.select(a.config.container + " .canvas");
        this.tooltipStick = d3.tip().attr("class", "d3-tip").html(function(a) {
            return a.label + ": " + d3.format("s")(a.value);
        }).offset([ -10, 0 ]);
        c.call(this.tooltipStick);
        this.tooltip = d3.tip().attr("class", "d3-tip").html(function(a) {
            return a.label + ": " + d3.format("s")(a.value);
        }).offset([ -10, 0 ]);
        c.call(this.tooltip);
        c.selectAll(".serie").on("mouseover", this.tooltip.show).on("mouseout", this.tooltip.hide).on("click", function(a) {
            b.tooltipStick.hide(a);
            if (a != b.lastClick) {
                b.tooltipStick.show(a);
                b.lastClick = a;
            } else {
                b.lastClick = null;
            }
        });
    };
})();

(function() {
    "use strict";
    M3.behaviours = M3.behaviours || {};
    M3.behaviours.GridBackground = function(a) {
        this.config = M3.extend({
            width: 15,
            position: "bottom",
            nameItem: "name"
        }, a !== undefined ? a : {});
    };
    M3.behaviours.GridBackground.prototype.run = function(a) {
        d3.select(a.config.container + " .chartarea").insert("g", "g").attr("class", "grid");
        var b = d3.select(a.config.container + " .chartarea rect").attr("width");
        var c = d3.select(a.config.container + " .chartarea rect").attr("height");
        var d = null, e = null;
        if (a.config.axis !== undefined && a.config.axis instanceof Array) {
            var f = a.config.axis;
            var g = 0;
            while ((d === null || e === null) && g < f.length) {
                var h = f[g].pos;
                if (d === null && (h == "left" || h == "right")) {
                    d = a.axis.axis[h].axis.scale;
                } else if (e === null && (h == "top" || h == "bottom")) {
                    e = a.axis.axis[h].axis.scale;
                }
                g++;
            }
        }
        if (d !== null && d.ticks !== undefined) {
            d3.select(a.config.container + " .chartarea g.grid").selectAll("line.y").data(d.ticks(5)).enter().append("line").attr("class", "y").attr("x1", 0).attr("x2", b).attr("y1", d).attr("y2", d).style("stroke", "#DDD").style("stroke-dasharray", "5,2");
        }
        if (e !== null && e.ticks !== undefined) {
            d3.select(a.config.container + " .chartarea g.grid").selectAll("line.x").data(e.ticks()).enter().append("line").attr("class", "x").attr("x1", e).attr("x2", e).attr("y1", 0).attr("y2", c).style("stroke", "#ccc");
        }
    };
})();