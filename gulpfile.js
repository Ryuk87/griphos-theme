'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var bower = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var zip = require('gulp-zip');
var fs = require('fs');
var json = JSON.parse(fs.readFileSync('./package.json'));

// Serve the files through browser sync
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./",
            middleware: [ historyApiFallback() ]
        }
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
});

// Compile sass assets
gulp.task('sass', function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Extract vendor assets from bower folder
gulp.task('normalize-vendor', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({
            bowerJson: './bower.json',
            flatten: true,
        }))
        .pipe(gulp.dest('./vendor'));
});

// Create a zip archive containing the project
gulp.task('make-archive', function(){
    return gulp.src([
        'css/**/*',
        'images/**/*',
        'js/**/*',
        'vendor/**/*',
        '*.html'], {base: './'})
        .pipe(zip(json.name + '_' + json.version + '.zip'))
        .pipe(gulp.dest('dist'));
});

// Create a distribution file
gulp.task('distribute', ['normalize-vendor', 'sass', 'make-archive']);

// Main task for development
gulp.task('default', ['normalize-vendor', 'serve']);