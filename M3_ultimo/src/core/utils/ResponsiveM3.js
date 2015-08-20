
/**
@class ResposiveM3
*/
var ResponsiveM3 = function() {
    
    var chartList = [];
    
    this.init = function() {
        chartList = [];
    }
    
    this.add = function(chart) {
        if(ValidationM3.isM3Chart(chart)) {
            if(chartList.indexOf(chart) < 0) {
                chartList.push(chart);
            }
        }
    }
    
    this.rem = function(chart) {
        if(ValidationM3.isM3Chart(chart)) {
            var indx = chartList.indexOf(chart);
            if(indx > -1){
                chartList = chartList.splice(indx, 1);
            }
        }
    }
    
    /**
    @method resize
    @oaram chart
    */
    this.resize = function(chart) {
        chartList.forEach(function(element, index, array){
            element.resize();
        });
    }
}



