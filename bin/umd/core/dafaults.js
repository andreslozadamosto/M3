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
                global.dafaults = mod.exports;
        }
})(this, function (exports) {
        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        var DataVizDefaults = {
                datavizMinWidth: 200,
                datavizMinHeigth: 100
        };
        exports.DataVizDefaults = DataVizDefaults;
});
//# sourceMappingURL=dafaults.js.map
