# cordova安装热更新插件问题及步骤

cordova安装热更新插件问题及步骤

安装CLI：
```bash
// 全局安装cordova-hot-code-push-cli
npm install -g cordova-hot-code-push-cli

//在项目下安装以下两个插件
cordova plugin add cordova-hot-code-push-plugin
cordova plugin add cordova-hot-code-push-local-dev-addon
```

在这一步的时候如果出现安装错误，可用以下办法解决：
- A、安装python2.7，并将C:\Python27加入环境变量
- B、安装VS2013_RTM_DskExp_CHS
下载安装Python2.7，记得配Python2.7环境变量。

装好请先设置npm编译器你要用到的版本 
```bash
npm config set msvs_version 2012 --global
```
安装的时候要带上  --msvs_version
```
npm install -g cordova-hot-code-push-cli --msvs_version
```

安装完成后运行cordova-hcp build，之后www文件夹下面出现chcp.json以及chcp.manifest两个文件




