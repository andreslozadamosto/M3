describe("M3 Object test", function() {
    "use strict";

    it("M3 reference exist", function() {
        expect(M3).toBeDefined();
    });

    it("Default properties exists", function() {
        expect(M3.version).toBeDefined();
        expect(M3.version).toEqual("0.6.0");

        expect(M3.Charts).toBeDefined();
        expect(M3.Axis).toBeDefined();
        expect(M3.Series).toBeDefined();
        expect(M3.Utils).toBeDefined();
    });
})