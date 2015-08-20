describe("M3 namespace Test", function() {
    "use strict";

    it("M3 namespace have to exist", function() {
        expect(M3).toBeDefined();
    });

    it("M3 have the correct number version on the property 'version'", function() {
        expect(M3.version).toBeDefined();
        expect(M3.version).toEqual("1.0.0");
    });

    describe("Sub-namespaces have to defined", function() { 
        it("Core sub-namespace have to exist", function() {
            expect(M3.Core).toBeDefined();
        });

        it("Utils sub-namespace have to exist", function() {
            expect(M3.Utils).toBeDefined();
        });
    });
});
