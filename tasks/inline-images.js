/**
 * Generate inline scss images task
 */
'use strict';

module.exports = function(gulp, config, plugins) {
    var imageDataURI = require('gulp-image-data-uri');
    var concat = require('gulp-concat');
    var addsrc = require('gulp-add-src');

    return function() {
        return gulp.src(config['inline-images'].src)
            // Create the data uris of the images
            .pipe(imageDataURI({
                template: {
                    file: __dirname + '/inline-images/image-data-uri-template.scss'
                }
            }))
            // Prepend and append scss to make the mixins
            .pipe(addsrc.prepend(__dirname + '/inline-images/_inline-images-prepend.scss'))
            .pipe(addsrc.append(__dirname + '/inline-images/_inline-images-append.scss'))
            // Output to generated scss file
            .pipe(concat('_inline-images.scss'))
            .pipe(gulp.dest('./style/generated'));
    };
};
