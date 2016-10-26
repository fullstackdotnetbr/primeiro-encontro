'use strict'
require('babel-core/register')
require('babel-polyfill')

const gulp = require('gulp-help')(require('gulp'))
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()
const browserSyncCoverage = require('browser-sync').create()
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const log = require('./log.js')
const config = require('./gulp.config.js')
const browserify = require('browserify')
const shim = require('browserify-shim')
const watchify = require('watchify')
const babelify = require('babelify')
const hbsfy = require('hbsfy')
const del = require('del')
const plumber = require('gulp-plumber')

const argv = require('yargs')
    .default('debug', true)
    .argv
let coverageVariable
let server

//////////////////////////////
// Tests
//////////////////////////////

gulp.task('watch:test', 'Build everthing and serve a node server. ', ['test:unit'], (done) => {
    browserSyncCoverage.init({
        server: './wwwroot/coverage/lcov-report/',
        port: 3030,
        weinre: {
            port: 3031
        },
        ui: false
    })
    gulp.watch(config.source.babel, ['test:unit'])
})

gulp.task('test:unit', ['coverage'], (done) => {
    return gulp.src(config.unitTests, { read: false })
        .pipe(plugins.mocha({ reporter: 'spec' }))
        .pipe(plugins.istanbul.writeReports({
            coverageVariable: coverageVariable,
            reporters: ['lcov', 'json', 'text', 'text-summary'],
            reportOpts: { dir: './wwwroot/coverage' }
        }))
        .pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .pipe(browserSyncCoverage.stream())
})

gulp.task('coverage', ['babel', 'clean:coverage'], (done) => {
    coverageVariable = '$$cov_' + new Date().getTime() + '$$'
    return gulp.src('./tmp/js/**/*.js')
        .pipe(plugins.istanbul({
            coverageVariable: coverageVariable
        }))
        .pipe(plugins.istanbul.hookRequire())
})

gulp.task('babel', ['clean:babel'], () => {
    return gulp.src([config.source.babel])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel(config.babel))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(config.testFolder))
})

gulp.task('clean:coverage', () => {
    return del(config.coverage)
})

gulp.task('clean:babel', () => {
    return del(config.testFolder)
})


//////////////////////////////
// Bump
//////////////////////////////

gulp.task('bump', 'Bump version using e.g. gulp bump --type=major', () => {
    var msg = 'Bumping versions'
    var type = argv.type
    var version = argv.version
    var options = {}
    if (version) {
        options.version = version
        msg += ' to ' + version
    } else {
        options.type = type
        msg += ' for a ' + type
    }

    log(msg)
    return gulp
        .src(['./package.json', './bower.json'])
        .pipe(plugins.bump(options))
        .pipe(gulp.dest('./'))
})

//////////////////////////////
// Groups
//////////////////////////////

gulp.task('watch', 'Watches all files and reload', ['inject:start'], () => {
    browserSync.init({
        server: config.dest.main,
        port: 3032,
        weinre: {
            port: 3033
        }
    })

    gulp.watch(config.source.sass.files, ['sass', 'inject'])
        .on('change', (event) => {
            log('File ' + event.path + ' was ' + event.type + ', running sass tasks...')
        })

    gulp.watch(config.source.images.files, ['images'])
        .on('change', (event) => {
            log('File ' + event.path + ' was ' + event.type + ', running images tasks...')
        })

    gulp.watch(config.source.html.files, ['inject'])
})

gulp.task('serve:build', 'Build everthing and serve a node server. ', ['build'], (done) => {
    server = gulp.src('wwwroot')
        .pipe(plugins.webserver({
            port: 8000
        }))
    return server
})

gulp.task('serve:dev', 'Build everthing and serve a node server. ', ['watch:build:app'], (done) => {})

gulp.task('app', ['browserify', 'sass', 'images', 'fonts'], () => {})

gulp.task('build', 'Build everthing', ['rev-replace', 'test:unit'], () => {
    return gulp.src('./dist/**')
        .pipe(gulp.dest('./wwwroot'))
})

//////////////////////////////
// App
//////////////////////////////

gulp.task('inject', ['html'], () => {
    let target = gulp.src('./dist/**/*.html')
    let sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {
        read: false
    })
    return target
        .pipe(plugins.inject(sources, {
            ignorePath: '/dist'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
})


gulp.task('inject:start', ['app'], () => {
    let target = gulp.src('./dist/**/*.html')
    let sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {
        read: false
    })
    return target
        .pipe(plugins.inject(sources, {
            ignorePath: '/dist'
        }))
        .pipe(gulp.dest('./dist'))
})


gulp.task('rev-replace', ['clean:rev-replace'], () => {
    var manifest = gulp.src(`${config.source.main}/rev-manifest.json`)
    return gulp.src('./dist/**/*.html')
        .pipe(plugins.revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(config.dest.main))
        .pipe(plugins.inject(gulp.src(['./dist/js/**/*.js', './dist/css/**/*.css'], {
            read: false
        }), {
            ignorePath: '/dist/'
        }))
        .pipe(gulp.dest(config.dest.main))
})

gulp.task('revision', ['app'], () => {
    return gulp.src([`${config.dest.main}/**/{*.js,*.css}`])
        //.pipe(plugins.rev())
        //.pipe(gulp.dest(config.dest.main))
        //.pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.dest.main))
})

gulp.task('clean:rev-replace', ['revision'], () => {
    let files = [config.dest.css.path + config.dest.css.file, config.dest.js.path + config.dest.js.file]
    return del(files)
})

gulp.task('clean:html', 'Compress html before inject', () => {
    return del(config.dest.html.clean)
})

gulp.task('html', 'Compress html before inject', ['clean:html'], () => {
    return gulp
        .src(config.source.html.files)
        .pipe(gulp.dest('./dist'))
})

gulp.task('clean:fonts', 'Clear build folder', () => {
    return del(config.dest.fonts.clean)
})

gulp.task('fonts', 'Just move fonts to the path of build', ['clean:fonts'], () => {
    return gulp
        .src(config.source.fonts.files)
        .pipe(gulp.dest('dist/font'))
})

gulp.task('clean:images', 'Clear build folder', () => {
    return del(config.dest.images.clean)
})

gulp.task('images', 'Compress all images and move to build path', ['clean:images'], (cb) => {
    gulp.src(config.source.images.files)
        // .pipe(plugins.imageOptimization({
        //     optimizationLevel: 5,
        //     progressive: true,
        //     interlaced: true,
        // }))
        .pipe(gulp.dest('dist')).on('end', cb).on('error', cb)
})

gulp.task('clean:sass', 'Clear build folder', () => {
    return del(config.dest.css.clean)
})

gulp.task('sass', 'Compile sass, create sourcemap, autoprefix css', ['clean:sass'], () => {
    var onError = function(err) {
        plugins.notify.onError({
            title: "Gulp Sass",
            subtitle: "You prat! What've you done now?!",
            message: "Error: " + err.message,
            sound: "Beep"
        })(err);
        this.emit('end');
    };
    return gulp
        .src(config.source.sass.files)
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concatCss(config.dest.css.file))
        .pipe(gulp.dest(config.dest.css.path))
        .pipe(browserSync.stream())

})

gulp.task('clean:browserify', 'Clear build folder', () => {
    return del(config.dest.js.clean)
})

gulp.task('browserify', 'Bundle browserify and watch for changes', ['clean:browserify'], bundle.bind(null, bundler()))

//////////////////////////////
// Browserify
//////////////////////////////
let w = watchify(bundler())

gulp.task('watch:build:app', ['watch'], () => {
    bundle(w)
    w.on('update', () => {
        bundle(w)
    })
})

function bundler() {
    let b = browserify(config.source.js.file, {
            debug: true,
            insertGlobals: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        })
        .transform(babelify.configure(config.babel))
        .transform(hbsfy.configure({
            extensions: ['hbs']
        }))
    return b
}

function bundle(pkg) {
    return pkg.bundle()
        .on('end', () => {
            browserSync.reload()
        })
        .on('error', (err) => {
            plugins.notify({
                title: 'Failed running browserify',
                message: err.message,
                icon: __dirname + '/error.jpg',
            }).write(err)
            del(config.dest.js.clean);
            browserSync.reload();
        })
        .pipe(source(config.dest.js.file))
        .pipe(buffer())
        .pipe(plugins.sourcemaps.init({
            loadMaps: true
        }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.js.path))
}
