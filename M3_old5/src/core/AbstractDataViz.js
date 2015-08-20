(function() {
    "use strict";
    M3.AbstractDataViz = M3.AbstractM3DataViz || M3.createClass(Object);
    
    M3.AbstractDataViz.prototype.getValueFunction = function() {
        var scope = this;
        return this.hasConfig("valueFunction") ? this.getConfValue("valueFunction") : function(d){ 
                                                                                                    return d[scope.config.itemValue]; 
                                                                                                };
    };
    
    M3.AbstractDataViz.prototype.getValueFormatFunction = function() {
        var scope = this;
        return this.hasConfig("valueFunction") ? this.getConfValue("valueFunction") : function(d){ 
                                                                                                    return scope.config.ytickFormat(d[scope.config.itemValue]); 
                                                                                                };
    };
    
    /**
    Devuelve una referencia a la funcion que parsea o define el texto a mostrar en cada tick del grafico
    */
    M3.AbstractDataViz.prototype.getLabelFunction = function() {
        var scope = this;
        return this.hasConfig("labelFunction") ? this.getConfValue("labelFunction") : function(d){ 
                                                        return (d.data !== undefined && d.data !== null)?d.data[scope.config.itemLabel]:""; 
                                                    };
    };
    
    /**
    Devuelve una funcion que define el orden del dataprovider
    */
    M3.AbstractDataViz.prototype.getSortFunction = function() {
        var scope = this;
        return (scope.hasConfig("sortFunction"))?scope.getConfValue("sortFunction"):null;
    };
    
    /**
    Devuelve la funcion que calcula el color a utilizar en la series
    */
    M3.AbstractDataViz.prototype.getColorFunction = function() {
        var scope = this;
        return (scope.hasConfig("colorFunction") === true)?scope.getConfValue("colorFunction"):null;
    };
    
    /**
    Devuelve la funcion que arma el template para el tooltip
    */
    M3.AbstractDataViz.prototype.getTooltipFunction = function() {
        var scope = this;
        return this.hasConfig("tooltipTpl") ? this.getConfValue("tooltipTpl") : function(d){ 
                                                        var val = (d.hasOwnProperty("data"))?d.data:d;
                                                        return '<span>' + val[scope.config.itemLabel] +':</span> <span>' + val[scope.config.itemValue] + '</span>';
                                                    };
    };
    
    /**
    Configuracion por defaul
    */
    M3.AbstractDataViz.prototype.defaults = {
        top: 5, //pading superior
        right: 5, //padding derecho
        bottom: 5, //padding inferior
        left: 5, //padding izquierdo
        marginAll:NaN, //padding para todos
        width:800,//ancho del canvas
        height:350, //alto del canvas
        
        /* abstract chart */
        itemValue:"value", //en nombre de la propiedad del objeto de donde se tomara el valor
        itemLabel:"label", //l nombre de la propiedad para el label del item
        container:"", //el nombre del container a donde agregar el viz (ex: #chartcontainer),
        colorFunction: null, //funcion que define el color de la serie (ex: function(item, indx) {})
        labelFunction: null, //funcion que define el label del item (ex: function(value){})
        valueFunction: null, //funcion que define el value del item (ex: function(value){})
        sortFunction: null, //funcion para ordenar el dataprovider
        tooltipFunction: function(item) {
            //funcion para parsear el tooltip
            return item.label + ": " + d3.format("s")(item.value);
        },
        showValues:true, //indica si muestra los valores de las series sobre ellas
        //funcion para el formator de cada tick del eje y
        ytickFormat: function (d) { return d3.format("s")(d); },
        fixedYAxis:true, //indica q el minimo y max del eje y es 0 y maximo valor de datos. Si es false se autocalculan.
        showTooltip:true, //indica si se muestra o no el tooltop
        tooltipTpl:null,
        showTooltipStick:true,
        yLabel:"", //nombre del eje y
        yLabelPosition:"inner", //outer
        /* donut chart */
        donutWidth: 20 //ancho de la dona
    };
    /**
    Configuracion para el visualizacion
    {
        "width": 
        "height": 
        "itemValue": 
        "container": 
        "itemLabel": e
        "showValues": 
        
        "colorFunction": 
        "labelFunction": 
        "sortFunction": 
        "tooltipFunction": 
        chartMargin: 10
        
        
        "donutWidth": ancho de la dona
        
    }
    */
    M3.AbstractDataViz.prototype.config = {};
    /**
    Data a mostrar en la visualizacion
    */
    M3.AbstractDataViz.prototype.data = null;
    
    /**
    Muestra en pantall la visualizacion 
    @param data Datos a mostrar
    @param conf Confiuracion a utilizar
    */
    M3.AbstractDataViz.prototype.draw = function(data, conf) {
        this.data = data;
        this.config = M3.extend(this.getDefaults(), conf, this.getMeasures(conf));
        this.beforeDraw();
        this.drawInner();
        this.afterDraw();
    };
    
    /**
    Devuelve un objeto con la configuracion por default
    */
    M3.AbstractDataViz.prototype.getDefaults = function() {
        return this.defaults;
    };
    
    /**
    Genera los measures del viz de acuerdo al a visualizacion
    */
    M3.AbstractDataViz.prototype.getMeasures = function(conf) {
        var obj = {};
        var config = M3.extend(this.getDefaults(), conf);
        
        if(isNaN(config.marginAll)) {
            obj.margin = {top: config.top, right: config.right, bottom: config.bottom, left: config.left};
        } else {
            obj.margin = {top: config.marginAll, right: config.marginAll, bottom: config.marginAll, left: config.marginAll};
        }

        obj.chartWidth = config.width - obj.margin.left - obj.margin.right;
        obj.chartHeight = config.height - obj.margin.top - obj.margin.bottom;
        obj.canvasWidth = config.width;
        obj.canvasHeight = config.height;

        return obj;
    };
    
    /**
    Callback que se ejecuta antes de dibujcar la visualizacion
    */
    M3.AbstractDataViz.prototype.beforeDraw = function() {
    };

    /**
    Callback que se ejecuta despues de dibujar la visualiacion
    */
    M3.AbstractDataViz.prototype.afterDraw = function() {
    };
    
    /**
    Dibuja la visualizcion
    */
    M3.AbstractDataViz.prototype.drawInner = function() {
    };

    /**
    Devuelve el raw de la visualizacion
    */
    M3.AbstractDataViz.prototype.raw = function() {
    };
    
    /**
    Indica si una propiedad existe en la configuracion
    */
    M3.AbstractDataViz.prototype.hasConfig = function(prop) {
        return this.config !== undefined && this.config !== null && this.config[prop] !== undefined && this.config[prop] !== null;
    };

    /**
    Devuelve el valor de una propiedad de la configuracion
    */
    M3.AbstractDataViz.prototype.getConfValue = function(prop) {
        return (this.hasConfig(prop) === true)? this.config[prop]: "";
    };
    
})();