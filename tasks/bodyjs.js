'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
	  	return gulp.src(config.bodyjs.src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('body.min.js'))
            .pipe(
                plugins.if(config.production,
                    plugins.uglify(config.bodyjs.options),
                    plugins.sourcemaps.write('../maps')
                )
            )
            .pipe(gulp.dest(config.bodyjs.dest))
            .pipe(plugins.livereload());
	}
};