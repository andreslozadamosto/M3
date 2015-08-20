$(function() {
    
    //General conf
    var width = 200,
        height = 200;
    var confBasic = {
        width: width,
        height: height,
        itemValue:'population',
        container: '#chartContainer1',
        itemLabel: 'age',
        showValues: true,
        donutWidth: 20,
        chartMargin: 10
    }

    //data
    var data = [
        {population:2704659, age:'<5'},
        {population:4499890, age:'5-13'},
        {population:2159981, age:'14-17'},
        {population:3853788, age:'18-24'},
        {population:14106543, age:'25-44'},
        {population:8819342, age:'45-64'},
        {population:612463, age:'65'}];
    
    //pieChart
    var pieChart = new PieChart();
    pieChart.draw(data, $.extend(confBasic, {container: '#chartContainer1'}));
    
    //donutChart
    var donutChart = new DonutChart();
    donutChart.draw(data, $.extend(confBasic, {container: '#chartContainer2'}));
    
    //KPI
    function colorFunction(value) {
        var val = +value;
        return (!isNaN(val) && val > 0) 
                ? 'green' 
                : (!isNaN(val) && val < 0) 
                    ? 'red' 
                    : 'grey';
    }
    function labelFunction(value) {
        return value + "%";
    }
    confBasic.height = 100;
    data = [{population:-1, age:'a', title:"Penetración", target:'2', real:'1.97'}];
    var kpiChart = new KPIComplete();
    kpiChart.draw(data, $.extend(confBasic, {
        container: '#chartPenetracion', 
        showValues:false, 
        colorFunction: colorFunction,
        labelFunction:labelFunction,
        donutWidth: 10,
        width:250,
        targetFormat:' ,'
    }));
    
    data = [{population:-26, age:'a', title:"Atricion", target:'6.5', real:'4.77'}];
    var kpiChart2 = new KPIComplete();
    kpiChart2.draw(data, $.extend(confBasic, {
        container: '#chartAtricion', 
        showValues:false, 
        colorFunction: colorFunction,
        labelFunction:labelFunction,
        width:250,
        targetFormat:','
    }));
    
    data = [
        {population:57, age:'1', title:"SellOut", target:'2177233.71 ', real:'3410650.65'}
    ]
    var kpiComplete = new KPIComplete();
    kpiComplete.draw(data, $.extend(confBasic, {
        container: '#chartSellOut', 
        showValues:false, 
        colorFunction: colorFunction,
        labelFunction:labelFunction,
        width:250,
        targetFormat:'$,g '
    }));
    
    data = [
        {population:35, age:'-11', title:"Cobertura", target:'60', real:'53.69'}
    ]
    var kpiComplete = new KPIComplete();
    kpiComplete.draw(data, $.extend(confBasic, {
        container: '#chartCobertura', 
        showValues:false, 
        colorFunction: colorFunction,
        labelFunction:labelFunction,
        width:250,
        targetFormat:' ,'
    }));
    
});
