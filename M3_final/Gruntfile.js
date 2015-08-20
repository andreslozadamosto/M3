module.exports = function(grunt) {
    
    //timer
    require('time-grunt')(grunt);
    
    //grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);

}