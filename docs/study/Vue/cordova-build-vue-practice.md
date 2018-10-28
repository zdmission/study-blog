# cordova打包vue实践

1.创建一个cordova的项目，创建项目的过程就不细说了，百度一下你就知道了
![cordova-1](/study/Vue/cordova/cordova-1.png)

2.创建一个vue项目，创建项目的过程就不细说了，百度一下你就知道了
![cordova-2](/study/Vue/cordova/cordova-2.png)

3.把vue的目录拷贝到cordova项目的根目录下
4,修改vue项目中的 config/index.js 文件
![cordova-3](/study/Vue/cordova/cordova-3.png)
目的上让vue项目build之后的文件直接放在了cordova项目的www目录下，就会覆盖原来的html，js，css等文件，最好是把cordova项目中www目录下的文件全部删除

5. 修改vue项目下的index.html文件
在head标签里加入
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
// 在<div id="app"></div>下加入cordova.js
<script type="text/javascript" src="cordova.js"></script>
```

如下图

![cordova-4](/study/Vue/cordova/cordova-4.png)

6.修改main.js文件，如下

![cordova-5](/study/Vue/cordova/cordova-5.png)

7.如果路由不生效的话，修改项目下 src/router/index.js 把路由的模式换成hash

![cordova-6](/study/Vue/cordova/cordova-6.png)

### 在mac上遇到问题
Error: Cannot read property 'reeplace' of undefined
解决方法：

在你的cordova项目的根目录下，  
```bash
cd platforms/ios/cordova && npm install ios-sim
```
在终端build成功但是不能开启模拟器，换个方式，在 xcode 编辑器中运行就可以