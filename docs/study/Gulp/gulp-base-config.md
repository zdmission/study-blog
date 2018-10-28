# gulpfile.js文件的基本配置

```js
var gulp = require('gulp');
var webserver = require('gulp-webserver');
//引入gulp-webpack包
var webpack = require('gulp-webpack');

//文件名提取包
var named = require('vinyl-named');

//引入gulp-sass的包
var  sass = require('gulp-sass');

var proxy = require('http-proxy-middleware');

//版本号控制相关包
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");

//删除build下的文件
var del = require('del');

//执行串行并行的工作
var sequence = require('gulp-sequence');

//gulp loader包
var $ = require('gulp-load-plugins')();

//需要环境切换配置,minimist获取控制台中输入的参数
var minimist = require('minimist');
var gulpif = require('gulp-if');
var knownOptions={
	string:'env',
	default:{env:process.env.NODE_ENV || 'production'}
}
var options = minimist(process.argv.slice(2),knownOptions)

gulp.task('copy-html',function(){
	gulp.src('src/*.html')
	.pipe(gulpif(options.env === 'production', gulp.dest('./build')))
    .pipe(gulpif(options.env !== 'production', gulp.dest('./dev')))
})

//给html增加版本号
gulp.task('packhtml',function(){
	gulp.src(['./build/rev/**/*.json','./build/*.html'])
	.pipe($.minifyHtml())
	.pipe(revCollector())
	.pipe(gulp.dest('./build'))
})

gulp.task('webserver',function(){
	gulp.src('dev/').pipe(
		webserver({
			host:'localhost',
			port:'8000',
			directoryListing:{
				enable:true,
				path:'dev'
			},
			livereload:true,
			middleware:[
				//配置发现代理
				proxy('/mock',{
					//看见地址中有mock，就直接转向target这个地址，如果mock后边还有字符串，就直接拼接到target地址的后边
					target:'http://localhost:3000',
					//是否切换域名
					changeOrigin:true,
					//遇到/mock就把这个字符串干掉，置为空
					pathRewrite:{
						'^/mock':''
					}
				}),
				proxy('/api',{
					//看见地址中有mock，就直接转向target这个地址，如果mock后边还有字符串，就直接拼接到target地址的后边
					target:'https://m.lagou.com',
					//是否切换域名
					changeOrigin:true,
					//遇到/mock就把这个字符串干掉，置为空
					pathRewrite:{
						'^/api':''
					}
				})
			]
		})
	)
})

gulp.task('watch',function(){
	gulp.watch('./src/*.html',['copy-index'])
	gulp.watch('./src/script/**/*.js',['packjs'])
	gulp.watch('./src/script/**/*.string',['packjs'])
	gulp.watch('./src/style/usage/**/*.scss',['packcss'])
	gulp.watch('./src/images/**/*',['copy-img'])
})

gulp.task('packjs',function(){
	gulp.src('./src/script/app.js')
	.pipe(named())
	.pipe(webpack({
		output:{
			filename:'[name].js'
		},
		module:{
			loaders:[
				{
					test:/\.js$/,
					loader:'imports-loader',
					exclude:'./node_modules'
				},
				{
					test:/\.string$/,
					loader:'string-loader',
					exclude:'./node_modules'
				}
			]
		}
	}))
//	.pipe($.uglify())
//	//根据文件内容做编码，使用md5编码，每次都生成不同的文件名，使用rev生成映射json文件
//	.pipe(rev())
//	.pipe(gulp.dest('./build/script/'))//生成的js文件放置目录
//	.pipe(rev.manifest())
//	.pipe(gulp.dest('./build/rev/script/'))//生成的rev.manifest.json文件放置目录

	.pipe(gulpif(options.env==='production',$.uglify()))
	//根据文件内容做编码，使用md5编码，每次都生成不同的文件名，使用rev生成映射json文件
	.pipe(gulpif(options.env==='production',rev()))
	.pipe(gulpif(options.env==='production',gulp.dest('./build/script/')))
	.pipe(gulpif(options.env!=='production',gulp.dest('./dev/script/')))
	.pipe(gulpif(options.env==='production',rev.manifest()))
	.pipe(gulpif(options.env==='production',gulp.dest('./build/rev/script/')))
})

//编译scss文件
gulp.task('packcss',function(){
	gulp.src('./src/style/usage/app.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulpif(options.env === 'production', $.minifyCss()))
	.pipe(gulpif(options.env==='production',rev()))
	.pipe(gulpif(options.env==='production',gulp.dest('./build/style/')))
	.pipe(gulpif(options.env!=='production',gulp.dest('./dev/style/')))
	.pipe(gulpif(options.env==='production',rev.manifest()))
	.pipe(gulpif(options.env==='production',gulp.dest('./build/rev/style/')))
	.pipe(gulpif(options.env!=='production',gulp.dest('./dev/rev/style/')))
})

//拷贝字体图标
gulp.task('copy-img',function(){
	gulp.src('./src/images/**/*')
	.pipe(gulpif(options.env === 'production', gulp.dest('./build/images')))
    .pipe(gulpif(options.env !== 'production', gulp.dest('./dev/images')))

})
//拷贝libs目录下的文件
gulp.task('copy-libs',function(){
	gulp.src('./src/script/libs/*')
		.pipe(gulpif(options.env === 'production', gulp.dest('./build/script/libs')))
    	.pipe(gulpif(options.env !== 'production', gulp.dest('./dev/script/libs')))

})

//删除build下的文件
gulp.task('clean',del.bind(null,['./build/**/*'],{
	force:true
}))

//接着做一个总的pack任务，总打包
gulp.task('pack',function(callback){
	//如何通过gulp来串行，并行工作gulp-sequence或者run-sequence
	//执行过程有些任务需要返回数据来确定任务是否完成
	//sequence('clean',['packjs','packcss','copy-libs','copy-img','copy-html'],'packhtml')
	if(options.env == 'production'){
		sequence('clean',['packjs','packcss','copy-libs','copy-img','copy-html'],'packhtml')(callback)
	}else{
		sequence(['packjs','packcss','copy-libs','copy-img','copy-html'])(callback)
	}
})

gulp.task('default',['pack','webserver','watch'],function(){
	console.log("done...");
})

//做任务先后顺序
//拷贝js css html pack js css并行
//之后在pack html

//干掉生成的所有文件，再生成一套完整的文件
```