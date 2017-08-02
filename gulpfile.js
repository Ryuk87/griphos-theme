'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
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

// Main task for development
gulp.task('default', ['sass', 'serve']);