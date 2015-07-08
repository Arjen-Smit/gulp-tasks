'use strict';

module.exports = function(gulp, config, plugins) {
  	return function() {
  		var gutil = plugins.util;

  		var mainTasklist = [
  			{task: "help   ", description: "Show these instructions"},
            {task: "install", description: "Build all pre-generated files like sprites or iconfonts"},
  			{task: "default", description: "Executing all the tasks for production"},
  			{task: "watch  ", description: "Executing without minifying and adding watchers to monitor for change"}
  		];

  		var seperateTasklist = [
  			{task: "sass", description: "PreProcess all the sass/scss code to css "},
  			{task: "icons", description: "Generate a font and a scss file that can be used in your project"},
  			{task: "headjs", description: "Concatinates all the JavaScript that will be loaded in the head"},
  			{task: "bodyjs", description: "Concatinates all the JavaScript that will be loaded in the body"}
  		];

  		gutil.log('');
		gutil.log(gutil.colors.red.bold('[Connect Holland]'),
  	 		gutil.colors.cyan('gulp documentation'));

		gutil.log('');
		gutil.log('Before running any of these tasks make sure you run', gutil.colors.cyan.bold('npm install'), 'and', gutil.colors.cyan.bold('bower install'), 'to make sure all the external sources are loaded');

		gutil.log('');
		gutil.log(gutil.colors.magenta.bold('Main tasks'));

  		mainTasklist.forEach(function(task) {
  			gutil.log(
  				gutil.colors.magenta('gulp'),
  				gutil.colors.cyan(task.task),
  				'\t' + task.description
  			)
  		});
  		gutil.log('');
  		gutil.log(gutil.colors.magenta.bold('Seperate tasks'));

		seperateTasklist.forEach(function(task) {
  			gutil.log(
  				gutil.colors.magenta('gulp'),
  				gutil.colors.cyan(task.task),
  				'\t' + task.description
  			)
  		});
		gutil.log('');
  		gutil.log('Written by Arjen Smit');

  		return {};
  	};
};