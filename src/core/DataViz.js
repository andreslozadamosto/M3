/* global d3 */
import {
    settings
}
from "./Settings"
import {
    DataVizDefaults
}
from "./defaults"

let drawContainer = function() {
    let elem = d3.select(this["settings"].data("container"));
    if (elem) {
        elem.append("svg")
            .attr("class", "m3")
            .attr("width", this["settings"].data("datavizMinWidth"))
            .attr("height", this["settings"].data("datavizMinHeigth"))
            .append("rect")
            .attr("width", this["settings"].data("datavizMinWidth"))
            .attr("height", this["settings"].data("datavizMinHeigth"))
            .attr("class", "background");
    }
}


class DataViz {
    constructor() {
        console.log("Dataviz Constructor");
        this["settings"] = settings(DataVizDefaults);
        this["alredyDraw"] = false;
    }

    conf(value) {
        this["settings"].data(value);
        return this;
    }

    draw() {
        if (this["alredyDraw"]) this.clear();
        drawContainer.call(this);

        this["alredyDraw"] = true;
        return this;
    }

    clear() {
        this.remove();
        drawContainer.call(this);
    }
    
    remove(){
        d3.select(this["settings"].data("container") + " svg").remove();
    }
}


function foo() {
    return new DataViz();
}


export {
    DataViz, foo as dataviz
}