module.exports = function(grunt) {

    ///////////////////////////////////////////////
    //
    // Timer
    //
    ///////////////////////////////////////////////
    require('time-grunt')(grunt);


    ///////////////////////////////////////////////
    //
    //grunt tasks
    //
    ///////////////////////////////////////////////

    require('load-grunt-tasks')(grunt);


    ///////////////////////////////////////////////
    //
    // Project configuration.
    //
    ///////////////////////////////////////////////

    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);


    ///////////////////////////////////////////////
    //
    // Custom tasks
    //
    ///////////////////////////////////////////////

    // Clear release folder and temp files
    grunt.registerTask('clear', ['clean:binFolder']);

    // Generate themes
    grunt.registerTask("themes", ['less']);

    // Library deploy for development
    grunt.registerTask('deploy-dev', ['clear', 'themes']);

    // Library deploy for production
    grunt.registerTask('deploy-prod', ['clear', 'themes', 'cssmin']);

}