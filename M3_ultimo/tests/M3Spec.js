describe("M3 Object test", function() {
    "use strict";
    it("M3 reference exist", function() {
        //var a = undefined;
        expect(M3).toBeDefined();
    });
    
    describe("has defult members", function() {
        it("has createClass member", function() {
            expect(M3.createClass).toBeDefined();
        });
        it("has extend member", function(){
            expect(M3.extend).toBeDefined();
        });
        
        it("has mixin member", function(){
            expect(M3.mixin).toBeDefined();
        });
        
        it("has axis member", function() {
            expect(M3.Axis).toBeDefined();
        });
        
        it("has Series member", function() {
            expect(M3.Series).toBeDefined();
        });
    });
});