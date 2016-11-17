'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        info: {
            banner: {
                short: '/* <%= pkg.name %> v<%= pkg.version %>, (c) <%= grunt.template.today("yyyy") %> Joel Mukuthu, MIT License, built: <%= grunt.template.date("dd-mm-yyyy HH:MM:ss Z") %> */\n',
                long: '/**\n * <%= pkg.name %>\n * Version: <%= pkg.version %>\n * (c) <%= grunt.template.today("yyyy") %> Joel Mukuthu\n * MIT License\n * Built on: <%= grunt.template.date("dd-mm-yyyy HH:MM:ss Z") %>\n **/\n\n'
            }
        },

        clean: {
            dist: ['dist'],
            test: ['test/AnimatedScroll.js']
        },

        babel: {
            dist: {
                files: {
                    'dist/AnimatedScroll.js': 'src/AnimatedScroll.js'
                }
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= info.banner.long %>',
                    linebreak: false
                },
                files: {
                    src: [ 'dist/AnimatedScroll.js' ]
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= info.banner.short %>'
            },
            dist: {
                src: ['dist/AnimatedScroll.js'],
                dest: 'dist/AnimatedScroll.min.js'
            }
        },

        'release-it': {
            options: {
                pkgFiles: ['package.json', 'bower.json'],
                commitMessage: 'Release %s',
                tagName: 'v%s',
                tagAnnotation: 'Release %s',
                buildCommand: 'npm run build'
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'babel',
        'usebanner',
        'uglify'
    ]);
};
