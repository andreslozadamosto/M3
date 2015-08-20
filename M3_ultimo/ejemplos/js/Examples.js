function ExamplesList(item) {
    this.list = [];
    this.item = item;
    
    this.add = function(name, func) {
        this.list[this.list.length] = {name:name, func:func};
    }
}


var Examples = {
    Column: new ExamplesList("column"),
    Line: new ExamplesList("line"),
    Area: new ExamplesList("area"),
    Pie: new ExamplesList("pie"),
    Axis: new ExamplesList("axis"),
    DataViz: new ExamplesList("dataviz"),
    
    drawMenu: function() {
        var items = ["DataViz", "Axis", "Column", "Line", "Area", "Pie"];
        var scope = this;
        //Adds all items menu
        items.forEach(function(elem, index, vec) {
            var item = scope[elem].item;
            scope[elem].list.forEach(function(el, ind, v) {
                $("#"+item+" ul").append("<li a1=\""+elem+"\" a2=\""+ind+"\">"+el.name+"</li>");
            });
        });
    }
}

