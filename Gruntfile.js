module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            src: [
                'src/M3.js',
                //utils
                'src/utils/*'
            ],
            options: {
                specs: [
                    'tests/M3Spec.js',
                    'tests/utils/*'
                ],
                helpers: ['vendor/jasmine-query-master/lib/jasmine-jquery.js'],
                vendor: [
                    "vendor/d3/d3.min.js",
                    "vendor/jquery/jquery.js"
                ]
            }
        },

        jshint: {
            all: ['<%= jasmine.src %>', 'tests/**/*.js'],
            options: require("./jshint.json").options
        },

        watch: {
            files: ['<%= jshint.all %>'],
            tasks: ['jshint']
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'src/',

                    themedir: 'vendor/docuthemes/bootstrap/',
                    helpers: ['vendor/docuthemes/bootstrap//helpers/helpers.js'],

                    outdir: 'docs/'
                }
            }
        },
        uglify: {
            concat: {
                options: {
                    beautify: true,
                    compress: true
                },
                files: {
                    'lib/m3.js': ['<%= jasmine.src %>']
                }
            },
            min: {
                options: {
                    sourceMap: true
                },
                files: {
                    'lib/m3.min.js': ['<%= jasmine.src %>']
                }
            }
        }

    });

    // Load the tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('docu', ['yuidoc']);
    grunt.registerTask('deploy', ['uglify:concat', 'uglify:min']);
}