'use strict';

module.exports = function (gulp, config, plugins) {
    return function () {
        config.javascript.items.forEach(function(item) {

            if (typeof plugins['include'] == 'undefined') {
                plugins['include'] = plugins.util.noop;
            }

            var result = gulp.src(item.src)
                .pipe(plugins.sourcemaps.init());

            if (item.es2015 === true) {
                // Transpile es2015
                result
                    .pipe(plugins.plumber())
                    .pipe(plugins.babel({presets: ['es2015']}));
            }

            result
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
            
            return result;
        });
    };
};
