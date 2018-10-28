# ionic搭建windows和mac环境需要的东西，配置所需的环境变量

## 一、搭建windows开发环境
1.JAVA_SDK  ，ANDROID_SDK   

2.python2.7版本，，nodejs的安装

3.Git

4.bower

5.Microsoft Visual Studio Express 2013 for Windows Desktop

6.node配置node_global和node_cache
```
npm config set cache "C:\Program Files\nodejs\node_cache"
npm config set prefix "C:\Program Files\nodejs\node_global"
```

7.执行npm install出现
安装ionic出现的错误 node-sass package,

解决方法：安装Python2.7，记得装python的时候设置系统变量

C:\Python27;C:\Python27\Scripts;

## 二、搭建Mac开发环境
mac中搭建ionic，cordova环境

需要安装XCode，git，python2.7，bower，node，安装的时候需要翻墙

```Bash
// 安装 ionic和cordova
npm install -g cordova ionic –registry=https://registry.npm.taobao.org，
```
这些完成之后，打开终端，进入你的项目之下，命令
```bash
// 安装package.json中所需要的依赖包
sudo npm install

// 安装node-sass
sudo npm rebuild node-sass

// 安装部署
sudo npm install -g ios-deploy --unsafe-perm=true

// 安装模拟器
bower install ios-sim

// build项目
sudo ionic build ios
```

// 安装cnpm
> npm install -g cnpm --registry=https://registry.npm.taobao.org
