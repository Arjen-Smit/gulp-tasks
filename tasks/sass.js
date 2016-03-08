'use strict';

module.exports = function(gulp, config) {
    return function() {

        /* define required plugins */
        var sourcemaps = require('gulp-sourcemaps');
        var util = require('gulp-util');
        var sass = require('gulp-sass');
        var plumber = require('gulp-plumber');
        var autoprefixer = require('gulp-autoprefixer');
        var gulpif = require('gulp-if');
        var moreCss = require('gulp-more-css');
        var livereload = require('gulp-livereload');

        /* function to run on execution */
        return gulp.src(config.sass.src)
            .pipe(plumber({
                errorHandler: function (err) {
                    util.log(util.colors.red('Sass has encountered an error'));
                    util.log(err.messageFormatted);
                    this.emit('end');
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(sass({
                    includePaths : config.sass.includePaths
            }))
            .pipe(autoprefixer({
                browsers: config.sass.autoprefix,
                cascade: true,
                remove: true
            }))
            .pipe(
                gulpif(config.production,
                    moreCss({
                        radical: false
                    }),
                    sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.sass.dest))
            .pipe(livereload());
    };
};
