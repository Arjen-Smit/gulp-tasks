'use strict'; var gulp = require('gulp'); var taskLoader = require('gulp-simple-task-loader'); var config = require('./config.json'); 
// Load the tasks usingthe taskloader taskLoader({
    taskDirectory: 'node_modules/connectholland-gulp-tasks/tasks',
    config: config
}, gulp);
