'use strict';

module.exports = function(gulp, config) {
    return function() {

        var livereload = require('gulp-livereload');

        config.production = false;
        livereload.listen();
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
