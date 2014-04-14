function addSVG(container) {
    var cont = d3.select(container);
    var svg = cont.append("svg")
        .attr("class", "m3")
        .attr("width", 1170)
        .attr("height", 300);
    svg.append("rect")
        .attr("width", 1170)
        .attr("height", 300)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
        .attr("fill", "#EEE")
    var canvas = svg.append("g")
            .attr("class", "canvas")
            .attr("transform", "translate(5, 5)")
            .attr("width", 1160)
            .attr("height", 290);
    canvas.append("rect")
        .attr("width", 1160)
        .attr("height", 290)
        .attr("fill", "white");

}