"use strict";

module.exports = {
    all: ['<%= jasmine.all.src %>', '<%= jasmine.all.options.specs %>'],
    options: require( "./../jshint.json" ).options
}