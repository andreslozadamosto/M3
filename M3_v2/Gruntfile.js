module.exports = function(grunt) {
    
    //timer
    require('time-grunt')(grunt);
    
    //grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);

    // custom tasks
    grunt.registerTask('docu', ['jsdoc']);
    grunt.registerTask('test', ['jasmine:all']);
    grunt.registerTask('deploy', ['test', 'docu']);
    grunt.registerTask('default', ['deploy']);

    //grunt.registerTask('deploy-global', ['clean:global', 'copy:global']);

}