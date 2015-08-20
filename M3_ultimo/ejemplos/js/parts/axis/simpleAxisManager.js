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
        
        $("#chartContainer").append("<div id=\"chart\" style=\"width:100%; height:95%;\"></div>");
        $("#chartContainer").append("<button id=\"resize\" style=\"height:5%; padding:0px;\"> resize </button>");
        $("#chartContainer").append("<button id=\"clear\" style=\"height:5%; padding:0px;\"> clear </button>");
        $("#chartContainer").append("<button id=\"remove\" style=\"height:5%; padding:0px;\"> remove </button>");
        $("#chartContainer").append("<button id=\"redraw\" style=\"height:5%; padding:0px;\"> redraw </button>");
        var html = "<svg class=\"m3\" width=\"500\" height=\"300\">";
        html += "<g class=\"canvas\" transform=\"translate(5, 5)\" width=\"490\" height=\"290\"></g>";
        html += "<svg";
        $("#chart").html(html);
        var canvas = d3.select("#chartContainer .canvas");
        var data = [{label:"A", value:43}, {label:"B", value:67}, {label:"C", value:98}];
        
        var manager = new M3.Axis.AxisManager();
        var config = {};
        config.canvasHeight = 290;
        config.canvasWidth = 490;
        config.container = ".m3";
        config.axis = [
            {pos:"left", label:"hola"}, 
            {pos:"bottom", label:"adas"}, 
            {pos:"right", label:"right"},
            {pos:"top", label:"addddas"}]
        
        manager.setConfig(config).setData(data).show();
        
        
        
        $("#resize").on("click", function(){
            var conf = M3.extend(config, {
                                        canvasHeight: 100,
                                        canvasWidth: 200
                                        });
            if(manager) manager.resize(conf);
        });

        $("#clear").on("click", function(){
            if(manager) manager.clear();
        });

        $("#remove").on("click", function(){
            if(manager) {
                manager.remove();
                manager = null;
            }
        });
        $("#redraw").on("click", function(){
            if(manager) {
                manager.remove();
                manager = null;
            }
            manager.setConfig(config).setData(data).show();
        });
    }
    //------------------------------
    // Register as example
    //------------------------------
    exampleItem.add("Simple AxisManager", draw);
    
})(Examples.Axis, Defaults);