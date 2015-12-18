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
        global.Settings = mod.exports;
    }
})(this, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Settings = (function () {
        function Settings(defaults) {
            _classCallCheck(this, Settings);

            this["_data"] = defaults;
        }

        _createClass(Settings, [{
            key: "data",
            value: function data(value) {
                if (this["_data"]) {
                    if (typeof value === 'string') {
                        return this["_data"][value];
                    } else {
                        Object.assign(this["_data"], value);
                    }
                }
            }
        }]);

        return Settings;
    })();

    function foo(defaults) {
        return new Settings(defaults);
    }

    exports.Settings = Settings;
    exports.settings = foo;
});
//# sourceMappingURL=Settings.js.map
