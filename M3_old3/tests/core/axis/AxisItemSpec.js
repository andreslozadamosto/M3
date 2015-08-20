describe("M3 Object test", function() {
    "use strict";
    
    it("M3 reference exist", function() {
        //var a = undefined;
        expect(M3.AxisItem).toBeDefined();
    });
    
    describe("Add Axis", function() {
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
    });
});

