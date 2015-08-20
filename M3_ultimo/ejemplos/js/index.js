(function() {
    
    Examples.drawMenu();
    
    //lisening a click on each item menu and Execute the example
    $(".menuL1 ul li").on("click", function(){
        var newSelected = Examples[$(this).attr("a1")].list[$(this).attr("a2")].func;
        if(newSelected !== null && newSelected !== undefined){
            newSelected();
        }
    });

})();
