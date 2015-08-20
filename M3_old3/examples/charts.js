(function(){
    var config = {
                    container:"#chart1",
                    width:350,
                    height:198,
                    margin:{left:5},
                    axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                    axisXLabeltop:"arriba", axisXLabelbottom:"abajo"
                };
    var columnChart = new M3.ColumnChart();
    columnChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ];
    columnChart.draw(data2, {
                        container:"#chart1",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var columnChart2 = new M3.ColumnChart();
    columnChart2.draw(data1, {
                        container:"#chart2",
                        width:350,
                        height:198,
                        itemLabel:"letter",
                        itemValue:"frequency",
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            right:true
                        }
                    });
    
    var lineChart = new M3.LineChart();
    lineChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ];
    lineChart.draw(data2, {
                        container:"#chart3",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var pieChart = new M3.PieChart();
    pieChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ]
    pieChart.draw(data2, {
                        container:"#chart4",
                        width:350,
                        height:198,
                        itemLabel:"label",
                        itemValue:"value",
                        radius:80
                        });
    var donutChart = new M3.DonutChart();
    donutChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ]
    donutChart.draw(data2, {
                        container:"#chart5",
                        width:350,
                        height:198,
                        itemLabel:"label",
                        itemValue:"value",
                        radius:80
                        });
    var arcChart = new M3.ArcChart();
    arcChart.draw([{label:"Target", value:40}], {
                        container:"#chart6",
                        width:350,
                        height:198
                        });
    var sliceChart = new M3.SliceChart();
    sliceChart.draw([{label:"Target", value:40}], {
                        container:"#chart7",
                        width:350,
                        height:198
                        });
    var areaChart = new M3.AreaChart();
    areaChart.behaviours = [
                            new M3.behaviours.SerieValue()
                            ];
    areaChart.draw(data1, {
                        container:"#chart8",
                        width:350,
                        height:198,
                        itemLabel:"letter",
                        itemValue:"frequency",
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            right:true
                        }
                    });
    var columnChart3 = new M3.ColumnChart();
    columnChart3.behaviours = [
                            new M3.behaviours.SerieValue()
                            ];
    columnChart3.draw(data3, {
                        container:"#chart9",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var areaChart2 = new M3.AreaChart();
    areaChart2.draw(data3, {
                        container:"#chart10",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var groupChart3 = new M3.GroupColumnChart();
    groupChart3.draw(data3, {
                        container:"#chart11",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        series:["valueMin", "value"],
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var stackedChart = new M3.StackedColumnChart();
    stackedChart.draw(data3, {
                        container:"#chart12",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        series:["valueMin", "value"],
                        axis: {
                            bottom:true, 
                            left:true
                        }
                    });
    var stackedChart2 = new M3.StackedColumnChart();
    stackedChart2.draw(data3, {
                        container:"#chart13",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        series:["valueMin", "value"],
                        axis: {
                            bottom:true, 
                            left:true
                        },
                        fullStack:true,
                        normalize:true
                    });
    
    var kpiComplete = new M3.KPIComplete();
    kpiComplete.draw([{label:"Target", value:40, target:10, real:30}], {
                        container:"#chart14",
                        width:350,
                        height:100,
                        donutWidth:10,
                        titleItem: "label",
                        targetItem: "target",
                        realItem: "real"
                        });
})();