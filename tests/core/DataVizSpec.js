describe("dataViz test", function() {
    "use strict";
    
    it("M3.DataViz reference exist", function() {
        //var a = undefined;
        expect(M3.DataViz).toBeDefined();
    });
    
    describe("config default", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig().config;
        
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
        var config = dataViz.setConfig({margin:{all: 10}}).config;
        
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
        var config = dataViz.setConfig({width:400, height:200}).config;
        it("with = 400", function() { expect(config.width).toEqual(400); });
        it("height = 200", function() { expect(config.height).toEqual(200); });
    });
    
    describe("set margins to 10,20,30,40", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig({margin:{top:10, left:20, bottom:30, right:40}}).config;
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 20", function() { expect(config.margin.left).toEqual(20); });
        it("margin.bottom = 30", function() { expect(config.margin.bottom).toEqual(30); });
        it("margin.right = 40", function() { expect(config.margin.right).toEqual(40); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
    });
    
    describe("add elements to dom", function() {
        
        var container = null;
        var viz;
        beforeEach(function() {
            container = document.createElement("div");
            container.innerHTML = "<div id=\"chartContainer\"></div>";
            document.body.appendChild(container);
            viz = new M3.DataViz();
            viz.draw();
        });
        afterEach(function() {
            document.body.removeChild(container);
        });

        it("svg container exist and has correct config", function() {
            var svgContainer = $("#chartContainer svg");
            expect(svgContainer).toBeDefined();
            expect(svgContainer.length).toEqual(1);
            expect(svgContainer.css("width")).toEqual(viz.config.width + "px");
            expect(svgContainer.css("height")).toEqual(viz.config.height + "px");
            expect(svgContainer.attr("class")).toEqual(viz.config.styles.container);
        });
        
        it("svg canvas exist and has correct config", function() {
            var svgCanvas = $("#chartContainer svg g");
        
            expect(svgCanvas).toBeDefined();
            expect(svgCanvas.length).toEqual(1);
            expect(svgCanvas.attr("class")).toEqual(viz.config.styles.canvas);
            expect(svgCanvas.attr("transform")).toEqual("translate(" + viz.config.margin.top + ", " + viz.config.margin.left + ")");
            
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            
        });
    });
});