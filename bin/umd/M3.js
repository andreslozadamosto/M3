'use strict';

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './core/DataViz'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./core/DataViz'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.DataViz);
        global.M3 = mod.exports;
    }
})(this, function (exports, _DataViz) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.dataviz = undefined;
    var M3 = {
        dataviz: _DataViz.dataviz
    };
    exports.dataviz = _DataViz.dataviz;
});
//# sourceMappingURL=M3.js.map
