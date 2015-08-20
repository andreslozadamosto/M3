//-------------------------------
// DataViz Module
//-------------------------------
(function(exampleItem, defaults){
    
    var chart = null;
    //------------------------------
    // Draw Chart
    //------------------------------
    function draw() {
        
        if(!chart) {
            //$("#chartContainer").html("<div id=\"chart\" style=\"width:100%; height:95%;\"></div><button id=\"resize\" style=\"height:5%; padding:0px;\">resize</button>");
            $("#chartContainer").append("<div id=\"chart\" style=\"width:100%; height:95%;\"></div>").trigger($.Event('resize'));
            $("#chartContainer").append("<button id=\"resize\" style=\"height:5%; padding:0px;\"> resize </button>");
            $("#chartContainer").append("<button id=\"clear\" style=\"height:5%; padding:0px;\"> clear </button>");
            $("#chartContainer").append("<button id=\"remove\" style=\"height:5%; padding:0px;\"> remove </button>");
            $("#chartContainer").append("<button id=\"redraw\" style=\"height:5%; padding:0px;\"> redraw </button>");
            chart = new M3.DataViz();
            
            $("#resize").on("click", function(){
                if(chart) chart.resize(400,300);
            });
            
            $("#clear").on("click", function(){
                if(chart) chart.clear();
            });
                            
            $("#remove").on("click", function(){
                if(chart) {
                    chart.remove();
                    chart = null;
                }
            });
            $("#redraw").on("click", function(){
                if(chart) {
                    chart.remove();
                    chart = null;
                }
                chart = new M3.DataViz();
                chart.setConfig({container:"#chart"}).draw();
            });
            
        }
        chart.setConfig({container:"#chart"}).draw();

        
    }
    //------------------------------
    // Register as example
    //------------------------------
    exampleItem.add("Simple DataViz", draw);
    
})(Examples.DataViz, Defaults);