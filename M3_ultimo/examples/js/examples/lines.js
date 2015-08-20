(function(){
    
    addSectionTitle("Line examples");
    addRow();
    
    var dataLine = null;
    var configLine = {
        container:"#chart7",
        width:350,
        height:198,
        axis: [
                {
                    pos: "left",
                    label: "izquierda"
                },
                {
                    pos:"bottom",
                    clazz: "Axis.CategoryPointsAxis",
                    padding:0.05
                },
                {
                    pos: "right",
                    label: "izquierda",
                    serie:"order"
                },
        ]
    };

    var lineChart = new M3.LineChart();
    lineChart.draw(dataMulti2, configLine);

})();