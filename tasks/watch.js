'use strict';

module.exports = function(gulp, config) {
    return function() {

        config.production = false;

        gulp.start(config.default_tasks);
        config.default_tasks.forEach(function(task) {
            if (config[task].watch) {
                gulp.watch(config[task].watch, [task]);
            } else {
                gulp.watch(config[task].src, [task]);
            }
        })
        return true;
    };
};
