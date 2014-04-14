var M3Mixin = M3Mixin || (function  () {
    "use strict";
    return function() {
        var ret = {};
        if(arguments !== null && arguments.length > 0) {
            for(var i = 0; i < arguments.length; i++) {
                var elem;
                if(arguments[i] !== undefined && arguments[i] !== null) {
                    for(elem in arguments[i]) {
                        if(ret[elem] === undefined) {
                            ret[elem] = arguments[i][elem];
                        } else if(typeof(arguments[i][elem]) == "object") {
                            ret[elem] = M3Mixin(ret[elem], arguments[i][elem]);
                        }
                    }
                }
            }
        }
        return ret;
    };
})();
