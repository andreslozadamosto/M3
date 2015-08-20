var M3Exted = M3Exted || (function  () {
    "use strict";
    return function() {
        
        var _isObject = function( obj ) {
            var key;
            if ( !obj || typeof(obj) !== "object" || obj.nodeType ) {
                return false;
            }

            try {
                if ( obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }
            if ( support.ownLast ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }
            //for ( key in obj ) {}

            return ((key === undefined) || hasOwn.call( obj, key ));
        };
        
        var ret = {};
        if(arguments !== null && arguments.length > 0) {
            for(var i = 0; i < arguments.length; i++) {
                var elem;
                if(arguments[i] !== undefined && arguments[i] !== null) {
                    for(elem in arguments[i]) {
                        //ret[elem] = arguments[i][elem];
                        //if(typeof(arguments[i][elem]) == "object" && ret[elem] !== undefined) {
                        //if(_isObject(arguments[i][elem]) === true && ret[elem] !== undefined) {
                        if(typeof(arguments[i][elem]) == "object" && !(arguments[i][elem] instanceof Number) && !(arguments[i][elem] instanceof Date) && !(arguments[i][elem] instanceof String) && !(arguments[i][elem] instanceof Array) && ret[elem] !== undefined){
                            ret[elem] = M3Exted(ret[elem], arguments[i][elem]);
                        } else {
                            ret[elem] = arguments[i][elem];
                        }
                    }
                }
            }
        }
        return ret;
    };
})();

