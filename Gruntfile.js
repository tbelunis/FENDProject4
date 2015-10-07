module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            target: {
                files: {
                    'build/js/permatters.min.js': ['js/perfmatters.js'],
                    'build/views/js/main.min.js': ['views/js/main.js']
                }
            }
        },

        cssmin: {
            target1: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            },
            target2: {
                files: [{
                    expand: true,
                    cwd: 'stylesheets',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/stylesheets',
                    ext: '.min.css'
                }]
            },
            target3: {
                files: [{
                    expand: true,
                    cwd: 'views/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/views/css',
                    ext: '.min.css'
                }]
            }
        },

        processhtml: {
            dist: {
                files: {
                    'build/index.html': ['index.html'],
                    'build/views/pizza.html': ['views/pizza.html']
                }
            }
        }

    });



    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'cssmin', 'processhtml']);

};
