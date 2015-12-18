"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./Settings", "./defaults"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./Settings"), require("./defaults"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Settings, global.defaults);
        global.DataViz = mod.exports;
    }
})(this, function (exports, _Settings, _defaults) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.dataviz = exports.DataViz = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var drawContainer = function drawContainer() {
        var elem = d3.select(this["settings"].data("container"));

        if (elem) {
            elem.append("svg").attr("class", "m3").attr("width", this["settings"].data("datavizMinWidth")).attr("height", this["settings"].data("datavizMinHeigth")).append("rect").attr("width", this["settings"].data("datavizMinWidth")).attr("height", this["settings"].data("datavizMinHeigth")).attr("class", "background");
        }
    };

    var DataViz = (function () {
        function DataViz() {
            _classCallCheck(this, DataViz);

            console.log("Dataviz Constructor");
            this["settings"] = (0, _Settings.settings)(_defaults.DataVizDefaults);
            this["alredyDraw"] = false;
        }

        _createClass(DataViz, [{
            key: "conf",
            value: function conf(value) {
                this["settings"].data(value);
                return this;
            }
        }, {
            key: "draw",
            value: function draw() {
                if (this["alredyDraw"]) this.clear();
                drawContainer.call(this);
                this["alredyDraw"] = true;
                return this;
            }
        }, {
            key: "clear",
            value: function clear() {
                this.remove();
                drawContainer.call(this);
            }
        }, {
            key: "remove",
            value: function remove() {
                d3.select(this["settings"].data("container") + " svg").remove();
            }
        }]);

        return DataViz;
    })();

    function foo() {
        return new DataViz();
    }

    exports.DataViz = DataViz;
    exports.dataviz = foo;
});
//# sourceMappingURL=DataViz.js.map
