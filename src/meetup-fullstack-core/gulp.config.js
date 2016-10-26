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
        main: './dist',
        css: {
            path: './dist/css/',
            file: 'style.css',
            clean: './dist/**/**.css'
        },
        fonts: {
            clean: ['./dist/font/**/*']
        },
        html: {
            path: './dist/**/*.html',
            clean: './dist/**/*.html'
        },
        images: {
            clean: ['./dist/**/*.png', './dist/**/*.jpg', './dist/**/*.gif', './dist/**/*.jpeg']
        },
        js: {
            clean: ['./dist/**/*.js', './dist/**/*.map'],
            path: './dist/js/',
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
                subtitle: 'Deployed to the dist folder',
                message: 'Building everything..',
            },
            js: {
                title: 'gulp build',
                subtitle: 'Deployed to the dist folder',
                message: 'Building js..',
            },
            end: {
                title: 'gulp build',
                subtitle: 'Deployed to the dist folder',
                message: 'Build completed successfully',
            },
        },
    },
};
module.exports = config
