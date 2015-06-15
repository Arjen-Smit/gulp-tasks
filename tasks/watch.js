'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
        config.production = false;
		plugins.livereload.listen();
        gulp.start(config.default_tasks);
        config.default_tasks.forEach(function(task) {
            gulp.watch(config[task].src, [task]);
        })
        return true;
	}
};