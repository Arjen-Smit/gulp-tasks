'use strict';

module.exports = function (gulp, config, plugins) {
    return function () {
        config.javascript.items.forEach(function(item) {

            if (typeof plugins['include'] == 'undefined') {
                plugins['include'] = plugins.util.noop;
            }

            return gulp.src(item.src)
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.concat(item.outputname))
                .pipe(plugins.include() )
                .pipe(
                    plugins.if(config.production,
                        plugins.uglify(item.options),
                        plugins.sourcemaps.write('../maps')
                    )
                )
                .pipe(gulp.dest(item.dest))
                .pipe(plugins.livereload());
        });
    };
};
