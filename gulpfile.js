const PATHS = {
    build: {
        html: `dist/`,
        css: `dist/css`,
        js: `dist/js/`,
        assets: `dist/assets/`,
    },
    src: {
        html: 'src/**/*.html',
        css: 'src/scss/styles.scss',
        cssLayout: 'src/scss/layouts/*.scss',
        js: 'src/js/*.js',
        assets: `src/assets/**`
    },
    watch: {
        html: 'src/**/*.html',
        css: 'src/scss/**/*.scss',
        js: 'src/js/**/*.js',
        assets: `src/assets/**`
    },
    clean: './dist/'
}

const {src, dest} = require('gulp');
const gulp = require('gulp');
const del = require('del');
const csso = require('gulp-csso');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const jsMinify = require('gulp-minify');
const rename = require('gulp-rename');


let browsersync = require('browser-sync').create();

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    })
}

function html() {
    return src(PATHS.src.html)
        .pipe(rename({dirname: ''}))
        .pipe(dest(PATHS.build.html))
        .pipe(browsersync.stream())
}

function assets() {
    return src(PATHS.src.assets)
        .pipe(dest(PATHS.build.assets))
        .pipe(browsersync.stream())
}

function css() {
    return src(PATHS.src.css)
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: false}))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(dest(PATHS.build.css))
        .pipe(browsersync.stream())
}

function cssLayouts() {
    return src(PATHS.src.cssLayout)
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: false}))
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(dest(PATHS.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(PATHS.src.js, {allowEmpty: true})
        .pipe(jsMinify({
            noSource: true, ext: {
                min: '.js'
            },
        }))
        .pipe(dest(PATHS.build.js))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([PATHS.watch.html], html)
    gulp.watch([PATHS.watch.css], css)
    gulp.watch([PATHS.watch.css], cssLayouts)
    gulp.watch([PATHS.watch.js], js)
    gulp.watch([PATHS.watch.assets], assets)
}

function clean() {
    return del(PATHS.clean)
}

const build = gulp.series(clean, gulp.parallel(css, cssLayouts, html, js, assets))
const watch = gulp.parallel(watchFiles, build, browserSync);

exports.css = css;
exports.html = html;
exports.assets = assets;
exports.build = build;
exports.watch = watch;
exports.default = watch;
