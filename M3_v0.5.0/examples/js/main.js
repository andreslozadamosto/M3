var indx = 1;

var defaultConfig = {
    width:358,
    height:198,
    margin:{all:5}
}

var defaultAxis = [
                    {
                        pos: "left",
                        label: "izquierda"
                    },
                    {
                        pos:"bottom",
                        clazz: "Axis.CategoryAxis"
                    },
                    {
                        pos: "right",
                        label: "derecha",
                        serie: "valueMin"
                    }
                    ,
                    {
                        pos:"top",
                        show:false,
                        clazz: "Axis.CategoryAxis"
                    }
                ];