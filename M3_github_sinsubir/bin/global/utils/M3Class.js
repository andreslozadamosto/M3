(function(M3) {
    M3.Utils.class = M3.Utils.class ||
    /**
     Helper to create a class that inherit from others.
     
     @param {String} className Name of the new class
     @param {Function} superClass Reference to the base class
     @param {Function} [construct] Construction class
     
 
     @example
        var BaseClass = function() {}
        BaseClass.prototype.property1 = "hello";
        BaseClass.prototype.foo = function() {
            return "bye";
        };
        var ExtendedClass = M3.Utils.Class("ExtendedClass", BaseClass);
     */
    function(className, superClass, construct) {
        "use strict";
        this[className] = function() {
            superClass.call(this);
            if (construct !== null && construct !== undefined) {
                construct.call(this);
            }
        };
        this[className].prototype = Object.create(superClass.prototype);
        this[className].prototype.constructor = this[className];
        this[className].prototype.__super__ = superClass;
        return this[className];
    };
}(M3));