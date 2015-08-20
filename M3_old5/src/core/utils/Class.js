//var M3CreateClass = M3CreateClass || (function(){
var M3CreateClass = M3CreateClass || (function M3CreateClass(){
    "use strict";
    return function (superClass, construct){
        var Foo = function () {
            superClass.call(this);
            if(construct !== null && construct !== undefined) {
                construct.call(this);
            }
        };
        Foo.prototype = Object.create(superClass.prototype);
        Foo.prototype.constructor = Foo;
        Foo.prototype.__super__ = superClass;
        return Foo;
    };
})();
//})();

