'use strict';

module.exports = function(gulp, config) {

    var shelljs = require('shelljs');
    var util = require('gulp-util');
    // Check if linting is available and not disabled
    if (shelljs.which('scss-lint') !== null && config.sass.linting.enabled !== false) {
        var scssLint = require('gulp-scss-lint');

        // Find the correct config file for the linter
        var configfile = __dirname + '/sass/.scss-lint.yml';
        if (shelljs.test('-f', config.sass.linting.configfile)) {
            configfile = config.sass.linting.configfile;
        } else if (shelljs.test('-f', '.scss-lint.yml')) {
            configfile = '.scss-lint.yml';
        }

        util.log(util.colors.green("SCSS linting is enabled:"),"using:", util.colors.bold(configfile));

    } else {
        var scssLint = util.noop;
        if (config.sass.linting.enabled === false) {
                util.log(util.colors.red("SCSS linting is disabled"),"this feature is disabled in the config.json");
        } else {
            util.log(util.colors.red("SCSS linting is disabled"),"to enable this feature please install scss_lint '", util.colors.green("gem install scss_lint"), "'");
        }
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
                    'config': configfile
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
