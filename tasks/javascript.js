'use strict';

module.exports = function (gulp, config) {
    return function () {

        var sourcemaps = require('gulp-sourcemaps');
        var util = require('gulp-util');
        var livereload = require('gulp-livereload');
        var plumber = require('gulp-plumber');
        var concat = require('gulp-concat');
        var gulpif = require('gulp-if');
        var include = require('gulp-include');
        var uglify = require('gulp-uglify');
        var babel = require('gulp-babel');

        config.javascript.items.forEach(function(item) {

            var result = gulp.src(item.src)
                .pipe(sourcemaps.init());

            if (item.es2015 === true) {
                // Transpile es2015
                result
                    .pipe(plumber())
                    .pipe(babel({presets: ['es2015']}));
            }

            result
                .pipe(concat(item.outputname))
                .pipe(include() )
                .pipe(
                    gulpif(config.production,
                        uglify(item.options),
                        sourcemaps.write('../maps')
                    )
                )
                .pipe(gulp.dest(item.dest))
                .pipe(livereload());

            return result;
        });
    };
};
