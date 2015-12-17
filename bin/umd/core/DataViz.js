"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.DataViz = mod.exports;
    }
})(this, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function DataViz() {
        console.log("Soy DataViz");
    }

    exports.DataViz = DataViz;
});
//# sourceMappingURL=DataViz.js.map
