module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            src: [
                //utils
                'src/core/pollyfil.js',
                'src/core/utils/Class.js',
                'src/core/utils/Extend.js',
                'src/core/utils/Mixin.js',
                'src/core/utils/ValidationM3.js',
                //m3 basic
                'src/M3.js',
                'src/core/utils/Utils.js',
                'src/core/DataViz.js',
                'src/core/AbstractChart.js',
                //axis
                'src/core/axis/AxisItem.js',
                'src/core/axis/CategoryAxis.js',
                'src/core/axis/CategoryPointsAxis.js',
                'src/core/axis/LinealAxis.js',
                'src/core/axis/Stacked100Axis.js',
                'src/core/axis/StackedAxis.js',
                'src/core/axis/AxisManager.js',
                //series
                'src/core/series/ChartSerie.js',
                'src/core/series/ColumnSerie.js',
                'src/core/series/GroupColumnSerie.js',
                'src/core/series/StackedColumnSerie.js',
                'src/core/series/LineSerie.js',
                'src/core/series/AreaSerie.js',
                'src/core/series/StackedAreaSerie.js',
                'src/core/series/Series.js',
                //charts basic
                'src/core/Chart.js',
                'src/core/AbstractPolarChart.js',
                //charts
                'src/core/charts/PieChart.js',
                'src/core/charts/DonutChart.js',
                'src/core/charts/ArcChart.js',
                'src/core/charts/SliceChart.js',
                'src/core/charts/KPIComplete.js',
                //charting
                'src/core/charting/AreaChart.js',
                'src/core/charting/ColumnChart.js',
                'src/core/charting/LineChart.js',
                'src/core/charting/StackedAreaChart.js',
                'src/core/charting/StackedColumnChart.js',
                //behaviours
                'src/core/behaviours/SerieValue.js',
                'src/core/behaviours/Legend.js',
                'src/core/behaviours/Tooltip.js',
                'src/core/behaviours/GridBackground.js',
                'src/core/behaviours/Responsive.js'
                ],
            options: {
                //specs: ['tests/M3Spec.js'],
                    //'tests/core/axis/AxisItemSpec.js'],
                //'tests/**/*Spec.js'],
                specs: ['tests/core/DataVizSpec.js'],
                helpers: ['vendor/jasmine-query-master/lib/jasmine-jquery.js'],
                vendor: [
                    "vendor/d3/d3.min.js",
                    "vendor/jquery/jquery.js"
                ]
            }
        }, 
        jshint: {
            all: ['<%= jasmine.src %>', 'specs/**/*.js'],
            options: require( "./jshint.json" ).options
        },
        watch: {
            //files: ['<%= jshint.all %>', 'jshint.json', 'Gruntfile.js'],
            //tasks: ['jshint', 'jasmine']
            files:['<%= jasmine.src %>'],
            tasks: ['deploy']
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'src/',
                    
                    themedir: 'themes/bootstrap/',
                    helpers : [ 'themes/bootstrap//helpers/helpers.js' ],
                    
                    //themedir: 'themes/blue/',
                    
                    //themedir: 'themes/darktalker/',
                    outdir: 'docs/'
                }
            }
        },
        uglify: {
            concat: {
                options: {
                    beautify: true,
                    compress: false
                },
                files: {
                    'lib/m3.js': ['<%= jasmine.src %>']
                }
            },
            min: {
                options: {
                    sourceMap:true
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