describe("AbstractChart test", function() {
    "use strict";
    
    it("M3.AbstractChart reference exist", function() {
        //var a = undefined;
        expect(M3.AbstractChart).toBeDefined();
    });
    
    it("M3.AbstractChart extens from M3.DataViz", function() {
        var chart = new M3.AbstractChart();
        
        expect(chart instanceof M3.DataViz).toBe(true);
    });
    
    describe("M3.AbstractChart adds new config properties", function() {
        var config = (new M3.AbstractChart()).setConfig().config;
        
        //inherit config properties
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 5", function() { expect(config.margin.top).toEqual(5); });
        it("margin.left = 5", function() { expect(config.margin.left).toEqual(5); });
        it("margin.bottom = 5", function() { expect(config.margin.bottom).toEqual(5); });
        it("margin.right = 5", function() { expect(config.margin.right).toEqual(5); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
        it("margin.canvasWidth = 190", function() { expect(config.canvasWidth).toEqual(190); });
        it("margin.canvasHeight = 90", function() { expect(config.canvasHeight).toEqual(90); });
        it("container = #chartContainer", function() { expect(config.container).toEqual("#chartContainer"); });
        
        //new properties
        it("itemValue = value", function() { expect(config.itemValue).toEqual("value"); });
        it("itemLabel = label", function() { expect(config.itemLabel).toEqual("label"); });
        it("labelFormat", function() { expect(config.labelFormat("hola")).toEqual("hola"); });
        it("valueFormat", function() { expect(config.valueFormat(3423432)).toEqual("3.423432M"); });
    });
});