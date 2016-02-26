/**
 * Generate inline scss images task
 */
'use strict';

module.exports = function(gulp, config, plugins) {
    var imageDataURI = require('gulp-image-data-uri');
    var concat = require('gulp-concat');

    return function() {
        return gulp.src(config['inline-images'].src)
            .pipe(imageDataURI({
                template: {
                    file: __dirname + '/templates/image-data-uri-template.scss'
                }
            }))
            .pipe(concat('_inline-images-data.scss'))
            .pipe(gulp.dest('./style/generated'));
    };
};
