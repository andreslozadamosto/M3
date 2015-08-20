var ValidationM3 = function() {
    this.isM3Chart = function(chart) {
        return this.isCartesianChart(chart) || this.isPolarChart(chart);
    };
    
    this.isDataViz = function(chart) {
        return chart instanceof M3.DataViz;
    }
    
    this.isCartesianChart = function(chart) {
        return this.isDataViz(chart) && chart instanceof M3.Chart;
    }
    
    this.isPolarChart = function(chart) {
        return this.isDataViz(chart) && chart instanceof M3.AbstractPolarChart;
    }
}