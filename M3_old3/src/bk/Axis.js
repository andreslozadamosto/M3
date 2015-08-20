(function() {
    "use strict";
    /**
    Class to manage Axis

    @class Axis
    @constructor
    */
    M3.Axis = function () {

    };

    /**
    @property data
    */
    M3.Axis.prototype.data = null;
    /**
    @property config
    */
    M3.Axis.prototype.config = null;
    /**
    @property canvas
    */
    M3.Axis.prototype.canvas = null;
    /**
    @property hasXBottom
    */
    M3.Axis.prototype.hasXBottom = false;
    /**
    @property hasXLeft
    */
    M3.Axis.prototype.hasYLeft = false;
    /**
    @property hasYRight
    */
    M3.Axis.prototype.hasYRight = false;
    /**
    @property hasXTop
    */
    M3.Axis.prototype.hasXTop = false;
    
    M3.Axis.prototype.axisXType = "ranges";
    
    M3.Axis.prototype.xbottom = {scale:null, axis:null};
    M3.Axis.prototype.xtop = {scale:null, axis:null};
    M3.Axis.prototype.yleft = {scale:null, axis:null};
    M3.Axis.prototype.yright = {scale:null, axis:null};;
    
    /**
    Devuelve el texto del label del axis si es outer
    @method hasAxisOuterLabel
    @param axis {String}
    @param orient {String}
    */
    M3.Axis.prototype.hasAxisOuterLabel = function(axis, orient) {
        var scope = this;
        var uAxis = axis.toUpperCase();
        var txt = "";
        if(scope.config["axisLabel" + uAxis + "Position"] == "outer") {
            txt = scope.config["axis" + uAxis + "Label" + orient];
            txt = (txt === undefined || txt === null) ? "" : txt;
        }
        return txt;
    };

    /**
    Devuelve el texto del label del axis si es inner
    @method hasAxisInnerLabel
    @param axis {String}
    @param orient {String}
    */
    M3.Axis.prototype.hasAxisInnerLabel = function(axis, orient) {
        var scope = this;
        var uAxis = axis.toUpperCase();
        var txt = "";
        if(scope.config["axisLabel" + uAxis + "Position"] == "inner") {
            txt = scope.config["axis" + uAxis + "Label" + orient];
            txt = (txt === undefined || txt === null) ? "" : txt;
        }
        return txt;
    };

    /**
    Get scale for x axis.

    @method getXScale
    @param orient {String} [top, bottom].
    @return A d3.scale() with configuration applied.
    */
    M3.Axis.prototype.getXScale = function(orient) {
        var scope = this;
        var start, end, scale, padding, label;

        start = 0;
        end = scope.config.canvasWidth - ((scope.hasYLeft?scope.config.widthYLeft:0) + (scope.hasYRight?scope.config.widthYRight:0));
        label = scope.hasAxisOuterLabel("y", "left");
        end -= (label !== "" && scope.hasYLeft) ? scope.config.axisLabelWidth : 0;
        label = scope.hasAxisOuterLabel("y", "right");
        end -= (label !== "" && scope.hasYRight) ? scope.config.axisLabelWidth : 0;

        padding = 0.1;
        if(this.axisXType == "ranges") {
            scale = d3.scale.ordinal().rangeRoundBands([start, end], padding);
        } else {
            scale = d3.scale.ordinal().rangePoints([start, end], 0.05);
        }

        scale.domain(scope.data.map(function(d) {
                                        var item = scope.config["itemLabel"+orient];
                                        item = (item === "")?scope.config.itemLabel:item;
                                        return d[item];
                                    }));
        scope["x" + orient].scale = scale;
        return scale;
    };

    /**
    Get X Axis with some orientation.

    @method getXAxis
    @param orient {String} [top, bottom].
    @return A d3.svg.axis() with the configuratino applied.
    */
    M3.Axis.prototype.getXAxis = function(orient) {
        this["x" + orient].axis = d3.svg.axis()
            .scale(this.getXScale(orient))
            .orient(orient);
        return this["x" + orient].axis;
    };

    /**
    Get scale for y axis.

    @method getYScale
    @param orient {String} [top, bottom].
    @return A d3.scale() with configuration applied.
    */
    M3.Axis.prototype.getYScale = function(orient) {
        var start, end, scale, label;
        var scope = this;

        start = scope.config.canvasHeight - ((scope.hasXTop?scope.config.heightXTop:0) + (scope.hasXBottom?scope.config.heightXBottom:0));
        label = scope.hasAxisOuterLabel("x", "top");
        start -= (label !== "" && scope.hasXTop) ? scope.config.axisLabelWidth : 0;
        label = scope.hasAxisOuterLabel("x", "bottom");
        start -= (label !== "" && scope.hasXBottom) ? scope.config.axisLabelWidth : 0;
        end = 0;
        scale = d3.scale.linear().range([start, end]);

        scale.domain([0, d3.max(scope.data, function(d){
                                                return scope.yMaxFunction(d, scope.config, orient);
                                            })]);
        this["y" + orient].scale = scale;
        return scale;
    };
    
    M3.Axis.prototype.yMaxFunction = function(d, config, orient) {
                                                        var item = config["itemValue"+orient];
                                                        item = (item === "")?config.itemValue:item;
                                                        return d[item];
                                                    }
    
    /**
    Get Y Axis with some orientation.

    @method getYAxis
    @param orient {String} [left, right].
    @return A d3.svg.axis() with the configuratino applied.
    */
    M3.Axis.prototype.getYAxis = function(orient) {
        var scope = this;

        var axisSvg = d3.svg.axis()
            .scale(scope.getYScale(orient))
            .orient(orient);

        if(scope.config.yLabelFormat !== null) { axisSvg.tickFormat(scope.config.yLabelFormat); }
        if(!isNaN(scope.config.ticks)) { axisSvg.ticks(scope.config.ticks); }
        
        this["y" + orient].axis = axisSvg;
        return axisSvg;
    };

    /**
    Add SVG for axis to the canvas

    @method addAxes
    @param canvas {String}
    @param x {String} Offset X
    @param y {String} Offset Y
    @param axis {String} [x, y]
    @param orient {String} [top, bottom, left, right]
    */
    M3.Axis.prototype.addAxes = function(canvas, x, y, axis, orient) {
        var axes = canvas.append("g")
            .attr("class", axis + " axis " + axis + orient)
            .attr("transform", "translate(" + x + ", " + y + ")")
            .call((axis == "x")?this.getXAxis(orient):this.getYAxis(orient));

        return axes;
    };

    M3.Axis.prototype.addRect = function(elem, w, h) {
        return elem.append("rect")
            .attr("class", "background")
            .attr("width", w)
            .attr("height", h);
            //.attr("fill", "#FF0000");
            //.attr("fill-opacity", 0);
    };

    /**
    Add a axis label

    @method addLabel
    @param axis {string} 
    @param orient {string}
    */
    M3.Axis.prototype.addLabel = function(axis, orient) {
        var scope = this;
        var txt = scope.hasAxisOuterLabel(axis, orient);
        var x = 0;
        var y = 0;
        var dy = "";
        var transform = "";
        if(txt !== "") {
            if(axis == "y") {
                y = (orient == "left")? (scope.config.widthYLeft * -1) : scope.config.widthYRight;
                x = d3.select(scope.config.container + " ." + axis + orient + " rect").attr("height") / -2;
                transform =  "rotate(-90)";
                dy = (orient === "left") ?  "-0.5em" : "1em";
            } else {
                x = d3.select(scope.config.container + " ." + axis + orient + " rect").attr("width") / 2;
                y = (orient=="bottom")?scope.config.heightXBottom:(scope.config.heightXTop * -1);
                dy = (orient=="bottom")?"1em":"-0.5em";
            }
            d3.select(scope.config.container + " ." + axis + orient)
                //.attr("transform", "translate(" + (start * -1).toString() + "," + (this.config.canvasHeight/2) + ") rotate(-90)")
                .append("text")
                .attr("y", y)
                .attr("x", x)
                .attr("transform", transform)
                .attr("dy", dy)
                .style("text-anchor", "middle")
                .attr("class", "label")
                .text(scope.config["axis" + axis.toUpperCase() + "Label" + orient]);
        }
        else {
            txt = scope.hasAxisInnerLabel(axis, orient);
            if(txt !== "") {
                if(axis == "y") {
                    dy = (orient=="left")?"0.5em":"-1em";
                    y = 6;
                    transform = "rotate(-90)";
                } else {
                    dy = (orient == "top") ? "-0.75em" : "1.5em";
                    //y = d3.select(scope.config.container + " ." + axis + orient + " rect").attr("height") * 0.5;
                    //transform = "translate(0," + y + ")";
                    //y = 0;
                    x = d3.select(scope.config.container + " ." + axis + orient + " rect").attr("width");
                    x = scope.config.canvasWidth;
                    x -= (scope.hasYLeft)?scope.config.widthYLeft:0;
                    x -= (scope.config.axisLabelYPosition == "outer" && scope.hasYLeft)?scope.config.axisLabelWidth:0;
                    x -= (scope.config.axisLabelYPosition == "outer" && scope.hasYRight)?scope.config.axisLabelWidth:0;
                }
                d3.select(scope.config.container + " ." + axis + orient).append("text")
                    .attr("transform", transform)
                    .attr("y", y)
                    .attr("dy", dy)
                    .attr("x", x)
                    .style("text-anchor", "end")
                    .text(scope.config["axis" + axis.toUpperCase() + "Label" + orient]);
            }
        }
    };


    /**
    Add Axis to canvas

    @method addAllAxis
    @param bottom {boolean}
    @param left {boolean}
    @param right {boolean}
    @param top {boolean}
    */
    M3.Axis.prototype.addAllAxis = function(bottom, left, right, top) {
        this.hasXBottom = (bottom !== undefined && bottom === true);
        this.hasYLeft = (left !== undefined && left === true);
        this.hasYRight = (right !== undefined && right === true);
        this.hasXTop = (top !== undefined && top === true);

        var elem = null;
        var x = 0, y = 0;
        var w = 0, h = 0;
        

        var label = "";
        if(this.hasXBottom) {
            //this.addAxis("x", "bottom"); 

            w = this.config.canvasWidth;
            w -= (this.hasYLeft)?this.config.widthYLeft:0;
            w -= (this.hasYRight)?this.config.widthYRight:0;
            h = this.config.heightXBottom;

            label = this.hasAxisOuterLabel("y", "left");
            x = ((this.hasYLeft)?this.config.widthYLeft:0) + ((label !== "" && this.hasYLeft) ? this.config.axisLabelWidth : 0);
            w -= (label !== "" ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "bottom");
            y = this.config.canvasHeight - this.config.heightXBottom - (label !== "" ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("y", "right");
            w -= ((label !== "" && this.hasYRight) ? this.config.axisLabelWidth : 0);

            elem = this.addAxes(this.canvas, x, y, "x", "bottom");
            this.addRect(elem, w, h);

            this.addLabel("x", "bottom");
        }
        if(this.hasXTop) {
            //this.addAxis("x", "top"); 
            w = this.config.canvasWidth;
            w -= (this.hasYLeft)?this.config.widthYLeft:0;
            w -= (this.hasYRight)?this.config.widthYRight:0;
            h = this.config.heightXTop;

            label = this.hasAxisOuterLabel("y", "left");
            x = ((this.hasYLeft)?this.config.widthYLeft:0) + ((label !== "" && this.hasYLeft) ? this.config.axisLabelWidth : 0);
            w -= ((label !== "" && this.hasYLeft) ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "top");
            y = this.config.heightXTop + (label !== "" ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("y", "right");
            w -= ((label !== "" && this.hasYRight) ? this.config.axisLabelWidth : 0);

            elem = this.addAxes(this.canvas, x, y, "x", "top");
            this.addRect(elem, w, h).attr("transform", "translate(0, " + (this.config.heightXTop * -1) + ")");

            this.addLabel("x", "top");
        }
        if(this.hasYLeft) {
            //this.addAxis("y", "left"); 
            w = this.config.widthYLeft;
            h = this.config.canvasHeight;
            h -= (this.hasXBottom)?this.config.heightXBottom:0;
            h -= (this.hasXTop)?this.config.heightXTop:0;

            label = this.hasAxisOuterLabel("y", "left");
            x = this.config.widthYLeft + (label !== "" ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "top");
            y = ((this.hasXTop)?this.config.heightXTop:0) + ((label !== "" && this.hasXTop) ? this.config.axisLabelWidth : 0);
            h -= ((label !== "" && this.hasXTop) ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "bottom");
            h -= ((label !== "" && this.hasXBottom) ? this.config.axisLabelWidth : 0);

            elem = this.addAxes(this.canvas, x, y, "y", "left");
            this.addRect(elem, w, h).attr("transform", "translate(" + (this.config.widthYLeft * -1) + ", 0)");

            this.addLabel("y", "left");
        }
        if(this.hasYRight) {
            //this.addAxis("y", "right");
            w = this.config.widthYRight;
            h = this.config.canvasHeight;
            h -= (this.hasXBottom)?this.config.heightXBottom:0;
            h -= (this.hasXTop)?this.config.heightXTop:0;

            label = this.hasAxisOuterLabel("y", "right");
            x = this.config.canvasWidth - this.config.widthYRight - (label !== "" ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "top");
            y = ((this.hasXTop)?this.config.heightXTop:0) + ((label !== "" && this.hasXTop) ? this.config.axisLabelWidth : 0);
            h -= ((label !== "" && this.hasXTop) ? this.config.axisLabelWidth : 0);

            label = this.hasAxisOuterLabel("x", "bottom");
            h -= ((label !== "" && this.hasXBottom) ? this.config.axisLabelWidth : 0);

            elem = this.addAxes(this.canvas, x, y, "y", "right");

            this.addRect(elem, w, h);

            this.addLabel("y", "right");
        }
    };
})();