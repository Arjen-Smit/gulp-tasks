'use strict';

module.exports = function (gulp, config, plugins) {
    return function () {

        if (typeof plugins['include'] == 'undefined') {
            plugins['include'] = plugins.nop;
        }

        return gulp.src(config.headjs.src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('head.min.js'))
            .pipe(plugins.include() )
            .pipe(
                plugins.if(config.production,
                    plugins.uglify(config.headjs.options),
                    plugins.sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.headjs.dest))
            .pipe(plugins.livereload());
    };
};