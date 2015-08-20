describe("Exted function test", function() {
    "use strict";
    
    it("simple mixin", function() {
        var m = M3Mixin({a:"hola"});
        expect(m).not.toBe(null);
        expect(m).toBeDefined();
        expect(m.a).toBeDefined();
        expect(m.a).toEqual("hola");
    });
    
    it("mixin 2 objects with override", function() {
        var m = M3Mixin({a:"hola"}, {b:"andres", a:"chau"});
        expect(m).not.toBe(null);
        expect(m).toBeDefined();
        expect(m.a).toBeDefined();
        expect(m.a).toEqual("hola");
        expect(m.b).toBeDefined();
        expect(m.b).toEqual("andres");
    });
    
    it("mixin 2 objects deepth", function() {
        var m = M3Mixin({a:"hola", c:{d:"lozada"}}, {b:"andres", a:"chau", c:{d:"esteban", e:"mosto"}});
        expect(m).not.toBe(null);
        expect(m).toBeDefined();
        expect(m.a).toBeDefined();
        expect(m.a).toEqual("hola");
        expect(m.b).toBeDefined();
        expect(m.b).toEqual("andres");
        
        expect(m.c).toBeDefined();
        expect(m.c.d).toBeDefined();
        expect(m.c.d).toEqual("lozada");
        expect(m.c.e).toBeDefined();
        expect(m.c.e).toEqual("mosto");
    });
    
});