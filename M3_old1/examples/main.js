$(function() {
    //General conf
    var width = 200,
        height = 200;
    var confBasic = {
        width: width,
        height: height,
        itemValue:'population',
        container: '#chartContainer1',
        itemLabel: 'age'
    }

    //data
    var dataPopulation = [
        {population:2704659, age:'<5'},
        {population:4499890, age:'5-13'},
        {population:2159981, age:'14-17'},
        {population:3853788, age:'18-24'},
        {population:14106543, age:'25-44'},
        {population:8819342, age:'45-64'},
        {population:612463, age:'65'}];
    
    
    
    //pieChart
    var pieChart = new M3.PieChart();
    pieChart.draw(dataPopulation, $.extend(confBasic, {container: '#chartContainer1'}));
    
    
    var columnChart = new M3.ColumnChart();
    columnChart.draw(data2, $.extend(confBasic, {container: '#chartContainer2', itemValue:'value', itemLabel:'label', width:400, bottom:30, left:35, yLabel:"Sales"}));
    
    
    var lineChart = new M3.LineChart();
    lineChart.draw(data2, $.extend(confBasic, {container: '#chartContainer3', itemValue:'value', itemLabel:'label', width:400, bottom:30, left:35, fixedYAxis:false, yLabel:"Sales", yLabelPosition:"outer"}));
    
    var areaChart = new M3.AreaChart();
    areaChart.draw(data2, $.extend(confBasic, {container: '#chartContainer4', itemValue:'value', itemLabel:'label', width:400, bottom:30, left:35, fixedYAxis:false, yLabel:""}));
});