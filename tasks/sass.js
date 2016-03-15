'use strict';

module.exports = function(gulp, config) {

    var shelljs = require('shelljs');
    var util = require('gulp-util');
    if (shelljs.which('scss-lint') !== null) {
        var scssLint = require('gulp-scss-lint');
    } else {
        var scssLint = util.noop;
        util.log(util.colors.red("SCSS linting is disabled"),"to enable this feature please install scss_lint '", util.colors.green("gem install scss_lint"), "'");
    }

    return function() {

        /* define required plugins */
        var sourcemaps = require('gulp-sourcemaps');
        var sass = require('gulp-sass');
        var plumber = require('gulp-plumber');
        var autoprefixer = require('gulp-autoprefixer');
        var gulpIf = require('gulp-if');
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
            .pipe(
                scssLint({
                    'config': '.scss-lint.yml'
                })
            )
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
                gulpIf(config.production,
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
