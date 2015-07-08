'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
        return gulp.start(config.default_tasks);
	};
};