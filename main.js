$(function() {
    //add syntax hightligh for examples
    $("#code1").text($("#example1").text());
    //$("#dataCode").text($("#datas").text());
    
    
    
    //Add contributors form github metadata
    var prom = $.get("https://api.github.com/repos/alfathenus/CalendarJQueryPlugin/contributors");
    prom.done(function(data) {
        var tpl = "<a href=\"_url_\" target=\"_blank\"><img class=\"contributor_img\" src=\"_img_\" alt=\"_usr_\" title=\"_usr_\" ></a>";
        
        if(data instanceof Array && data.length > 0) {
            var container = $("#contributors");
            data.map(function(d) {
                container.html(tpl.replace("_url_",d.html_url).replace("_img_", d.avatar_url).replace(/_usr_/g, d.login));
            });
        }
    });
    
    
    
})