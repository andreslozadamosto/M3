# M3
[Oficial website](http://alfathenus.github.io/M3/ "M3 datavisualization")


## Summary

M3 is a wrapper for D3 to allow integrate simple and complex datavisualization in your websit

### Features

You can found a variety of charts types and you can mix it.

### Charts
* Column Chart
* Group Chart
* Stacked Chart
* Stacked 100% Chart
* Line Chart
* Area Chart
* Stacked Area Chart
* Stacked Area 100% Chart
* Pie Chart
* Donut Chart
* Slice Pie Chart
* Arc Chart
* Mixed Charts
* Bar Charts (soon)
* Grouped Bar Charts (soon)
* Stacked Bar Charts (soon)

### Styling
All stiles are defined with CSS so you can create your own themes.

### Behaviours
The charting interface only provide data visualization. If you want add any other functionality (like tooltip, mirror, etc) you have to create a <i>"behaviour"</i>.

There are some builtin behaviours (and more to come):
* Tooltips
* Legends
* Grid background

## Examples
    var config = {
        width:400,
        height:300,
        margin:{all:5},
        axis: [
            {pos:"left", ticks:5},
            {pos:"bottom", clazz: "Axis.CategoryAxis"}        
        ]
    }

    var columnChart = new M3.ColumnChart();
    columnChart.behaviours = [new M3.behaviours.GridBackground()];
    columnChart.draw(data, M3.extend({}, config, {container:"#ex1"}));

## Grunt task
Generate api documentation
    > grunt docu 
Build (create min file)
    > grunt deploy
Test (run jasmine test)
    > grunt jasmine
## Licence
[BSD Licence](http://opensource.org/licenses/BSD-3-Clause "BSD Licence")
