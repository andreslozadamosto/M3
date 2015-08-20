describe("M3 Object test", function() {
    "use strict";

    it("M3 reference have to exist", function() {
        expect(M3).toBeDefined();
    });

    it("Default properties have to exists", function() {
        expect(M3.version).toBeDefined();
        expect(M3.version).toEqual("0.5.0");
    });
    
    it("Namespaces have to exists", function(){
        expect(M3.Class).toBeDefined();
        expect(M3.Charts).toBeDefined();
        expect(M3.Axis).toBeDefined();
        expect(M3.Series).toBeDefined();
        expect(M3.Utils).toBeDefined();
        expect(M3.Behaviours).toBeDefined();
    });
});