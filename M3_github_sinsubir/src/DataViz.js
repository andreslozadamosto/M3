(function(m3) {

    m3.DataViz = m3.DataViz ||
        function(m3) {
            /**
            Base class for datavisualizations

            @class M3.DataViz
            @constructor
            @module M3
            */
            var clazz = m3.Utils.class("DataViz", Object);

            clazz.MIN_WIDTH_SIZE = 200;
            clazz.MIN_HEIGHT_SIZE = 100;

            /**
            Config properties storage.
            @property config
            */
            clazz.prototype.config = null;

            /**
            Data to render.
            @property data
            */
            clazz.prototype.data = null;

            /**
            Text to show when there is no data
            @property noDataText
            */
            clazz.prototype.noDataText = "There is no data to display";

            /**
            List of behavirours.
            @property behaviours
            */
            clazz.prototype.behaviours = null;

            /**
            Set the config properties

            Default values:
            <table>
                <thead>
                    <tr><th>Property</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td>margin</td><td>{top: 5, bottom: 5, left: 5, right:5, all:NaN}</td><td></td></tr>
                    <tr><td>width</td><td>Width of the container or 200 if it is zero</td><td>Width of the Datavisualization</td></tr>
                    <tr><td>height</td><td>Height of the container or takes the with size if it is zero</td><td>Height of the datavisualization</td></tr>
                    <tr><td>container</td><td>#chartContainer</td><td>Id of the html element that contains the datavisualization</td></tr>
                    <tr><td>styles</td><td>{container:"m3" canvas:"canvas" }</td><td></td></tr>
                    <tr><td>resize</td><td>options: "fixed":fix to the container, "ratio":maintein aspect ratio (aspectRatio property)</td><td></td></tr>
                </tbody>
            </table>

            This properties are calculated on runtime based on the previous properties:
            <table>
                <thead>
                    <tr><th>Property</th><th>Default</th><th>Description</th></tr>
                </thead>
                <tbody>
                    <tr><td>canvasWidth</td><td>Get its value from: widh - (margin.left + margin.right)</td><td>Is the width of the area where the datavisualization will be plotted</td></tr>
                    <tr><td>canvasHeight</td><td>Get its value from: height - (margin.top + margin.bottom)</td><td>Is the height of the area where the datavisualization will be plotted</td></tr>
                    <tr><td>aspectRatio</td><td>Get its value from: heigh / width</td><td>The aspectRatio for autoresizing</td></tr>
                </tbody>
            </table>

            If you set margin.all = 15, so margin.left, margin.right, margin.bottom and margin.top are setted to 15.

            @method setConfig
            @chainable
            @param conf {Object} object with properties
            @return Instance reference
            */
            clazz.prototype.setConfig = function(conf) {
                var defaults = {
                    margin: {
                        top: 5,
                        bottom: 5,
                        left: 5,
                        right: 5,
                        all: NaN
                    },
                    container: "#chartContainer",
                    styles: {
                        container: "m3",
                        canvas: "canvas",
                        nodatatext: "nodatatext"
                    },
                    resize: "fixed"
                };

                var ret = {};
                //if there is a previous config
                if (this.config && conf) {
                    ret = m3.Utils.extend(this.config, conf)
                } else {
                    ret = m3.Utils.extend(defaults, (conf) ? conf : {});
                }

                if (!+ret.width || +ret.width < m3.DataViz.MIN_WIDTH_SIZE) {
                    ret.width = m3.Utils.getWidthOfDiv(ret.container);
                    if (!+ret.width || +ret.width < m3.DataViz.MIN_WIDTH_SIZE) ret.width = M3.DataViz.MIN_WIDTH_SIZE;
                }
                if (!+ret.height || +ret.height < m3.DataViz.MIN_HEIGHT_SIZE) {
                    ret["height"] = m3.Utils.getHeightOfDiv(ret.container);
                    if (!+ret.height || +ret.height < M3.DataViz.MIN_HEIGHT_SIZE) ret.height = M3.DataViz.MIN_HEIGHT_SIZE;
                }

                ret.aspectRatio = ret.height / ret.width;

                //check if "all" is a Number
                if (+ret.margin.all || +ret.margin.all === 0) {
                    ret.margin.top = ret.margin.bottom = ret.margin.left = ret.margin.right = conf.margin.all;
                }

                ret.canvasWidth = ret.width - (ret.margin.left + ret.margin.right);
                ret.canvasHeight = ret.height - (ret.margin.top + ret.margin.bottom);

                this.config = ret;
                return this;
            };

            /**
            Set data to viz
            @method data
            @chainable
            @param data {Array}
            */
            clazz.prototype.setData = function(value) {
                this.data = value;
                return this;
            };
        
            return clazz;
    }(m3);
}(M3));