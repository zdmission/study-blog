# gulp常用插件列表

- 1.编译Sass (gulp-ruby-sass)
- 2.Autoprefixer (gulp-autoprefixer)
- 3.缩小化(minify)CSS (gulp-minify-css)
- 4.JSHint (gulp-jshint)
- 5.拼接 (gulp-concat)
- 6.丑化(Uglify) (gulp-uglify)
- 7.图片压缩 (gulp-imagemin)
- 8.即时重整(LiveReload) (gulp-livereload)
- 9.清理档案 (gulp-clean)
- 10.图片快取，只有更改过得图片会进行压缩 (gulp-cache)
- 11.更动通知 (gulp-notify)

可以一次性执行，在项目安装，便于测试
```bash
npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
// --save-dev的意思是把信息添加到devDependencies，表示开发时依赖的包裹
// --save的意思是把信息添加到Dependencies，表示发布时依赖的包裹
```
如果不需要把包信息加入到package.json中，就不必写--save-dev或者--save，没有package.json也行

在gulpfile.js中载入
```js
var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
```