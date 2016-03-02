# Gulp tasks

Add to bower.json
```json
{
    "dependencies": {
        "gulp-tasks": "https://github.com/ConnectHolland/gulp-tasks.git#^2.0"
    }
}
```

## Javascript task

To use the EcmaScript 2015 (ES6) transpiling, add the following dependencies:
```bash
npm install babel-preset-es2015 gulp-babel gulp-plumber --save-dev
```

Example configuration:
```json
    "javascript": {
        "items": [
            {
                "src": [
                    "bower_components/babel-polyfill/browser-polyfill.js",
                    "javascript/app.js"
                ],
                "outputname": "app.js",
                "dest": "../../web/assets/javascript/",
                "options": {},
                "es2015": true
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

