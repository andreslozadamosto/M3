module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: [
                'src/core/utils/*.js',
                'src/core/utils/*.js',
                'src/M3.js',
                'src/core/DataViz.js'
                ],
            options: {
                specs: 'specs/**/*Spec.js',
                helpers: ['vendor/jasmine-query-master/lib/jasmine-jquery.js'],
                vendor: [
                    "vendor/d3/d3.min.js",
                    "vendor/jquery/jquery.js"
                ]
            }
        }, 
        jshint: {
            all: ['src/**/*.js', 'specs/**/*.js'],
            options: require( "./jshint.json" ).options
        },
        watch: {
            files: ['<%= jshint.all %>', 'jshint.json', 'Gruntfile.js'],
            tasks: ['jshint', 'jasmine']
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'src/',
                    themedir: 'themes/simple/',
                    outdir: 'docs/'
                }
            }
        },
        jsdoc : {
            dist : {
                src: ['src/*.js', 'src/core/utils/*.js', 'src/core/*.js'], 
                options: {
                    destination: 'docs2/'
                }
            }
        }
    });
    
    // Load the tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-jsdoc');
    
    grunt.registerTask('docu', ['yuidoc', 'jsdoc']);
}