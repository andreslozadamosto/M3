(function(ns) {
    ns.extend = ns.extend || function() {
        return function() {

            var ret = {};
            if (arguments !== null && arguments.length > 0) {
                for (var i = 0; i < arguments.length; i++) {
                    var elem;
                    if (arguments[i] !== undefined && arguments[i] !== null) {
                        for (elem in arguments[i]) {
                            if (typeof(arguments[i][elem]) === "object" && !(arguments[i][elem] instanceof Number) && !(arguments[i][elem] instanceof Date) && !(arguments[i][elem] instanceof String) && !(arguments[i][elem] instanceof Array) && ret[elem] !== undefined) {
                                ret[elem] = ns.extend(ret[elem], arguments[i][elem]);
                            } else {
                                ret[elem] = arguments[i][elem];
                            }
                        }
                    }
                }
            }
            return ret;
        };
    }();
})(window.M3.Utils);
