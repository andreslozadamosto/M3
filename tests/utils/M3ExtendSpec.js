describe("utils/M3Exted test", function() {
    "use strict";

    it("Function exist", function() {
        expect(M3.Utils.extend).toBeDefined();
        expect(M3.Utils.extend).toEqual(jasmine.any(Function));
    });

    it("Mixing 2 objects", function() {
        var obj = M3.Utils.extend({
            prop1: "hello"
        }, {
            prop2: "bye",
            prop3: "hello2"
        });
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("hello");
        expect(obj.prop2).toBeDefined();
        expect(obj.prop2).toEqual("bye");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello2");
    });

    it("Mixing more than 2 objects", function() {
        var obj = M3.Utils.extend({
            prop1: "hello"
        }, {
            prop2: "bye",
            prop3: "hello2"
        }, {
            prop4: "bye2"
        });
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("hello");
        expect(obj.prop2).toBeDefined();
        expect(obj.prop2).toEqual("bye");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello2");
        expect(obj.prop4).toBeDefined();
        expect(obj.prop4).toEqual("bye2");
    });

    it("Mixin objects with the same property", function() {
        var obj = M3.Utils.extend({
            prop1: "hello"
        }, {
            prop1: "bye",
            prop3: "hello2"
        }, {
            prop1: "bye2"
        });
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("bye2");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello2");
    });

    it("Mixin with null and undefined params", function() {
        var obj = M3.Utils.extend(null, undefined, {
            prop1: "hello"
        }, null);
        expect(obj).toBeDefined();
        expect(obj.prop1).toEqual("hello");
    });

    it("Mixin nested objects", function() {
        var m = M3.Utils.extend({
            a: "hello",
            c: {
                d: "pepe",
                f: "foo"
            }
        }, {
            b: "andrew",
            a: "bye",
            c: {
                d: "esteban",
                e: "hoho"
            }
        });
        expect(m).not.toBe(null);
        expect(m).toBeDefined();
        expect(m.a).toBeDefined();
        expect(m.a).toEqual("bye");
        expect(m.b).toBeDefined();
        expect(m.b).toEqual("andrew");

        expect(m.c).toBeDefined();
        expect(m.c.d).toBeDefined();
        expect(m.c.d).toEqual("esteban");
        expect(m.c.e).toBeDefined();
        expect(m.c.e).toEqual("hoho");

        expect(m.c.f).toBeDefined();
        expect(m.c.f).toEqual("foo");
    });
})