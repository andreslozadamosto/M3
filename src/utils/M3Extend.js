(function(utils) {
    utils.extend = utils.extend ||
    /**
     Helper to extends two or more objects like JQuery extend.
     
     */
    function() {
        "use strict";
        var _isObject = function(obj) {
            var key;
            if (!obj || typeof(obj) !== "object" || obj.nodeType) {
                return false;
            }

            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }
            return ((key === undefined) || hasOwn.call(obj, key));
        };

        var ret = {};
        if (arguments !== null && arguments.length > 0) {
            for (var i = 0; i < arguments.length; i++) {
                var elem;
                if (arguments[i] !== undefined && arguments[i] !== null) {
                    for (elem in arguments[i]) {
                        if (typeof(arguments[i][elem]) == "object" && !(arguments[i][elem] instanceof Number) && !(arguments[i][elem] instanceof Date) && !(arguments[i][elem] instanceof String) && !(arguments[i][elem] instanceof Array) && ret[elem] !== undefined) {
                            ret[elem] = utils.extend(ret[elem], arguments[i][elem]);
                        } else {
                            ret[elem] = arguments[i][elem];
                        }
                    }
                }
            }
        }
        return ret;
    };
}(M3.Utils))