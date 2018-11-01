# 使用express
全局安装expres，应用生成器
```bash
npm install express-generator -g
```

## 问题1：
No default engine was specified and no extension was provided

解决方法：
```js
// 安装模板
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
```

## 问题2：
Failed to lookup view "error" in views directory 

模板为ejs，后缀为html之后发现个别页面打开提示Failed to lookup view "error" in views directory 错误，后面发现是模板里面某个参数没有传入所以出现错误，但是因为views目录下面缺少error文件导致出现这个错误，解决办法就是在模板目录下面创建一个error文件用于输出错误信息。

![express](/work/Nodejs/express1.png)


nodeJS中express框架设置全局跨域请求头
```js
//设置跨域请求头  
router.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  
```

## 问题3：
Request header field userId is not allowed by Access-Control-Allow-Headers in preflight response

解决方式：

![express](/work/Nodejs/express2.png)

 
## 问题4：
Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response

解决方式：

如果哪个没有就设置哪一个

![express](/work/Nodejs/express3.png)

## 问题5： 
express TypeError: invalid media type

解决方式：
```js
// 设置content-type
res.header("Content-Type", "application/json;charset=utf-8")
```