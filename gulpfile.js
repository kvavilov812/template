const { src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const csso = require('gulp-csso');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
// const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');
//const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config');
const concat = require('gulp-concat');

function server() {
    browserSync.init({
        port: 5500,
        ui: {
            port: 5501,
        },
        server: {
            baseDir: './dist',
        },
    });

    watch('src/html/**/**.html', series(wbpack_dev)).on(
        'change',
        browserSync.reload
    );
    watch('src/scss/**/**.scss', series(wbpack_dev)).on(
        'change',
        browserSync.reload
    );
    watch('src/images/**.**', series(wbpack_dev)).on(
        'change',
        browserSync.reload
    );
    watch('src/fonts/**.**', series(wbpack_dev)).on(
        'change',
        browserSync.reload
    );
    watch('src/js/**/**.js', series(wbpack_dev)).on(
        'change',
        browserSync.reload
    );
}

function fonts() {
    console.log('Making fonts');
    return src('src/fonts/**.**').pipe(dest('dist/fonts'));
}

function images() {
    console.log('Making images');
    return src('src/images/**.**').pipe(dest('dist/images'));
}

function html() {
    console.log('Making htmls');
    return src('src/html/index.html')
        .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest('dist'));
}

function js() {
    console.log('js');
    return src('src/js/**/*.js').pipe(dest('dist/js')); //pipe(uglify()).pipe(dest('dist/js'));
}

function styles() {
    console.log('Checking styles....');
    return src('src/scss/**/**.+(scss|sass)')
        .pipe(
            sass({
                outputStyle: 'compressed',
                includePaths: require('node-reset-scss').includePath,
            }).on('error', sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function clear() {
    return del('dist');
}

function wbpack(mode) {
    webpackConfig.mode = mode;
    console.log('HTML2');
    return src('src/html/index.html')
        .pipe(fileinclude({ prefix: '@@', basepath: './src/html/' }))
        .pipe(dest('dist'))
        .pipe(webpack(webpackConfig))
        .pipe(dest('dist'));
}

function wbpack_dev() {
    return wbpack('development');
}

function wbpack_prod() {
    return wbpack('production');
}

// function build() {}

exports.server = series(clear, images, fonts, wbpack_dev, server);
exports.build = series(clear, images, fonts, wbpack_prod);
exports.clear = clear;

exports.default = series(clear, wbpack_dev, server);
// exports.html2 = series(clear, wbpack);
