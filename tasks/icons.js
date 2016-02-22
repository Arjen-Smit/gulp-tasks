'use strict';

module.exports = function(gulp, config, plugins) {
    return function() {
        return gulp.src(config.icons.src)
            .pipe(plugins.iconfont({
                fontName: 'icon',
                normalize: true,
                fontHeight: 1001 }))
            .on('glyphs', function (glyphs) {
                gulp.src('bower_components/gulp-iconfont-template/_template.scss')
                    .pipe(plugins.consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'icon',
                        fontPath: config.icons.webpath,
                        pseudo: 'before'
                    }))
                    .pipe(plugins.rename('_icon.scss'))
                    .pipe(gulp.dest(config.icons.generatedScss || 'style/generated/'));
            })
            .pipe(gulp.dest(config.icons.dest));
    };
};