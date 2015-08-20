(function(ns, factory, utils, d3) {

    ns.Dataviz = ns.Dataviz || function() {

        return factory("Dataviz", function() {

            // min values for width and height
            var MIN_WIDTH = 200;
            var MIN_HEIGHT = 100;

            // default config values
            var defaults = {
                margin: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 5
                },
                container: "#M3Container",
                width: MIN_WIDTH,
                height: MIN_HEIGHT,
                MIN_WIDTH: MIN_WIDTH,
                MIN_HEIGHT: MIN_HEIGHT,
                resize:"fixed"
            };

            // config store
            this.__config = defaults;
            // data store
            this.__data = null;
            this.__alreadyDraw = false;

            /**
             * [conf description]
             * @param  {[type]} value [description]
             * @return {[type]}       [description]
             */
            this.conf = function(value) {
                var ret = utils.extend(this.__config, (value) ? value : {});

                if (!+ret.width || +ret.width < MIN_WIDTH) {
                    ret.width = utils.getWidthOfDiv(ret.container);
                    if (!+ret.width || +ret.width < MIN_WIDTH) ret.width = MIN_WIDTH;
                }
                //if(ret["height"] === undefined || ret["height"] === null || isNaN(ret["height"])) {
                if (!+ret.height || +ret.height < MIN_HEIGHT) {
                    ret.height = utils.getHeightOfDiv(ret.container);
                    //if(isNaN(ret.height) || ret.height === 0 ) ret.height = ret.width;
                    if (!+ret.height || +ret.height < MIN_HEIGHT) ret.height = MIN_HEIGHT;
                }

                ret.aspectRatio = ret.height / ret.width;

                ret.canvasWidth = ret.width - (ret.margin.left + ret.margin.right);
                ret.canvasHeight = ret.height - (ret.margin.top + ret.margin.bottom);

                this.__config = ret;

                return this;
            };

            /**
             * [data description]
             * @param  {[type]} value [description]
             * @return {[type]}       [description]
             */
            this.data = function(value) {
                this.__data = value;
                return this;
            };

            /**
             * [draw description]
             * @return {[type]} [description]
             */
            this.draw = function() {
                this.__drawContainer();
                this.__drawCanvas();
                return this;
            };


            this.__drawContainer = function() {
                var elem = d3.select(this.__config.container).append("svg")
                    .attr("class", "m3")
                    .attr("width", this.__config.width)
                    .attr("height", this.__config.height);
                elem.append("rect")
                    .attr("width", this.__config.width)
                    .attr("height", this.__config.height)
                    .attr("class", "background");
            };

            this.__drawCanvas = function() {
                var elem = d3.select(this.__config.container + " .m3").append("g")
                    .attr("class", "canvas")
                    .attr("transform", "translate(" + this.__config.margin.left + ", " + this.__config.margin.top + ")")
                    .attr("width", this.__config.canvasWidth)
                    .attr("height", this.__config.canvasHeight);
                elem.append("rect")
                    .attr("width", this.__config.canvasWidth)
                    .attr("height", this.__config.canvasHeight)
                    .attr("class", "background");
            };

            /**
             * [resize description]
             * @param  {[type]} width  [description]
             * @param  {[type]} height [description]
             * @return {[type]}        [description]
             */
            this.resize = function(width, height) {
                var w = (!+width || +width < this.__config.MIN_WIDTH) ? utils.getWidthOfDiv(this.config.container) : width;
                w = (w < this.__config.MIN_WIDTH) ? this.__config.MIN_WIDTH : w;

                var h = NaN;
                if (this.__config.resize == "fixed") {
                    h = (!+height || +height < this.__config.MIN_HEIGHT) ? utils.getHeightOfDiv(this.config.container) : height;
                    h = (h < this.__config.MIN_HEIGHT) ? this.__config.MIN_HEIGHT : h;
                } else {
                    h = (!+height || +height < this.__config.MIN_HEIGHT) ? w * this.config.aspectRatio : height;
                    h = (h < this.__config.MIN_HEIGHT) ? this.__config.MIN_HEIGHT : h;
                }
                //console.log("resize: " + w + "/" + h);
                this.conf({
                    width: w,
                    height: h
                });
                d3.select(this.__config.container + " .m3")
                    .attr("width", this.__config.width)
                    .attr("height", this.__config.height);
                d3.select(this.__config.container + " .m3" + " > rect")
                    .attr("width", this.__config.width)
                    .attr("height", this.__config.height);
                d3.select(this.__config.container + " .m3" + " .canvas")
                    .attr("width", this.__config.canvasWidth)
                    .attr("height", this.__config.canvasHeight);
                d3.select(this.__config.container + " .m3" + " .canvas" + " > rect")
                    .attr("width", this.__config.canvasWidth)
                    .attr("height", this.__config.canvasHeight);

                return this;
            };


            //setup
            this.conf();
        });
    }();

})(window.M3.Core, window.M3.Core.ClassFactory.create, window.M3.Utils, d3);
