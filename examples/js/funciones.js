function addRow() {
    var text = "<div class=\"row\">";
    for(var i = 0; i < 3; i++) {
        text += "<div class=\"col-md-4\"><div class=\"chartContainer\"><div id=\"chart" + (indx++) + "\" class=\"chart center-block\"></div></div></div>";
    }
    
    text += "</div>";
    $(".container").append(text);
}

function addSectionTitle(title) {
    $(".container").append("<h3>" + title + "</h3>");
}


            