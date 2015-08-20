(function() {
    "use strict";
    M3.Utils = M3.Utils || {
        getMaxValue: function(chart) {
            return (chart.data !== null) ? d3.max(chart.data, function(d) { return d[chart.config.itemValue]; }): NaN;
        },
        
        getMinValue: function(chart) {
            return (chart.data !== null) ? d3.min(chart.data, function(d) { return d[chart.config.itemValue]; }): NaN;
        },
        
        getWidthOfDiv: function(divId) {
            var width = NaN;
            var el = d3.select(divId);
            var elem = el;
            if(elem && elem.length > 0) { elem = elem[0]; }
            if(elem && elem.length > 0) { elem = elem[0]; }
            if(elem !== undefined && elem !== null)  {
                width = elem["clientWidth"]; //innerWidth
                var pad = null;
                pad = el.style("padding-right");
                var pr = pad.substring(0, pad.length-2);
                pad = el.style("padding-left");
                var pl = pad.substring(0, pad.length-2);
                width -= (+pr);
                width -= (+pl);
            }

            return width;
        },
        
        getHeightOfDiv:function(divId) {
            var height = NaN;
            var el = d3.select(divId);
            var elem = el;
            if(elem && elem.length > 0) { elem = elem[0]; }
            if(elem && elem.length > 0) { elem = elem[0]; }
            if(elem !== undefined && elem !== null)  {
                height = elem["clientHeight"];
                var pad = null;
                pad = el.style("padding-bottom");
                var pr = pad.substring(0, pad.length-2);
                pad = el.style("padding-top");
                var pl = pad.substring(0, pad.length-2);
                height -= (+pr);
                height -= (+pl);
            }

            return height;
        }
    };
})();