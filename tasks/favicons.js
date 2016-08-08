'use strict';

module.exports = function(gulp, config) {
    return function() {

    var taskConfig = config.favicons;
    var semver = require('semver');
    var util = require('gulp-util');
    var minNodeVersion = '4.0.0';

    if (semver.gt(process.version.match(/^v(\d+\.\d+\.\d+)/)[1], minNodeVersion) ) {

        var favicons = require('gulp-favicons');

        var options = {
            appName: taskConfig.options.appName || "Connect Holland",
            appDescription: taskConfig.options.appDescription || "Connect Holland",
            background: taskConfig.options.background || "#000",
            path: taskConfig.options.path || "/web/assets/favicons",
            url: taskConfig.options.url || "/",
            html: taskConfig.options.html || "src/snippets/favicon.html"
        }

        return gulp.src(taskConfig.src)
            .pipe(favicons(options))
            .on("error", util.log)
            .pipe(gulp.dest(taskConfig.dest));
        }
        else {
            util.log(util.colors.red("gulp favicons can't run"),"This feature requires Node v" + minNodeVersion + " and you are using Node v" + process.version.match(/^v(\d+\.\d+\.\d+)/)[1] );
            return true;
        }
    }
};