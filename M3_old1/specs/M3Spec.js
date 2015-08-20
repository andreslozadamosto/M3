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
    });
});