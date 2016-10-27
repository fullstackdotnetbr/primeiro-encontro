'use strict';
var config = {
    sass: {
        errLogToConsole: true
    },
    bower: './bower_components',
    source: {
        babel: 'src/**/*.js',
        main: '.src/',
        html: {
            files: ['./src/**/*.html', '!./src/bower_components/**/*.html']
        },
        fonts: {
            files: ['./src/font/**/*']
        },
        images: {
            files: ['./src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.jpeg']
        },
        sass: {
            files: ['./src/sass/**/*.scss']
        },
        js: {
            file: './src/js/config.js',
            path: 'js/',
        }
    },
    dest: {
        main: './wwwroot',
        css: {
            path: './wwwroot/css/',
            file: 'style.css',
            clean: './wwwroot/**/**.css'
        },
        fonts: {
            clean: ['./wwwroot/font/**/*']
        },
        html: {
            path: './wwwroot/**/*.html',
            clean: './wwwroot/**/*.html'
        },
        images: {
            clean: ['./wwwroot/**/*.png', './wwwroot/**/*.jpg', './wwwroot/**/*.gif', './wwwroot/**/*.jpeg']
        },
        js: {
            clean: ['./wwwroot/**/*.js', './wwwroot/**/*.map'],
            path: './wwwroot/js/',
            file: 'build.js',
        }
    },
    babel: {
        plugins: ['syntax-async-functions', 'transform-regenerator'],
        presets: ['es2015']
    },
    unitTests: './tmp/test/unit/**.spec.js',
    testFolder: './tmp/',
    build: './wwwroot',
    coverage: './coverage',
    messages: {
        build: {
            start: {
                title: 'gulp build',
                subtitle: 'Deployed to the wwwroot folder',
                message: 'Building everything..',
            },
            js: {
                title: 'gulp build',
                subtitle: 'Deployed to the wwwroot folder',
                message: 'Building js..',
            },
            end: {
                title: 'gulp build',
                subtitle: 'Deployed to the wwwroot folder',
                message: 'Build completed successfully',
            },
        },
    },
};
module.exports = config
