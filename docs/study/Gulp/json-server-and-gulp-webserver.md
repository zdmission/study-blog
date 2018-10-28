# gulp使用json-server和gulp-webserver做反向代理实现ajax的跨域拉取数据

**json-server顾名思义，数据服务，通过模拟真实的API实现拉取数据**

安装
```bash
npm i json-server -g
```
成功如下

![gulp](/study/Gulp/gulp1.png)

然后你可以在某个目录下开启服务，比如json-server ./src/mock/mock.js那么这个项目的这个路径下，js等某些文件必须要符合node的规范

![gulp](/study/Gulp/gulp2.png)

才可以启动服务，观测文件的变化，访问到数据

否则就会出现如下错误

![gulp](/study/Gulp/gulp3.png)

对于json文件或者txt文件，是可以直接观测的

![gulp](/study/Gulp/gulp4.png)

下面利用gulp-webserver做反向代理

首先需要在本项目中安装
```bash
npm i http-proxy-middleware gulp-webserver -D(代表--save-dev)
```

然后做如下配置
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
					//看见地址中有api，就直接转向target这个地址，如果api后边还有字符串，就直接拼接到target地址的后边
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
这个时候我们做ajax请求数据的时候就可以获取到另一个域名的数据，从而实现了ajax跨域请求，如下例子
```js
$.ajax({
	url:'/api/listmore.json',
	data:{
		pageNo:3,
		pageSize:15
	},
	success:function(res){
		var dataResource = res.content.data.page.result;
		var str = '';
		for(var i in dataResource){
			str+='<li>\
				<div><img src="http://www.lgstatic.com/'+dataResource[i].companyLogo+'"/></div>\
				<div>\
					<h2>'+dataResource[i].companyName+'</h2>\
					<p>'+dataResource[i].positionName+'</p>\
					<span>'+dataResource[i].createTime+'</span>\
				</div>\
				<div>'+dataResource[i].salary+'</div>\
			</li>';
		}
		console.log(str);
		$(".m-index section ul").html(str);
	}
})
```
我们的webserver服务检测到url中有api字符串，就会转向代理中的tagert地址，并把api后边的字符串附加在target地址的后边，我们实际请求的是https://m.lagou.com/listmore.json?pageNo=2&pageSize=15却是这个地址