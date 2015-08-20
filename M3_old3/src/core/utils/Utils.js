(function() {
    "use strict";
    M3.utils = M3.Utils || {
        getMaxValue: function(chart) {
            return (chart.data !== null) ? d3.max(chart.data, function(d) { return d[chart.config.itemValue]; }): NaN;
        },
        
        getMinValue: function(chart) {
            return (chart.data !== null) ? d3.min(chart.data, function(d) { return d[chart.config.itemValue]; }): NaN;
        }
    };
})();