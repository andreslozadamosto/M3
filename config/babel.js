'use strict';

module.exports = {
    options: {
        sourceMap: true,
        presets: ['es2015'],

    },
    umd: {
        /*files: {
            'bin/M3.js': 'src/M3.js'
        }*/
        options: {
            plugins: ["transform-es2015-modules-umd"]
        },
        files: [{
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "bin/umd/",
            "ext": ".js"
        }]
    },
    amd: {
        options: {
            plugins: ["transform-es2015-modules-amd"]
        },
        files: [{
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "bin/amd/",
            "ext": ".js"
        }]
    },
    commonjs: {
        options: {
            plugins: ["transform-es2015-modules-commonjs"]
        },
        files: [{
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "bin/commonjs/",
            "ext": ".js"
        }]
    },
    systemjs: {
        options: {
            plugins: ["transform-es2015-modules-systemjs"]
        },
        files: [{
            "expand": true,
            "cwd": "src/",
            "src": ["**/*.js"],
            "dest": "bin/systemjs/",
            "ext": ".js"
        }]
    }
}