describe("dataViz test", function() {
    "use strict";
    
    it("M3.Chart reference exist", function() {
        //var a = undefined;
        expect(M3.AbstractChart).toBeDefined();
    });
    
    it("M3.Chart extends from M3.AbstractChart and M3.DataViz", function() {
        var chart = new M3.Chart();
        
        expect(chart instanceof M3.AbstractChart).toBe(true);
        expect(chart instanceof M3.DataViz).toBe(true);
    });
    
    describe("Add chart with 2 axis and column serie", function() {
        
    });
});