describe("DataViz Object test", function() {
    "use strict";

    it("DataViz reference exist", function() {
        expect(M3.DataViz).toBeDefined();
    });
    
    describe("default config", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig().config;
        
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 5", function() { expect(config.margin.top).toEqual(5); });
        it("margin.left = 5", function() { expect(config.margin.left).toEqual(5); });
        it("margin.bottom = 5", function() { expect(config.margin.bottom).toEqual(5); });
        it("margin.right = 5", function() { expect(config.margin.right).toEqual(5); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
        it("margin.canvasWidth = 190", function() { expect(config.canvasWidth).toEqual(190); });
        it("margin.canvasHeight = 190", function() { expect(config.canvasHeight).toEqual(190); });
        it("container = #chartContainer", function() { expect(config.container).toEqual("#chartContainer"); });
        it("resize = fixed", function() { expect(config.resize).toEqual("fixed"); });
        it("aspectRatio = 1", function() { expect(config.aspectRatio).toEqual(1); });
    });
})