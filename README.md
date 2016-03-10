# Gulp tasks
A collection of configurable tasks that can be used to generate most of the necessary frontend files like css, javascript, fonticons and more…

## Install npm (preferred)

```bash
npm install connectholland-gulp-tasks --save-dev
```

gulpfile.js

```javascript
'use strict';

var gulp = require('gulp');
var taskLoader = require('gulp-simple-task-loader');
var config = require('./config.json');

// Load the tasks usingthe taskloader
taskLoader({
    taskDirectory: 'node_modules/connectholland-gulp-tasks/tasks',
    config: config
}, gulp);

```

## Install bower
Add to bower.json

```json
{
    "dependencies": {
        "gulp-tasks": "https://github.com/ConnectHolland/gulp-tasks.git#^2.0"
    }
}
```
Because this collection of tasks is more npm minded you need to make sure you have all the node modules installed that are required by this package (https://github.com/ConnectHolland/gulp-tasks/blob/master/package.json)

gulpfile.js

```javascript
'use strict';

var gulp = require('gulp');
var taskLoader = require('gulp-simple-task-loader');
var config = require('./config.json');

// Load the tasks usingthe taskloader
taskLoader({
    taskDirectory: 'bower_components/gulp-tasks/tasks',
    config: config
}, gulp);

```

## Configuration
config.json

```json
{
    "default_tasks": [
        "sass",
        "javascript"
    ],
    "install_tasks": ["icons"],
    "production": true,
    "sass": {
        "src": [
            "style/*.scss"
        ],
        "dest": "web/assets/css",
        "watch": [
            "style/**/*.scss"
        ],
        "includePaths": [
            "node_modules/normalize-scss"
        ],
        "autoprefix": [
            "last 2 versions"
        ]
    },
    "javascript": {
        "items": [
            {
                "src": [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/jquery-noconflict/index.js"],
                "outputname": "body.min.js",
                "dest": "web/assets/javascript/"
            }
        ],
        "watch": [
            "javascript/**/*.js"
        ]
    },
    "icons": {
        "src": [
            "icons/*.svg"
        ],
        "dest": "web/assets/fonts/",
        "webpath": "/assets/fonts/"
    }
}
```
This is a basic configuration that can be used as an example to get started on setting this up for your own project

#### default_tasks 
The tasks that will be run if you type `gulp` or `gulp watch` 

#### install_tasks
The tasks that will be run if you type `gulp install`

#### production
if set to true all outputed files are optimized for production when running `gulp`. this setting is overwritten to false if you run `gulp watch`

#### tasks
all the settings for other tasks like sass, javascript & icons are defined below.


## Javascript task

To use the EcmaScript 2015 (ES6) transpiling, add the following dependencies:

```bash
npm install babel-preset-es2015 gulp-babel gulp-plumber --save-dev
```

To enable the javascript linter, add eslint:

```bash
npm install gulp-eslint --save-dev
```

Example configuration:

```json
    "javascript": {
        "items": [
            {
                "src": [
                    "javascript/app.js"
                ],
                "outputname": "app.js",
                "dest": "../../web/assets/javascript/",
                "options": {},
                "es2015": true,
                "lint": true
            }
        ],
    }
```

## Inline images task

With the task inline-images you can create a 'sprite' of inline css images. The task
generates an scss file with the inline-image($name) mixin and .inline-image-* css classes.

Make sure the following packages are available:

```json
    "gulp-add-src": "^0.2.0",
    "gulp-concat": "^2.5.2",
    "gulp-image-data-uri": "^1.2.1",
```

Example configuration of config.json:

```json
    "inline-images": {
        "src": [
            "images/icons2x/*"
        ]
    }
```

