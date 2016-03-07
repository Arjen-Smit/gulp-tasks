/**
 * Generate inline scss images task
 */
'use strict';

module.exports = function(gulp, config) {
    return function() {

        var imageDataUri = require('gulp-image-data-uri');
        var addSrc = require('gulp-add-src');
        var concat = require('gulp-concat');

        return gulp.src(config['inline-images'].src)
            // Create the data uris of the images
            .pipe(imageDataUri({
                template: {
                    file: __dirname + '/inline-images/image-data-uri-template.scss'
                }
            }))
            // Prepend and append scss to make the mixins
            .pipe(addSrc.prepend(__dirname + '/inline-images/_inline-images-prepend.scss'))
            .pipe(addSrc.append(__dirname + '/inline-images/_inline-images-append.scss'))
            // Output to generated scss file
            .pipe(concat('_inline-images.scss'))
            .pipe(gulp.dest('./style/generated'));
    };
};
