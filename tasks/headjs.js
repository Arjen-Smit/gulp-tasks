'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
	  	return gulp.src(config.headjs.src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('head.min.js'))
            .pipe(
                plugins.if(config.production,
                    plugins.uglify(config.headjs.options),
                    plugins.sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.headjs.dest))
            .pipe(plugins.livereload());
	}
};