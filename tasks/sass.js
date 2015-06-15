'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
	  	return gulp.src(config.sass.src)
        .pipe(plugins.sourcemaps.init())
	  		.pipe(plugins.sass({
	  				includePaths : config.sass.includePaths
	  		}))
            .pipe(plugins.autoprefixer({
	            browsers: config.sass.autoprefix,
	            cascade: true,
	            remove: true
	        }))
            .pipe(
                plugins.if(config.production,
                    plugins.moreCss(),
                    plugins.sourcemaps.write('../maps')
                )
            )
	  		.pipe(gulp.dest(config.sass.dest))
			.pipe(plugins.livereload());
	}
};