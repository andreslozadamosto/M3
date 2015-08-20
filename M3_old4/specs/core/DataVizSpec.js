describe("Exted function test", function() {
    "use strict";
    
    
    it("M3.DataViz reference exist", function() {
        //var a = undefined;
        expect(M3.DataViz).toBeDefined();
    });
    
    describe("config default", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.getConfig();
        
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 5", function() { expect(config.margin.top).toEqual(5); });
        it("margin.left = 5", function() { expect(config.margin.left).toEqual(5); });
        it("margin.bottom = 5", function() { expect(config.margin.bottom).toEqual(5); });
        it("margin.right = 5", function() { expect(config.margin.right).toEqual(5); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
    });
    
    describe("config set margin.all = 10", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.getConfig({margin:{all: 10}});
        
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 10", function() { expect(config.margin.left).toEqual(10); });
        it("margin.bottom = 10", function() { expect(config.margin.bottom).toEqual(10); });
        it("margin.right = 10", function() { expect(config.margin.right).toEqual(10); });
        it("margin.all = 10", function() { expect(config.margin.all).toEqual(10); });
    });
    
    describe("set width=400 and heigh=200", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.getConfig({width:400, height:200});
         it("with = 400", function() { expect(config.width).toEqual(400); });
        it("height = 200", function() { expect(config.height).toEqual(200); });
    });
    
    describe("set margins to 10,20,30,40", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.getConfig({margin:{top:10, left:20, bottom:30, right:40}});
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 20", function() { expect(config.margin.left).toEqual(20); });
        it("margin.bottom = 30", function() { expect(config.margin.bottom).toEqual(30); });
        it("margin.right = 40", function() { expect(config.margin.right).toEqual(40); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
    });
});