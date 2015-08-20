module.exports = function(grunt) {

    //grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    var configs = require('load-grunt-configs')(grunt);
    grunt.initConfig(configs);

    // custom tasks
    grunt.registerTask('docu', ['yuidoc']);
    grunt.registerTask('deploy', ['uglify:concat', 'uglify:min']);

    grunt.registerTask('deploy-global', ['clean:global', 'copy:global']);



}