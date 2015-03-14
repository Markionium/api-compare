var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var sourceFiles = [
    'utils/**/*.js',
    'tests/**/*.js'
];

/**
 * Lint the code for errors
 */
gulp.task('jshint', function () {
    return gulp.src(sourceFiles)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

/**
 * Check code style using jscs
 */
gulp.task('jscs', function () {
    return gulp.src(sourceFiles)
        .pipe($.jscs('./.jscsrc'));

    //TODO: Not yet implemented in jscs but should be there soon(tm)
    // .pipe($.jscs.reporter('jscs-stylish'))
    // .pipe($.jscs.reporter('fail'));
});

gulp.task('check', ['jshint', 'jscs']);