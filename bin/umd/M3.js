'use strict';

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./core/DataViz'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./core/DataViz'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.DataViz);
    global.M3 = mod.exports;
  }
})(this, function (_DataViz) {
  (0, _DataViz.DataViz)();
});
//# sourceMappingURL=M3.js.map
