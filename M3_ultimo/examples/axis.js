(function() {
    var axis1 = new M3.AbstractCartesianChart();
    axis1.setConfig({
                        container:"#axis1",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo"
                    })
        .setData(data2)
        .drawContainer()
        .drawCanvas()
        .addAxis(true, true, true, true);
    //dataViz2.axis.addAxis(true, true, true, {a:"hola"});
    
    
    var axis2 = new M3.AbstractCartesianChart();
    axis2.setConfig({
                        container:"#axis2",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer"
                    })
        .setData(data2)
        .drawContainer()
        .drawCanvas()
        .addAxis(true, true);
    
    var axis3 = new M3.AbstractCartesianChart();
    axis3.setConfig({
                        container:"#axis3",
                        width:350,
                        height:198,
                        margin:{left:5},
                        axisYLabelleft:"izquierda", axisYLabelright:"derecha",
                        axisXLabeltop:"arriba", axisXLabelbottom:"abajo",
                        axisLabelXPosition:"outer",
                        axisLabelXPosition:"outer"
                    })
        .setData(data2)
        .drawContainer()
        .drawCanvas()
        .addAxis(true, true, true);
    
    var config = M3.extend(axis1.config, {
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
    axis4.addAllAxis(true, true, true, true);
}
)();