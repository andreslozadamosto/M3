'use strict';

module.exports = {
    ///////////////////////////////////////////////
    // Light theme compiler options
    ///////////////////////////////////////////////
    lightTheme: {
        options: {
            paths: ["themes/light", "themes/parts"]
        },
        files: {
            "bin/themes/light.css": "themes/styles.less"
        }
    },

    ///////////////////////////////////////////////
    // Dark them compiler options
    ///////////////////////////////////////////////
    darkTheme: {
        options: {
            paths: ["themes/dark", "themes/parts"]
        },
        files: {
            "bin/themes/dark.css": "themes/styles.less"
        }
    }
}