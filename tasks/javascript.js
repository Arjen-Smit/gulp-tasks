'use strict';

module.exports = function (gulp, config) {
    return function () {
        /**
         * Add linter with configuration to an item
         *
         * @param {type} result
         * @param {type} item
         * @returns {unresolved}
         */
        var addLinter = function (result, item) {
            var eslint = require('gulp-eslint');
            var eslintOptions = {
                extends: 'eslint:recommended',
                envs: ["browser"],
                rules: {
                    "no-console": 1,
                    "no-unused-vars": 1,
                    "no-undef": 1
                },
                globals: {
                    "jQuery": false
                }
            };

            if (item.es2015 === true) {
                eslintOptions.envs = ["es6", "browser"];
            }

            result
                .pipe(eslint(eslintOptions))
                .pipe(eslint.format())
                .pipe(eslint.failAfterError());
            return result;
        };

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

            if (item.eslint) {
                addLinter(result, item);
            }

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
