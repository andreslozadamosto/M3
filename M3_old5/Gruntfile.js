module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: [
                'src/core/utils/*.js',
                'src/M3.js',
                'src/core/AbstractDataViz.js',
                'src/core/charting/AbstractChart.js',
                'src/core/charting/AbstractPolarChart.js',
                'src/core/charting/AbstractCartesianChart.js',
                'src/core/charting/charts/*.js' 
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
        }
    });
    
    // Load the tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
}