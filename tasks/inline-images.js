/**
 * Generate inline scss images task
 */
'use strict';

module.exports = function(gulp, config, plugins) {

    return function() {
        return gulp.src(config['inline-images'].src)
            // Create the data uris of the images
            .pipe(plugins.imageDataUri({
                template: {
                    file: __dirname + '/inline-images/image-data-uri-template.scss'
                }
            }))
            // Prepend and append scss to make the mixins
            .pipe(plugins.addSrc.prepend(__dirname + '/inline-images/_inline-images-prepend.scss'))
            .pipe(plugins.addSrc.append(__dirname + '/inline-images/_inline-images-append.scss'))
            // Output to generated scss file
            .pipe(plugins.concat('_inline-images.scss'))
            .pipe(gulp.dest('./style/generated'));
    };
};
