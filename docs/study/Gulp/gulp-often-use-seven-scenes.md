# gulp使用常用的7个场景

## 1，启动server，安装gulp-webserver插件，并可以做反向代理（插件http-proxy-middleware）
```js
gulp.task('webserver',function(){
	gulp.src('build/').pipe(
		webserver({
			host:'localhost',
			port:'8000',
			directoryListing:{
				enable:true,
				path:'build'
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
```

## 2.编译scss文件成css，安装插件gulp-sass
```js
gulp.task('packcss',function(){
	gulp.src('./src/style/usage/app.scss')
	.pipe(sass().on('error',sass.logError))
 //$.minifyCss()是利用的（gulp-load-plugins）插件做包管理，但是同时也需要安装gulp-minify-css插件
	.pipe($.minifyCSS())
	.pipe(gulp.dest('./build/style/'))
})
```

## 3.做commonjs模块开发，使用了gulp+webpack配合使用，安装gulp-webpack插件
```js
gulp.task('packjs',function(){
	gulp.src('./src/script/app.js')
//这是一个提取文件名的插件，安装（vinyl-named）插件，使用webpack做模块处理之后的文件会默认一个文件名（main.js），所以我们需要
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
.pipe(gulp.dest('./build/script/'))
})
```

## 4.mock数据，并做方向代理
在全部环境中通过npm方式去安装json-server（它的使用方法查看相关文档），在某个饿目录下json-server  data.txt或者json文件 是可以直接访问的，当时js等文件需要实现commonjs规范，在该js文件去访问其他文件的数据，才能正确解析到，
![gulp](/study/Gulp/gulp5.png)

反向代理

![gulp](/study/Gulp/gulp6.png)


## 5.版本号控制
（浏览器会缓存你的一些文件，那么你下次更新了文件，但是文件的名字还是和原来的一样，那么浏览器就会认为请求过了改文件，就不会再去加载该文件，所以文件里的新内容就不会及时的得到更新，解决方法：可以为你的文件加入版本命名），需要安装gulp-rev-collector和gulp-rev两个插件，rev会根据文件内容做编码，使用md5编码，每次都生成不同的文件名，使用rev生成映射json文件

```js
//	.pipe(rev())
//	.pipe(gulp.dest('./build/script/'))//生成的js文件放置目录，经过md5编码过后的，形如app-hf7868ghfg.js
//	.pipe(rev.manifest())
//	.pipe(gulp.dest('./build/rev/script/'))//生成的rev.manifest.json文件放置目录
```

rev.manifest.json文件顾名思义当然是一个json文件啦
```json
{
"app.js":"app-hf7868ghfg.js",
"app-search.js":"app-search-j78fghfi345fghif.js"
}
```
css文件也类似如此

编译好了加了特殊字符串的命名的js文件，怎么使得html有引用js的路径也跟着变化呢
```js
gulp.task('packhtml',function(){
	gulp.src(['./build/rev/**/*.json','./build/*.html'])
//$.minifyHtml()这个是压缩html文件的插件
	.pipe($.minifyHtml())
	.pipe(revCollector())
	.pipe(gulp.dest('./build'))
})
```
这个时候gulp-rev-collector插件就要登场了，它的作用就是根据已生成的rev.manifest.json，取出json文件中的key值去html页面中寻找是否有和key一样的字符串，如果有，就把json文件该key值对应的value值替换替换掉刚才的那个html中的字符串

## 6,文件合并压缩
安装插件gulp-uglify、gulp-minify-css、gulp-minify-html等文件，然后去做相应的任务即可

## 7.包管理 gulp-load-plugins插件，
```js
var $ = require('gulp-load-plugins')();
```
如果要使用比如压缩等插件的话，需要先安装压缩的插件，然后再用包管理对象去调用压缩插件方法

就可以啦，比如$.minifyHtml()、$.minifyCss()、$.uglify()

## 8.开发环境和生产环境的搭建
有时候我们就需要环境切换配置，minimist可以获取在命令行窗口输入的字符串，

开发环境-------我们就需要动态的去生成一个dev（development开发）文件夹，把所需要执行的文件都打包到这个文件中，然后就可以测试run了，比如，文件的拷贝（html，引入的库文件，图片资源等等），scss的编译，js文件的模块化，这些都需要经过自动化工具的构建，

生产环境-------也会经历开发环境中的几步，但是需要做更多的处理，比如版本号控制，压缩文件等等

怎么判断当前的环境呢（这时候还需要安装gulp-if插件），然后就看你输入什么命令了，minimist插件可以获取你输入的命令，
```js
var minimist = require('minimist');
var gulpif = require('gulp-if');
var knownOptions={
	string:'env',
	default:{env:process.env.NODE_ENV || 'production'}
}
var options = minimist(process.argv.slice(2),knownOptions)
```
现在我们就可以做相应的判断了，比如gulpif(options.env==='production',$.uglify())意思是当前环境是生产环境我们就执行一个压缩js的命令，其他的也类似于这么处理，又比如
```js
gulpif(options.env!=='production',gulp.dest('./dev/script/')) // 不是生产环境等等
```
下边是js代码的处理，css也是如此
```js
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
```

## 9.接下来我们做一个总的打包任务
这个就涉及到gulp的串行与并行工作了，使用插件gulp-sequence或者run-sequence都是可以的

//执行串行并行的工作
```js
```
var sequence = require('gulp-sequence');
gulp.task('pack',function(callback){
	//如何通过gulp来串行，并行工作gulp-sequence或者run-sequence
	//执行过程有些任务需要返回数据来确定任务是否完成
（比如这样

![gulp](/study/Gulp/gulp7.png)

）
	//sequence('clean',['packjs','packcss','copy-libs','copy-img','copy-html'],'packhtml')
这个实在回调函数中，当然可以直接使用if来判断了
	if(options.env == 'production'){
//分清楚每个任务执行的先后循序，有时候是不能乱排的
		sequence('clean',['packjs','packcss','copy-libs','copy-img','copy-html'],'packhtml')(callback)
	}else{
		sequence(['packjs','packcss','copy-libs','copy-img','copy-html'])(callback)
	}
})

最后我们定义一个默认的任务就可以愉快的run了，在命令行窗口中输入
```bash
gulp pack --env production(这个命令是生产环境下执行的)
gulp pack --env development(这个命令是开发环境下执行的，其实我们什么也不输也是可以的，毕竟我们配置过了)
```
![gulp](/study/Gulp/gulp8.png)

var options = minimist(process.argv.slice(2),knownOptions)
只要输入的不是production，那么其他任何情况都默认是dev开发环境

删除我们的某个文件，插件var del = require('del');
//删除build下的文件
```js
gulp.task('clean',del.bind(null,['./build/**/*'],{
	force:true//强制删除
}))
```

最后在你的项目跟目录下的package.json文件中使用npm的scripts配置你的命令，不必每次都在命令行输入很长的命令了，形如

![gulp](/study/Gulp/gulp9.png)

在命令行中执行npm run dev和gulp --env development的结果是一样的