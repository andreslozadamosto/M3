(function() {
    "use strict";
    
    M3.behaviours = M3.behaviours || {};
    
    var resizeClas = function(){
        var chartList = [];
        this.add = function(chart) {
            if(chartList.indexOf(chart) < 0) {
                chartList.push(chart);
            }
        }
        this.rem = function(chart) {
            var indx = chartList.indexOf(chart);
            if(indx > -1) {
                chartList = chartList.splice(indx, 1);
            }
        }
        this.resize = function() {
            chartList.forEach(function(element, index, array){
                if(element["resize"] !== undefined && element["resize"] !== null) {
                    element.resize();
                }
            });
        }
    };
    
    M3.behaviours.Responsive = function(conf) {
        if(this.initialize === undefined || this.initialize === null) {
            this.initialize = true;
            this.resizeImpl = new resizeClas();
            
            this.run = function(chart) {
                console.log("Responsive running");
                this.resizeImpl.add(chart);
            }
            
            this.onResize = function() {
                console.log("onresize");
                this.resizeImpl.resize();
            }
            
            this.init = function() {
                d3.select(window).on("resize", this.onResize);
            };
            
            this.init();
            
            
            
        }
    };
})();