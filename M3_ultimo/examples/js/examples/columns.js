(function(){
   
    var columnConfig = M3.extend({}, defaultConfig, {
        axis: [
                //defaultAxis[0], 
                defaultAxis[1],
                {
                    pos:"left"
                    ,ticks:5
                    //,useNiceValues:false
                    //,tickFormat:function (d) { return d3.format("n")(d); }
                    //,label:"hola"
                    //,labelPosition:"inner"
                    //,width:60
                    //,labelWidth:100
                    //,show:false
                    //,tickSize:10
                    //,tickPadding:10
                }
        ]
    });
    
    addSectionTitle("Columns examples");
    addRow();
    
    //COLUMNA SIMPLE
    var columnChart = new M3.ColumnChart();
    columnChart.behaviours = [new M3.behaviours.GridBackground()];
    columnChart.draw(dataMulti2, M3.extend({}, columnConfig, {container:"#chart1"}));
    
    //GROUPS COLUMNS
    var groupColumnChart = new M3.ColumnChart();
    groupColumnChart.draw(dataMulti4, M3.extend({}, columnConfig, {
                                                            container:"#chart2", 
                                                            axis: [
                                                                {
                                                                    pos: "left",
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
    
    //STACKED COLUMNS
    var stackedColumnChart = new M3.StackedColumnChart();
    stackedColumnChart.draw(dataMulti4, M3.extend({}, columnConfig, {
                                                            container:"#chart3",
                                                            axis:[{
                                                                pos: "left", serie: ["value", "valueMin", "value2"], clazz: "Axis.StackedAxis",
                                                            },
                                                            {
                                                                pos:"bottom", clazz: "Axis.CategoryAxis"
                                                            }],
                                                            series: new Array({
                                                                        name:["Valor", "Valor Min", "Valor 2"],
                                                                        itemValue:["value", "valueMin", "value2"]
                                                                    })
                                                        }));
    
    addRow();
    
    //STACKED 100% COLUMNS
    var stacked100ColumnChart = new M3.StackedColumnChart();
    stacked100ColumnChart.draw(dataMulti4, M3.extend({}, columnConfig, {
                                                            container:"#chart4",
                                                            axis:[{
                                                                pos: "left", serie: ["value", "valueMin", "value2"], clazz: "Axis.Stacked100Axis"
                                                            },
                                                            {
                                                                pos:"bottom", clazz: "Axis.CategoryAxis"
                                                            }],
                                                            series: new Array({
                                                                        itemValue:["value", "valueMin", "value2"],
                                                                        fullStack:true
                                                                    })
                                                        }));
    
    //WATERFLOW COLUMN
    var waterflowColumnChart = new M3.ColumnChart();
    waterflowColumnChart.draw(dataMulti4, M3.extend({}, columnConfig, {
                                                            container:"#chart5"
                                                        }));
})();