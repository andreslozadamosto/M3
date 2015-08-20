(function() {
    /*var config = M3.extend(axis1.config, {
                        container:"#axis4",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo"
                    });
    var axis4 = new M3.Axis();
    axis4.data = data2;
    axis4.config = config;
    axis4.canvas = d3.select("#axis4 .canvas");
    axis4.addAllAxis(true, true, true, true);*/
    
    var configBase = {
                        container:"#axis1",
                        width:350,
                        height:198,
                        canvasWidth:340,
                        canvasHeight:188,
                        axis: [
                            {
                                pos: "left",
                                label: "izquierda"
                            },
                            {
                                pos:"bottom",
                                clazz: "Axis.CategoryAxis"
                            },
                            {
                                pos: "right",
                                label: "derecha",
                                serie: "valueMin"
                            }
                            ,
                            {
                                pos:"top",
                                show:false,
                                clazz: "Axis.CategoryAxis"
                            }
                        ]
                    };
    
    /*addSVG("#axis1");
    var axis1 = new M3.AxisManager();
    axis1.setConfig(configBase).setData(data3).show();*/
    
    var configSimple = {
                    container:"#axis1",
                    width:350,
                    height:198,
                    margin:{all:5},
                    axis: [configBase.axis[0], configBase.axis[1]]
                };
    
    var configColumn = M3.extend({}, configSimple, {
                    container:"#axis1",
                    width:350,
                    height:198,
                    margin:{all:5},
                    axis: [configBase.axis[0], configBase.axis[1]],
                    series: [{
                        y:"left",
                        x:"bottom",
                        itemValue:"value",
                        itemLabel:"label",
                        clazz:"Series.ColumnSerie"
                    }]
                });
    
    
    var columnChart = new M3.ColumnChart();
    columnChart.behaviours = [new M3.behaviours.Tooltip()];
    columnChart.draw(data2, M3.extend({}, configColumn, {container:"#axis1"}));
    
    var groupColumnChart = new M3.ColumnChart();
    groupColumnChart.behaviours = [new M3.behaviours.Legend(), new M3.behaviours.Tooltip()];
    groupColumnChart.draw(data3, M3.extend({}, configColumn, {
                                                            container:"#axis2", 
                                                            margin: {left:5, right:5, top:5, bottom:20, all:NaN},
                                                            axis: [
                                                                {
                                                                    pos: "left",
                                                                    label: "izquierda",
                                                                    serie: ["value", "valueMin", "value2"]
                                                                },
                                                                {
                                                                    pos:"bottom",
                                                                    clazz: "Axis.CategoryAxis"
                                                                }],
                                                            series: new Array({
                                                                        name:["Valor", "Valor Min", "Valor 2"],
                                                                        itemValue:["value", "valueMin", "value2"],
                                                                        clazz:"Series.GroupColumnSerie"
                                                                    })
                                                        }));
    var stackedColumnChart = new M3.StackedColumnChart();
    stackedColumnChart.behaviours = [new M3.behaviours.Legend({position:"top right"}), new M3.behaviours.Tooltip()];
    stackedColumnChart.draw(data3, M3.extend({}, configColumn, {
                                                            container:"#axis3",
                                                            axis:[{
                                                                pos: "left",
                                                                label: "izquierda",
                                                                serie: ["value", "valueMin", "value2"],
                                                                clazz: "Axis.StackedAxis",
                                                            },
                                                            {
                                                                pos:"bottom",
                                                                clazz: "Axis.CategoryAxis"
                                                            }],
                                                            series: new Array({
                                                                        name:["Valor", "Valor Min", "Valor 2"],
                                                                        itemValue:["value", "valueMin", "value2"]
                                                                    })
                                                        }));
    
    var stacked100ColumnChart = new M3.StackedColumnChart();
    stacked100ColumnChart.behaviours = [new M3.behaviours.Tooltip()];
    stacked100ColumnChart.draw(data3, M3.extend({}, configColumn, {
                                                            container:"#axis4",
                                                            axis:[{
                                                                pos: "left",
                                                                serie: ["value", "valueMin", "value2"],
                                                                clazz: "Axis.Stacked100Axis",
                                                                width:30
                                                            },
                                                            {
                                                                pos:"bottom",
                                                                clazz: "Axis.CategoryAxis"
                                                            }],
                                                            series: new Array({
                                                                        itemValue:["value", "valueMin", "value2"],
                                                                        fullStack:true
                                                                    })
                                                        }));
    
    var waterflowColumnChart = new M3.ColumnChart();
    waterflowColumnChart.behaviours = [new M3.behaviours.Tooltip()];
    waterflowColumnChart.draw(data3, M3.extend({}, configColumn, {
                                                            container:"#axis5"
                                                        }));
    
    
    /* -------------------------------------------------- */
    var lineConfig = M3.extend({}, configSimple, {axis: [
                            {
                                pos: "left",
                                label: "izquierda"
                            },
                            {
                                pos:"bottom",
                                clazz: "Axis.CategoryPointsAxis",
                                padding:0.05
                            }]});
    
    var lineChart = new M3.LineChart();
    lineChart.behaviours = [new M3.behaviours.Tooltip()];
    lineChart.draw(data3, M3.extend({}, lineConfig, {container:"#axis7"}));
    
    var multiData = [
        {label:"11.2012", clientes:2.03, penetracion:261},
        {label:"12.2012", clientes:1.98, penetracion:238},
        {label:"01.2013", clientes:2.03, penetracion:269},
        {label:"02.2013", clientes:2.08, penetracion:275},
        {label:"03.2013", clientes:2.08, penetracion:288},
        {label:"04.2013", clientes:2.12, penetracion:317},
        {label:"05.2013", clientes:2.12, penetracion:289},
        {label:"06.2013", clientes:2.10, penetracion:282},
        {label:"07.2013", clientes:2.09, penetracion:287},
        {label:"08.2013", clientes:2.08, penetracion:273},
        {label:"09.2013", clientes:2.06, penetracion:266},
        {label:"10.2013", clientes:1.99, penetracion:272},
        {label:"11.2013", clientes:1.97, penetracion:291}
    ];
    
    var multiLineChart = new M3.LineChart();
    multiLineChart.behaviours = [new M3.behaviours.Legend(), new M3.behaviours.Tooltip()];
    multiLineChart.draw(multiData, M3.extend({}, lineConfig, {
                                                            container:"#axis8",
                                                            margin: {left:5, right:5, top:5, bottom:20, all:NaN},
                                                            axis: [
                                                                {
                                                                    pos: "left",
                                                                    label: "Clientes",
                                                                    serie: "clientes"
                                                                },
                                                                {
                                                                    pos: "right",
                                                                    label: "Penetracion",
                                                                    serie: "penetracion"
                                                                },
                                                                {
                                                                    pos:"bottom",
                                                                    clazz: "Axis.CategoryPointsAxis",
                                                                    padding:0.05
                                                                }],
                                                            series: new Array({
                                                                        itemValue: "clientes",
                                                                        clazz:"Series.LineSerie",
                                                                        y: "left",
                                                                        name:"Clientes"
                                                                    },
                                                                    {
                                                                        itemValue: "penetracion",
                                                                        y: "right",
                                                                        name: "Penetracion"
                                                                    }
                                                                )
                                                        }));
    var areaChart = new M3.AreaChart();
    areaChart.draw(data2, M3.extend({}, lineConfig, {
                                                            container:"#axis9"
                                                        }));
    var stackedAreaChart = new M3.StackedAreaChart();
    //stackedAreaChart.behaviours = [new M3.behaviours.Legend({position:"top right"})];
    stackedAreaChart.draw(data3, M3.extend({}, lineConfig, {
                                                            container:"#axis10",
                                                            axis:[{
                                                                pos: "left",
                                                                label: "izquierda",
                                                                serie: ["value", "valueMin", "value2"],
                                                                clazz: "Axis.StackedAxis",
                                                            },
                                                            {
                                                                pos:"bottom",
                                                                serie:"label",
                                                                clazz: "Axis.CategoryPointsAxis"
                                                            }],
                                                            series: new Array({
                                                                        name:["Valor", "Valor Min", "Valor 2"],
                                                                        itemValue:["value", "valueMin", "value2"]
                                                                    })
                                                        }));
    var stacked100AreaChart = new M3.StackedAreaChart();
    stacked100AreaChart.draw(data3, M3.extend({}, lineConfig, {
                                                            container:"#axis11",
                                                            axis:[{
                                                                pos: "left",
                                                                label: "izquierda",
                                                                serie: ["value", "valueMin", "value2"],
                                                                clazz: "Axis.Stacked100Axis",
                                                            },
                                                            {
                                                                pos:"bottom",
                                                                clazz: "Axis.CategoryPointsAxis"
                                                            }],
                                                            series: new Array({
                                                                        itemValue:["value", "valueMin", "value2"],
                                                                        fullStack:true
                                                                    })
                                                        }));
    
    var waterflowAreaChart = new M3.AreaChart();
    waterflowAreaChart.draw(data3, M3.extend({}, lineConfig, {
                                                            container:"#axis12",
                                                            series: new Array({
                                                                        clazz:"Series.AreaSerie"
                                                                    }
                                                                )
                                                        }));
    var pieChart = new M3.PieChart();
    pieChart.behaviours = [
                            new M3.behaviours.SerieValue(),
                            new M3.behaviours.Legend({position:"top right"}),
                            new M3.behaviours.Tooltip()
                            ]
    pieChart.draw(data2, {
                        container:"#axis13",
                        width:350,
                        height:198,
                        itemLabel:"label",
                        itemValue:"value",
                        radius:80,
                        series:[{name:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}]
                        });
    var donutChart = new M3.DonutChart();
    donutChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ]
    donutChart.draw(data2, {
                        container:"#axis14",
                        width:350,
                        height:198,
                        itemLabel:"label",
                        itemValue:"value",
                        radius:80
                        });
    var arcChart = new M3.ArcChart();
    arcChart.draw([{label:"Target", value:40}], {
                        container:"#axis15",
                        width:350,
                        height:198
                        });
    var sliceChart = new M3.SliceChart();
    sliceChart.draw([{label:"Target", value:40}], {
                        container:"#axis16",
                        width:350,
                        height:198
                        });
    
    
    
    var configMixed = {
                    container:"#axis19",
                    width:350,
                    height:198,
                    margin:{bottom:20, top:5, left:5, right:5},
                    axis: configBase.axis,
                    series: [{
                        y:"left",
                        x:"bottom",
                        itemValue:"value",
                        itemLabel:"label",
                        clazz:"Series.ColumnSerie",
                        name:"Azul"
                    },
                    {
                        y:"right",
                        x:"bottom",
                        itemValue:"valueMin",
                        itemLabel:"label",
                        clazz:"Series.LineSerie",
                        name: "Naranja"
                    }]
                };
    var chart = new M3.Chart();
    chart.behaviours = [new M3.behaviours.Legend({position:"bottom"})];
    chart.draw(data3, configMixed);
    
    
    var stackedColumnChart = new M3.StackedColumnChart();
    stackedColumnChart.behaviours = [new M3.behaviours.Legend({position:"bottom"})];
    stackedColumnChart.draw(data3, M3.extend({}, configColumn, {
                                                            margin:{bottom:20, top:5, left:5, right:5},
                                                            container:"#axis20",
                                                            axis:[{
                                                                pos: "left",
                                                                label: "izquierda",
                                                                serie: ["value", "value2"],
                                                                clazz: "Axis.StackedAxis",
                                                                ticks:4
                                                            },
                                                            {
                                                                pos:"bottom",
                                                                clazz: "Axis.CategoryAxis"
                                                            },
                                                              {
                                                                  pos:"right",
                                                                  serie:"valueMin"
                                                              }],
                                                            series: new Array({
                                                                        name:["Azul", "Naranja"],
                                                                        itemValue:["value", "value2"],
                                                                        clazz:"Series.StackedColumnSerie"
                                                                    },
                                                                    {
                                                                        y:"right",
                                                                        itemValue:"valueMin",
                                                                        clazz:"Series.LineSerie",
                                                                        name:"NaranjaLinea"
                                                                    })
                                                        }));
    
    var kpiComplete = new M3.KPIComplete();
    kpiComplete.draw([{label:"Target", value:-40, target:10, real:30}], {
                        container:"#axis22",
                        width:350,
                        height:100,
                        donutWidth:10,
                        titleItem: "label",
                        targetItem: "target",
                        realItem: "real"
                        });
    
    
    
    
})();