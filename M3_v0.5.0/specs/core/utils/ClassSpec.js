describe("Class function test", function() {
    "use strict";
    
    it("Class function exist", function() {
        expect(M3CreateClass).toBeDefined();
    });
    
    describe("extends a simple class", function() {
        var classBase = function(){};
        classBase.prototype.property1 = "hola";
        classBase.prototype.foo = function() {
                return "hola";
            };
       
        var extedClass = M3CreateClass(classBase);
        
        var obj = new extedClass();
        
        it("extend class to be defined", function() {
            expect(obj).toBeDefined();
            expect(obj.__super__).toBeDefined();
            expect(obj.__super__).toBe(classBase);
            expect(obj.property1).toBeDefined();
            expect(obj.property1).toEqual("hola");
            expect(obj.foo).toBeDefined();
            expect(obj.foo()).toEqual("hola");
        });
    });
    
    describe("extends a simple class with constructor", function() {
        var classBase = function(){};
        classBase.prototype.property1 = "hola";
        classBase.prototype.foo = function() {
                return "hola";
            };
       
        var extedClass = M3CreateClass(classBase, function(){
            this.property2 = "chau";
        });
        
        var obj = new extedClass();
        
        it("extend class to be defined", function() {
            expect(obj).toBeDefined();
            expect(obj.__super__).toBeDefined();
            expect(obj.__super__).toBe(classBase);
            expect(obj.property1).toBeDefined();
            expect(obj.property1).toEqual("hola");
            expect(obj.foo).toBeDefined();
            expect(obj.foo()).toEqual("hola");
            expect(obj.property2).toBeDefined();
            expect(obj.property2).toEqual("chau");
        });

    });
});