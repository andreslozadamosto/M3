describe("Exted function test", function() {
    "use strict";
    
    it("Extend funcition to be defined", function() {
       expect(M3Exted).toBeDefined();
    });
    
    it("It mixing 2 objects", function() {
        var obj = M3Exted({prop1:"hola"}, {prop2:"chau", prop3:"hello"});
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("hola");
        expect(obj.prop2).toBeDefined();
        expect(obj.prop2).toEqual("chau");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello");
    });
    
    it("mixing more than 2 objects", function() {
        var obj = M3Exted({prop1:"hola"}, {prop2:"chau", prop3:"hello"}, {prop4:"bye"});
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("hola");
        expect(obj.prop2).toBeDefined();
        expect(obj.prop2).toEqual("chau");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello");
        expect(obj.prop4).toBeDefined();
        expect(obj.prop4).toEqual("bye");
    });
    
    it("mixin objects with the same property", function() {
        var obj = M3Exted({prop1:"hola"}, {prop1:"chau", prop3:"hello"}, {prop1:"bye"});
        expect(obj).toBeDefined();
        expect(obj.prop1).toBeDefined();
        expect(obj.prop1).toEqual("bye");
        expect(obj.prop3).toBeDefined();
        expect(obj.prop3).toEqual("hello");
    });
    
    it("mixin with null and undefined params", function() {
        var obj = M3Exted(null, undefined, {prop1:"hello"}, null);
        expect(obj).toBeDefined();
        expect(obj.prop1).toEqual("hello");
    });
    
    it("extend with deepth", function() {
        var m = M3Exted({a:"hola", c:{d:"lozada", f:"foo"}}, {b:"andres", a:"chau", c:{d:"esteban", e:"mosto"}});
        expect(m).not.toBe(null);
        expect(m).toBeDefined();
        expect(m.a).toBeDefined();
        expect(m.a).toEqual("chau");
        expect(m.b).toBeDefined();
        expect(m.b).toEqual("andres");
        
        expect(m.c).toBeDefined();
        expect(m.c.d).toBeDefined();
        expect(m.c.d).toEqual("esteban");
        expect(m.c.e).toBeDefined();
        expect(m.c.e).toEqual("mosto");
        
        expect(m.c.f).toBeDefined();
        expect(m.c.f).toEqual("foo");
    });
});