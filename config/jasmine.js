'use strict';

// Empties folders to start fresh
module.exports = {
    all: {
        "src": [
            "src/**/*.js",
        ],
        "options": {
            "specs": [
                "tests/**/*Spec.js",
            ],
            "helpers": [
                "vendor/jasmine-query-master/lib/jasmine-jquery.js",
                "node_modules/babel-register/lib/node.js"
            ],
            "vendor": [
                "vendor/d3/d3.min.js",
                "vendor/jquery/jquery.js"
            ]
        }
    },
    "base": {
        "src": [
            "src/M3.js",
        ],
        "options": {
            "specs": [
                "tests/M3Spec.js",
            ],
            "helpers": [
                "vendor/jasmine-query-master/lib/jasmine-jquery.js"
            ],
            "vendor": [
                "vendor/d3/d3.min.js",
                "vendor/jquery/jquery.js"
            ]
        }
    },
    "utils":{
        "src": [
            "src/M3.js",
            "src/utils/*"
        ],
        "options": {
            "specs": [
                "tests/utils/*"
            ],
            "helpers": [
                "vendor/jasmine-query-master/lib/jasmine-jquery.js"
            ],
            "vendor": [
                "vendor/d3/d3.min.js",
                "vendor/jquery/jquery.js"
            ]
        }
    },
    "dataviz":{
        "src": [
            "src/M3.js",
            "src/utils/*",
            "src/DataViz.js"
        ],
        "options": {
            "specs": [
                "tests/DataVizSpec.js",
            ],
            "helpers": [
                "vendor/jasmine-query-master/lib/jasmine-jquery.js"
            ],
            "vendor": [
                "vendor/d3/d3.min.js",
                "vendor/jquery/jquery.js"
            ]
        }
    }
};