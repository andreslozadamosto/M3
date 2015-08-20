describe("M3 Object test", function() {
    "use strict";
    
    it("M3.Axis.AxisItem reference exist", function() {
        //var a = undefined;
        expect(M3.Axis.AxisItem).toBeDefined();
    });
    
    describe("Axis test", function(){
       var container = null;
        var axis = null;
        beforeEach(function() {
            container = document.createElement("div");
            var html = "";
            html += "<div id=\"chartContainer\">";
            html += "<svg class=\"m3\" width=\"350\" height=\"198\">";
            html += "<g class=\"canvas\" transform=\"translate(5, 5)\" width=\"340\" height=\"188\"></g>";
            html += "<svg";
            html += "</div>";
            container.innerHTML = html;
            document.body.appendChild(container);
            axis = new M3.Axis.AxisItem();
        });
        afterEach(function() {
            document.body.removeChild(container);
        });
        
        it("Axis default configuration", function() {
            expect(axis._config).toBeDefined();
            expect(axis._config.pos).toEqual("left");
            expect(axis._config.label).toEqual("");
            expect(axis._config.labelPosition).toEqual("outer");
            expect(axis._config.serie).toEqual("value");
            expect(axis._config.show).toEqual(true);
            expect(axis._config.labelWidth).toEqual(18);
            expect(axis._config.clazz).toEqual("Axis.LinealAxis");
            expect(axis._config.outerTickSize).toEqual(NaN);
            expect(axis._config.innerTickSize).toEqual(NaN);
            expect(axis._config.tickPadding).toEqual(NaN);
            expect(axis._config.axis).toEqual("y");
            expect(axis._config.width).toEqual(35);
        });
    });
    
    
    /*describe("Add Axis", function() {
        var container = null;
        var axis = null;
        beforeEach(function() {
            container = document.createElement("div");
            var html = "";
            html += "<div id=\"chartContainer\">";
            html += "<svg class=\"m3\" width=\"350\" height=\"198\">";
            html += "<g class=\"canvas\" transform=\"translate(5, 5)\" width=\"340\" height=\"188\"></g>";
            html += "<svg";
            html += "</div>";
            container.innerHTML = html;
            document.body.appendChild(container);
            axis = new M3.AxisItem;
            
            var config = {};
            config.pos = "botom";
            config.label = "hola";
            config.labelPosition = "outer";

            config.serie = "label";
            config.width = 35;
            config.show = true;
            config.labelWidth = 18;

            config.clazz = "LinealAxis";
            config.tickSize = NaN;
            config.tickPadding = NaN;
            config.axis = "x";
            config.tickFormat = function (d) { return d; };
            var data = [{label:"A", value:43}, {label:"B", value:67}, {label:"C", value:98}];
            var w = 300, h = 20, x = 10, y = 100;
            axis.canvas(d3.select("#chartContainer .canvas")).config(conf).data(data).draw(w, h, x, y);
        });

        afterEach(function() {
            document.body.removeChild(container);
        });
        
        it("axis added", function() {
            
        });
    });*/
});

