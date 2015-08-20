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
        var data = [];
        
        return data;
    }
    //------------------------------
    // Draw Chart
    //------------------------------
    function draw() {
        /*var chart = new M3.DataViz();
        chart.draw(getData(), getChartConfig());
        $(window).on('resize', function(){ if(chart) { chart.resize(); }});*/
                                            
    }
    //------------------------------
    // Register as example
    //------------------------------
    exampleItem.add("Simple Column Chart", draw);
    
})(Examples.Column, Defaults);