(function(namespace){
    "use strict";
    namespace.New = namespace.New || (function(){
        return function(className, initializer, inherits) {
            inherits = inherits || Object;

            this[className] = function(){
                if (inherits) {
                    if (inherits.constructor) {
                        inherits.constructor.call(this);
                    }
                    inherits.call(this);
                }
                if (initializer) {
                    initializer.call(this);
                }
            };
            this[className].prototype = Object.create(inherits.prototype);
            this[className].prototype.constructor = this[className];
            
            return this[className];
        };
    })();
})(M3.Class);