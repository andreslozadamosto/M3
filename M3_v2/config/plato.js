"use strict";

var grunt = require("grunt");

module.exports = {
    all: {
        options: {
            jshint: grunt.file.readJSON('jshint.json')
        },
        files: {
            'analysis': ['<%= jasmine.all.src %>']
        }
    }
}