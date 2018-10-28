# gulp-uglify压缩js的插件使用

//导入gulp模块
```js
var gulp = require('gulp'),
    uglify = require('gulp-uglify');//导入所需要的模块，本模块是用于压缩js代码的
```
 
//jsmin是任务名称，理论上可以是任何字符，在命令框执行gulp jsmin便可以压缩js代码了
```js
gulp.task('jsmin', function () {
    gulp.src('js/base.js')//要压缩的js文件
        .pipe(uglify({
        	mangle:true,//是否更改
        	compress:true,//是否完全压缩
        	preserveComments:'all'//保留全部注释，默认情况是不保留
        }))
        .pipe(gulp.dest('dist/js'));
});
```

//压缩多个js文件
```js
gulp.task('jsmin', function () {
	//src数组第一个表示压缩js目录下的base.js文件，第二个表示hjs目录下的所有js文件，第三个表示除了test1.js和test.js文件（**表示js目录下的0个或者多个子文件夹）
    gulp.src(['js/base.js','hjs/*.js','!hha/js/**/{test1,test2}.js'])
        .pipe(uglify({
        	mangle:true,//是否更改
        	compress:true,//是否完全压缩
        	preserveComments:'all'//保留全部注释，默认情况是不保留
        }))
        .pipe(gulp.dest('dist/js'));
});
```


//指定变量名不混淆
```js
gulp.task('jsmin', function () {
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
        .pipe(uglify({
            //mangle: true,//类型：Boolean 默认：true 是否修改变量名
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        }))
        .pipe(gulp.dest('dist/js'));
});
```