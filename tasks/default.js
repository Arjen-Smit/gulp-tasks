'use strict';

module.exports = function(gulp, config) {
    return function() {
        return gulp.start(config.default_tasks);
    };
};
