'use strict';

module.exports = function(gulp, config) {
    return function() {

        var iconfont = require('gulp-iconfont');
        var consolidate = require('gulp-consolidate');
        var rename = require('gulp-rename');

        return gulp.src(config.icons.src)
            .pipe(iconfont({
                fontName: 'icon',
                normalize: true,
                fontHeight: 1001 }))
            .on('glyphs', function (glyphs) {
                gulp.src(__dirname + '/icons/_template.scss')
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'icon',
                        fontPath: config.icons.webpath,
                        pseudo: 'before'
                    }))
                    .pipe(rename('_icon.scss'))
                    .pipe(gulp.dest(config.icons.generatedScss || 'style/generated/'));
            })
            .pipe(gulp.dest(config.icons.dest));
    };
};
