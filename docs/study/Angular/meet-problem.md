# 学习angular过程遇到的问题

## 1.Can't bind to 'ngModel' since it isn't a known property of 'input'

解决方案：
```js
import { FormsModule } from '@angular/forms';
```
![problem-1](/study/Angular/problem/problem-1.png)

## 2.No provider for Http 

解决方案：
```js
import { HttpModule } from '@angular/http';
```
![problem-2](/study/Angular/problem/problem-2.png)

## 3.错误如下图片

![problem-3](/study/Angular/problem/problem-3.png)

出现这个错误的话，估计是某一个文件的路径错误了，还有一点值得注意的是，文件的根目录是src，一切以src为准，再去看自己文件的路径

## 4.adminlte在angular4项目中的使用
- 1.首先安装admin-lte
```bash
npm install admin-lte --save
```

- 2.需要引入页面所需要的css，js等文件，如图
![adminlte-1](/study/Angular/problem/adminlte-1.png)

![adminlte-2](/study/Angular/problem/adminlte-2.png)
像图片中的文件最好是下载下来引入，使用网络连接的话，万一没有网了，就很尴尬了

- 3.在本项目中，css，js文件基本都是公共的，所以把这些文件配置在angular-cli.json中，
```js
"styles": [
  "styles.scss",
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/admin-lte/dist/css/AdminLTE.min.css",
  "../node_modules/admin-lte/dist/css/skins/_all-skins.min.css",
  "app/styles/font-awesome.min.css",
  "app/styles/ionicons.min.css"
],
"scripts": [
  "../node_modules/jquery/dist/jquery.min.js",
  "../node_modules/bootstrap/dist/js/bootstrap.min.js",
  "../node_modules/admin-lte/dist/js/app.min.js"
],
```
- 4.设置主体皮肤样式
```html
<body class="hold-transition skin-purple sidebar-mini">
```
如下配置选项

![adminlte-3](/study/Angular/problem/adminlte-3.png)

记住angular4项目的根目录文件是src，所以一些配置的时候需要注意路径问题

## 5.运行ng serve出现错误，描述如下
```error
Tried to find bootstrap code, but could not. Specify either statically analyzable bootstrap code or pass in an entryModule to the plugins options.
Error: Tried to find bootstrap code, but could not. Specify either statically analyzable bootstrap code or pass in an entryModule to the plugins options.
    at Object.resolveEntryModuleFromMain (C:\Users\HD\Desktop\FirstAngular2\node_modules\@ngtools\webpack\src\entry_resolver.js:121:15)
    at AotPlugin._setupOptions (C:\Users\HD\Desktop\FirstAngular2\node_modules\@ngtools\webpack\src\plugin.js:158:54)
    at new AotPlugin (C:\Users\HD\Desktop\FirstAngular2\node_modules\@ngtools\webpack\src\plugin.js:17:14)
    at Object.exports.getWebpackNonAotConfigPartial (C:\Users\HD\Desktop\FirstAngular2\node_modules\angular-cli\models\webpack-build-typescript.js:20:13)
    at new NgCliWebpackConfig (C:\Users\HD\Desktop\FirstAngular2\node_modules\angular-cli\models\webpack-config.js:26:42)
    at Class.run (C:\Users\HD\Desktop\FirstAngular2\node_modules\angular-cli\tasks\serve-webpack.js:20:22)
    at C:\Users\HD\Desktop\FirstAngular2\node_modules\angular-cli\commands\serve.js:108:26
    at process._tickCallback (internal/process/next_tick.js:103:7)、
```
解决方式：

在项目的根目录下有一个main.ts文件，
```js
platformBrowserDynamic().bootstrapModule(AppModule);
  // .then(success => console.log('Bootstrap success'))
  // .catch(err => console.log(err));
```
屏蔽掉后边两句即可


这样的方式调用也可以
```js
let promise = platformBrowserDynamic().bootstrapModule(AppModule);
promise.then(success => console.log('Bootstrap success'))
  .catch(err => console.log(err));
```

这样的方式调用就不可以
```js
 platformBrowserDynamic().bootstrapModule(AppModule);
   .then(success => console.log('Bootstrap success'))
   .catch(err => console.log(err));
```