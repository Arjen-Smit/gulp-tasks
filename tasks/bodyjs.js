'use strict';

module.exports = function (gulp, config, plugins) {
    return function () {

        if (typeof plugins['include'] == 'undefined') {
            plugins['include'] = plugins.util.noop;
        }

        return gulp.src(config.bodyjs.src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('body.min.js'))
            .pipe(plugins.include() )
            .pipe(
                plugins.if(config.production,
                    plugins.uglify(config.bodyjs.options),
                    plugins.sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.bodyjs.dest))
            .pipe(plugins.livereload());
    };
};
