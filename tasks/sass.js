'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
	  	return gulp.src(config.scss.src)
	  		.pipe(plugins.sass({ 
	  				includePaths : config.scss.includePaths             
	  		}))
	  		.pipe(plugins.moreCss())
	  		.pipe(gulp.dest(config.scss.dest));
	}
};
