describe("utils/M3Class test", function() {
    "use strict";

    function createBaseClass() {
        var BaseClass = function() {}
        BaseClass.prototype.property1 = "hello";
        BaseClass.prototype.foo = function() {
            return "bye";
        };
        return BaseClass;
    }

    it("Function exist", function() {
        expect(M3.Utils.class).toBeDefined();
        expect(M3.Utils.class).toEqual(jasmine.any(Function));
    });

    describe("Extends a simple class", function() {
        var BaseClass = createBaseClass();
        var ExtendedClass = M3.Utils.class("ExtendedClass", BaseClass);

        var obj = new ExtendedClass();

        it("Object of extended class has all properties", function() {
            expect(obj).toBeDefined();
            expect(obj.__super__).toBeDefined();
            expect(obj.__super__).toBe(BaseClass);
            expect(obj.property1).toBeDefined();
            expect(obj.property1).toEqual("hello");
            expect(obj.foo).toBeDefined();
            expect(obj.foo()).toEqual("bye");
        });
    });

    describe("Extends a class and define a constructor function", function() {
        var BaseClass = createBaseClass();
        var ExtendedClass = M3.Utils.class("ExtendedClass", BaseClass, function() {
            this.property2 = "Hello2";
            this.foo2 = function() {
                return "Bye2";
            };
        });

        var obj = new ExtendedClass();
        it("Object of extended class has all properties", function() {
            expect(obj).toBeDefined();
            expect(obj.__super__).toBeDefined();
            expect(obj.__super__).toBe(BaseClass);
            expect(obj.property1).toBeDefined();
            expect(obj.property1).toEqual("hello");
            expect(obj.foo).toBeDefined();
            expect(obj.foo()).toEqual("bye");
            expect(obj.property2).toBeDefined();
            expect(obj.property2).toEqual("Hello2");
            expect(obj.foo2).toBeDefined();
            expect(obj.foo2()).toEqual("Bye2");
        });
    });
})