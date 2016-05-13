var browserify = require('gulp-browserify'),
    gulp = require('gulp'),
    minifier = require('gulp-minifier'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver');


gulp.task('dist/angular-nadobit-wysiwym.js', function() {
    return gulp.src('src/angular-nadobit-wysiwym.js')
        .pipe(browserify({debug: true}))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'));
});


gulp.task('dist/angular-nadobit-wysiwym.min.js', gulp.series(
    'dist/angular-nadobit-wysiwym.js',
    function() {
        return gulp.src('dist/angular-nadobit-wysiwym.js')
            .pipe(minifier({
                minify: true,
                minifyJS: true,
                collapseWhitespace: true,
            }))
            .pipe(rename('angular-nadobit-wysiwym.min.js'))
            .pipe(gulp.dest('dist'));
    }
));

gulp.task('build', gulp.parallel(
    'dist/angular-nadobit-wysiwym.min.js'
));

gulp.task('dev', gulp.series(
    'build',
    function() {

        gulp.watch('src/**/*.js', gulp.series('build'));

        gulp.src('.').pipe(webserver({
            host: '0.0.0.0',
            port: 8001,
        }));

    }
));
