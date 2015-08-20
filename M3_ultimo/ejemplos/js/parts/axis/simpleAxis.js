//-------------------------------
// Simple ColumnChart Module
//-------------------------------
(function(exampleItem, defaults){
    
    function getChartConfig() {
        var conf = {
            //height: 100
            margin: { all:5 }
        };
        
        return conf;
    }
    
    function getData() {
        var data = {};
        
        return data;
    }
    //------------------------------
    // Draw Chart
    //------------------------------
    function draw() {
        //var chart = new M3.DataViz();
        //chart.draw(getData(), getChartConfig());
        //$(window).on('resize', function(){ if(chart) { chart.resize(); }});
        var html = "<svg class=\"m3\" width=\"750\" height=\"800\">";
        html += "<g class=\"canvas\" transform=\"translate(5, 5)\" width=\"750\" height=\"800\"></g>";
        html += "<svg";
        $("#chartContainer").html(html);
        var canvas = d3.select("#chartContainer .canvas");
        var data = [{label:"A", value:43}, {label:"B", value:67}, {label:"C", value:98}];
        
        //////////////////////////////////////////
        // LINEAL AXIS
        //////////////////////////////////////////
        //Default conf
        var linealAxis = new M3.Axis.LinealAxis();
        var config = {width:20};
        config.label = "Default conf";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 40, 10);        
        
        //default conf + right position
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"right"};
        config.label = "Right position";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 60, 10); 
        
        //defatul + fixed ticks
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"right", fixedTicks:3};
        config.label = "Fixed number of ticks (3)";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 100, 10); 
        
        //default + ticks by d3
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", ticks:4};
        config.label = "Ticks by d3 (4) - auto calculated";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 180, 10); 
        
        //default + inner labelposition
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", labelPosition:"inner"};
        config.label = "Inner label";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 220, 10); 
        
        //default + tickFormat
        var format = function(d) {
            return d3.format("04d")(d);
        }
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", tickFormat:d3.format("04d"), tickPadding: 10, labelPosition:"inner"};
        config.label = "Label Format + tick padding";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 280, 10); 
        
        //default + tickValues
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", tickValues:[10,50, 100]};
        config.label = "Tick values";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 340, 10); 
        
        //useNiceValues = false
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", useNiceValues:false};
        config.label = "Nice values: false";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 380, 10); 
        
        //min & max values
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", minValue:10, maxValue:116};
        config.label = "max & Min values";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 420, 10); 
        
        //fitToZero: false
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", fitToZero:false, };
        config.label = "Fit to Zero = false";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 470, 10); 
        
        //fitToZero: false & useNiceValues = false
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left", fitToZero:false, useNiceValues:false };
        config.label = "Fit to Zero = false  & useNiceValues = false";
        linealAxis.canvas(canvas).config(config).data(data).draw(40, 200, 520, 10);
        
        //negative values
        var dataNeg = [{label:"A", value:-43}, {label:"B", value:67}, {label:"C", value:98}];
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"left" };
        config.label = "";
        linealAxis.canvas(canvas).config(config).data(dataNeg).draw(40, 200, 740, 10); 
        
        linealAxis = new M3.Axis.LinealAxis();
        config = {width:20, pos:"bottom" };
        config.label = "Lineal Axis horizontal";
        linealAxis.canvas(canvas).config(config).data(data).draw(200, 20, 10, 470);
        
        //////////////////////////////////////////
        // Category AXIS
        //////////////////////////////////////////
        var categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"Default conf top", pos:"top"}).data(data).draw(500, 20, 10, 270);
        
        categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"Default conf bottom", pos:"bottom"}).data(data).draw(500, 20, 10, 280);
        
        categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"Vertical Category Axis", pos:"left"}).data(data).draw(40, 200, 580, 10);
        
        categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"LabelPosition inner", pos:"bottom", labelPosition:"inner"}).data(data).draw(500, 20, 10, 330);
        
        var f = function(d) { return "+" + d; };
        var data2 = [{label:"Nueva Zelanda", value:43}, {label:"Nueva Guinea", value:67}, {label:"Islas Sandwich del Sur", value:98}];
        categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"TickFormat", pos:"bottom", tickFormat:f, width:35}).data(data2).draw(300, 20, 10, 360);
        
        categoryAxis = new M3.Axis.CategoryAxis();
        categoryAxis.canvas(canvas).config({label:"Vertical Category Axis", pos:"left", labelPosition:"inner", width:60}).data(data2).draw(40, 200, 650, 10);
        
        //////////////////////////////////////////
        // Category AXIS Points
        //////////////////////////////////////////
        var categoryAxisPoints = new M3.Axis.CategoryPointsAxis();
        categoryAxisPoints.canvas(canvas).config({label:"Category Axis Points", pos:"bottom", width:35}).data(data2).draw(200, 20, 10, 410);
        
        categoryAxisPoints = new M3.Axis.CategoryPointsAxis();
        categoryAxisPoints.canvas(canvas).config({label:"Category Axis Points", pos:"left", labelPosition:"inner"}).data(data).draw(40, 200, 690, 10);
    }
    //------------------------------
    // Register as example
    //------------------------------
    exampleItem.add("Simple Axis", draw);
    
})(Examples.Axis, Defaults);
