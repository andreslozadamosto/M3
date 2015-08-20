(function() {
    "use strict";
    /**
    Base class for Charts
    
    @class M3.AbstractChart
    @constructor
    @exteds M3.DataViz
    @module M3
    */
    M3.AbstractChart = M3.AbstractChart || M3CreateClass(M3.DataViz);
    
    /**
    Adds some configuration properties to DataViz. To see the complete list of properties, please go to 
    the super class definition.
    
    <table>
        <thead>
            <tr><th>Property</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
            <tr><td>itemValue</td><td>value</td><td>Property name on data values to get the value</td></tr>
            <tr><td>itemLabel</td><td>label</td><td></td></tr>
            <tr><td>labelFormat</td><td></td><td></td></tr>
            <tr><td>valueFormat</td><td></td><td></td></tr>
        </tbody>
    </table>
    
    @method setConfig
    @chainable
    @param conf {Object} object with properties
    @return Instance reference
    */
    M3.AbstractChart.prototype.setConfig = function(conf) {
        var defaultLabelFormat = function (d) { return d; };
        var defaultValueFormat = function (d) { return d3.format("s")(d); };
        var defaults = {
            itemValue: "value",
            itemLabel: "label",
            labelFormat: defaultLabelFormat,
            valueFormat: defaultValueFormat
        };
        //var configs = (conf !== undefined && conf !== null)?M3.mixin(conf, defaults):defaults;
        var configs = (conf)?M3.mixin(conf, defaults):defaults;
        M3.DataViz.prototype.setConfig.call(this, configs);
        
        return this;
    };
    
    
    M3.AbstractChart.prototype.resize = function(width, height) {
        M3.DataViz.prototype.resize.call(this, [width, height]);
    }
})();