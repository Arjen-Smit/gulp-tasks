'use strict';

module.exports = function (gulp, config) {
    return function () {

        var sourcemaps = require('gulp-sourcemaps');
        var util = require('gulp-util');
        var livereload = require('gulp-livereload');
        var concat = require('gulp-concat');
        var gulpif = require('gulp-if');
        var include = require('gulp-include');
        var uglify = require('gulp-uglify');

        util.log(util.colors.red("bodyjs is depricated:"),"please use the javascript task to replace headjs and bodyjs. support will be dropped in gulp-tasks 4");

        return gulp.src(config.bodyjs.src)
            .pipe(sourcemaps.init())
            .pipe(concat('body.min.js'))
            .pipe(include() )
            .pipe(
                gulpif(config.production,
                    uglify(config.bodyjs.options),
                    sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.bodyjs.dest))
            .pipe(livereload());
    };
};
