describe("dataViz test", function() {
    "use strict";
    
    it("M3.DataViz reference exist", function() {
        //var a = undefined;
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
    
    describe("default config with margin.all = 10", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig({margin:{all: 10}}).config;
        
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 10", function() { expect(config.margin.left).toEqual(10); });
        it("margin.bottom = 10", function() { expect(config.margin.bottom).toEqual(10); });
        it("margin.right = 10", function() { expect(config.margin.right).toEqual(10); });
        it("margin.all = 10", function() { expect(config.margin.all).toEqual(10); });
        it("margin.canvasWidth = 180", function() { expect(config.canvasWidth).toEqual(180); });
        it("margin.canvasHeight = 180", function() { expect(config.canvasHeight).toEqual(180); });
    });
    
    describe("config set margin.top = 10", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig({margin:{top: 10}}).config;
        
        it("with = 200", function() { expect(config.width).toEqual(200); });
        it("height = 100", function() { expect(config.height).toEqual(100); });
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 5", function() { expect(config.margin.left).toEqual(5); });
        it("margin.bottom = 5", function() { expect(config.margin.bottom).toEqual(5); });
        it("margin.right = 5", function() { expect(config.margin.right).toEqual(5); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
        it("margin.canvasWidth = 190", function() { expect(config.canvasWidth).toEqual(190); });
        it("margin.canvasHeight = 185", function() { expect(config.canvasHeight).toEqual(185); });
    });
    
    describe("set width=400 and heigh=200", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig({width:400, height:200}).config;
        it("with = 400", function() { expect(config.width).toEqual(400); });
        it("height = 200", function() { expect(config.height).toEqual(200); });
        it("margin.canvasWidth = 390", function() { expect(config.canvasWidth).toEqual(390); });
        it("margin.canvasHeight = 190", function() { expect(config.canvasHeight).toEqual(190); });
        it("margin.aspectRatio = 0.5", function() { expect(config.aspectRatio).toEqual(0.5); });
    });
    
    describe("set margins to 10,20,30,40", function() {
        var dataViz = new M3.DataViz();
        var config = dataViz.setConfig({margin:{top:10, left:20, bottom:30, right:40}}).config;
        it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
        it("margin.left = 20", function() { expect(config.margin.left).toEqual(20); });
        it("margin.bottom = 30", function() { expect(config.margin.bottom).toEqual(30); });
        it("margin.right = 40", function() { expect(config.margin.right).toEqual(40); });
        it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
        it("margin.canvasWidth = 140", function() { expect(config.canvasWidth).toEqual(140); });
        it("margin.canvasHeight = 160", function() { expect(config.canvasHeight).toEqual(160); });
    });
    
    describe("add elements to dom", function() {
        
        var container = null;
        var viz = null;
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

        it("svg & svg>g>rect.background exist and has correct config", function() {
            var svgContainer = $("#chartContainer svg");
            expect(svgContainer).toBeDefined();
            expect(svgContainer.length).toEqual(1);
            expect(svgContainer.css("width")).toEqual(viz.config.width + "px");
            expect(svgContainer.css("height")).toEqual(viz.config.height + "px");
            expect(svgContainer.attr("class")).toEqual(viz.config.styles.container);
            
            var svgContainerBackground = $("#chartContainer svg > rect");
            expect(svgContainerBackground).toBeDefined();
            expect(svgContainerBackground.length).toEqual(1);
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.width.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.height.toString());
            expect(svgContainerBackground.attr("class")).toEqual("background");
        });
        
        it("svg>g.canvas & svg>g.canvas>rect exist and has correct config", function() {
            var svgCanvas = $("#chartContainer svg > g.canvas");
        
            expect(svgCanvas).toBeDefined();
            expect(svgCanvas.length).toEqual(1);
            expect(svgCanvas.attr("class")).toEqual(viz.config.styles.canvas);
            expect(svgCanvas.attr("transform")).toEqual("translate(" + viz.config.margin.top + ", " + viz.config.margin.left + ")");
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            
            var svgContainerBackground = $("#chartContainer svg > g.canvas > rect");
            expect(svgContainerBackground).toBeDefined();
            expect(svgContainerBackground.length).toEqual(1);
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.canvasHeight.toString());
            expect(svgContainerBackground.attr("class")).toEqual("background");
            
        });
        
        it("No data to display Msj", function(){
            var txt = $("#chartContainer svg > g.canvas ." + viz.config.styles.nodatatext);
            expect(txt).toBeDefined();
            expect(txt[0]).toBeDefined();
            expect(txt[0].textContent).toEqual("There is no data to display");    
        });
        
        it("Dont show msj with no data", function() {
            $("#chartContainer").html('');
            viz.setData([{}]);
            viz.draw();
            var txt = $("#chartContainer svg > g.canvas ." + viz.config.styles.nodatatext);
            expect(txt).toBeDefined();
            expect(txt[0]).not.toBeDefined();
        });
    });
    
    describe("add elements to dom with more margin", function() {
        var container = null;
        var viz = null;
        beforeEach(function() {
            container = document.createElement("div");
            container.innerHTML = "<div id=\"chartContainer\"></div>";
            document.body.appendChild(container);
            viz = new M3.DataViz();
            viz.draw(null, {margin:{top:10, left:20, bottom:30, right:40}});
        });
        afterEach(function() {
            document.body.removeChild(container);
        });
        
        it("svg>g.canvas && svg>g.canvas>rect exist and has correct config with more margin", function() {
            var svgCanvas = $("#chartContainer svg > g.canvas");
            
            var config = viz.config;
            it("margin.top = 10", function() { expect(config.margin.top).toEqual(10); });
            it("margin.left = 20", function() { expect(config.margin.left).toEqual(20); });
            it("margin.bottom = 30", function() { expect(config.margin.bottom).toEqual(30); });
            it("margin.right = 40", function() { expect(config.margin.right).toEqual(40); });
            it("margin.all = NaN", function() { expect(config.margin.all).toEqual(NaN); });
            it("margin.canvasWidth = 140", function() { expect(config.canvasWidth).toEqual(140); });
            it("margin.canvasHeight = 160", function() { expect(config.canvasHeight).toEqual(160); });
            
            expect(svgCanvas).toBeDefined();
            expect(svgCanvas.length).toEqual(1);
            expect(svgCanvas.attr("class")).toEqual(viz.config.styles.canvas);
            expect(svgCanvas.attr("transform")).toEqual("translate(" + viz.config.margin.left + ", " + viz.config.margin.top + ")");
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            
            var svgContainerBackground = $("#chartContainer svg > g.canvas > rect");
            expect(svgContainerBackground).toBeDefined();
            expect(svgContainerBackground.length).toEqual(1);
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.canvasHeight.toString());
            expect(svgContainerBackground.attr("class")).toEqual("background");
            
        });
    });

    describe("Auto get the width and height of the container", function() {
        var container = null;
        var viz = null;
        beforeEach(function() {
            container = document.createElement("div");
            container.innerHTML = "<div id=\"chartContainer\" style=\"width:400px; height:100px;\"></div>";
            document.body.appendChild(container);
            viz = new M3.DataViz();
            viz.draw(null, {margin:{top:10,left:10, bottom:10}});
        });
        afterEach(function() {
            document.body.removeChild(container);
        });
    
        it("with = 400", function() {  expect(viz.config.width).toEqual(400); });
        it("height = 100", function() { expect(viz.config.height).toEqual(100); });
        it("margin.canvasWidth = 385", function() { expect(viz.config.canvasWidth).toEqual(385); });
        it("margin.canvasHeight = 80", function() { expect(viz.config.canvasHeight).toEqual(80); });
        it("aspectRatio = " + (100/400), function() { expect(viz.config.aspectRatio).toEqual(100/400); });

    });

    describe("resize", function() {
        var container = null;
        var viz = null;
        beforeEach(function() {
            container = document.createElement("div");
            container.innerHTML = "<div id=\"chartContainer\" style=\"width:450; height:150;\"></div>";
            document.body.appendChild(container);
            viz = new M3.DataViz();
            viz.draw(null, {margin:{all:5}});
        });
        afterEach(function() {
            document.body.removeChild(container);
        });
        it("manual change of container/chart size", function () {
            var chartContainer = $("#chartContainer");
            chartContainer.css("width", 540).css("height", 270);
            viz.resize(540,270);

            //check if config change
            it("with = 540", function() { expect(config.width).toEqual(540); });
            it("height = 270", function() { expect(config.height).toEqual(270); });
            it("margin.canvasWidth = 530", function() { expect(config.canvasWidth).toEqual(530); });
            it("margin.canvasHeight = 260", function() { expect(config.canvasHeight).toEqual(260); });
            it("aspectRatio = " + (270/540), function() { expect(viz.config.aspectRatio).toEqual(270/540); });
            
            //check de new size of svg and its rec background
            var svgContainer = $("#chartContainer svg");
            expect(svgContainer.css("width")).toEqual(viz.config.width + "px");
            expect(svgContainer.css("height")).toEqual(viz.config.height + "px");
            var svgContainerBackground = $("#chartContainer svg > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.width.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.height.toString());

            //check de new size of canvas and its rec background
            var svgCanvas = $("#chartContainer svg > g.canvas");
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            var svgContainerBackground = $("#chartContainer svg > g.canvas > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.canvasHeight.toString());
        });
        
        it("auto resize to fit with the container when I call resize function", function () {
            var chartContainer = $("#chartContainer");
            chartContainer.css("width", 600).css("height", 400);
            viz.resize();

            //check if config change
            it("with = 600", function() { expect(config.width).toEqual(600); });
            it("height = 400", function() { expect(config.height).toEqual(400); });
            it("margin.canvasWidth = 590", function() { expect(config.canvasWidth).toEqual(590); });
            it("margin.canvasHeight = 390", function() { expect(config.canvasHeight).toEqual(390); });
            it("aspectRatio = " + (390/590), function() { expect(viz.config.aspectRatio).toEqual(390/590); });
            
            //check de new size of svg and its rec background
            var svgContainer = $("#chartContainer svg");
            expect(svgContainer.css("width")).toEqual(viz.config.width + "px");
            expect(svgContainer.css("height")).toEqual(viz.config.height + "px");
            var svgContainerBackground = $("#chartContainer svg > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.width.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.height.toString());

            //check de new size of canvas and its rec background
            var svgCanvas = $("#chartContainer svg > g.canvas");
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            var svgContainerBackground = $("#chartContainer svg > g.canvas > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.canvasHeight.toString());
        });
        
        if("auto resize mainteining aspectRatio", function () {
            viz.config({resize:"ratio"});
            var chartContainer = $("#chartContainer");
            chartContainer.css("width", 1000);
            viz.resize();
            var h = (1000*viz.config.aspectRatio);
            //check if config change
            it("with = 1000", function() { expect(config.width).toEqual(1000); });
            it("height = " + h, function() { expect(config.height).toEqual(h); });
            it("margin.canvasWidth = 590", function() { expect(config.canvasWidth).toEqual(590); });
            it("margin.canvasHeight = 390", function() { expect(config.canvasHeight).toEqual(390); });
            
            //check de new size of svg and its rec background
            var svgContainer = $("#chartContainer svg");
            expect(svgContainer.css("width")).toEqual(viz.config.width + "px");
            expect(svgContainer.css("height")).toEqual(h + "px");
            var svgContainerBackground = $("#chartContainer svg > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.width.toString());
            expect(svgContainerBackground.attr("height")).toEqual(h.toString());

            //check de new size of canvas and its rec background
            var svgCanvas = $("#chartContainer svg > g.canvas");
            expect(svgCanvas.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgCanvas.attr("height")).toEqual(viz.config.canvasHeight.toString());
            var svgContainerBackground = $("#chartContainer svg > g.canvas > rect");
            expect(svgContainerBackground.attr("width")).toEqual(viz.config.canvasWidth.toString());
            expect(svgContainerBackground.attr("height")).toEqual(viz.config.canvasHeight.toString());
        });
    });

});