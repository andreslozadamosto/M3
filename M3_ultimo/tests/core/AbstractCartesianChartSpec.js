describe("AbstractCartesianChart test", function() {
    "use strict";
    
    it("M3.AbstractCartesianChart reference exist", function() {
        expect(M3.AbstractCartesianChart).toBeDefined();
    });
    
    it("default config correct", function() {
        var viz = new M3.AbstractCartesianChart();
        viz.setConfig();
        
        expect(viz.config.width).toEqual(200);
        expect(viz.config.itemLabel).toEqual("label");
        expect(viz.config.itemValue).toEqual("value");
    });
});