'use strict';

module.exports = function(gulp, config) {
    return function() {
        return gulp.start(config.install_tasks);
    };
};
