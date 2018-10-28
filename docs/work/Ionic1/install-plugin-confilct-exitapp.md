# 可能是插件有冲突，会导致安卓app的闪退

ionic项目安装百度定位的插件，jpush-phonegap-plugin推送插件，可能是插件有冲突，会导致安卓app的闪退，最后利用eclispse导入这个项目，试着去跟踪错误日志，发现了原来是百度定位插件https://github.com/mrwutong/cordova-qdc-baidu-location这个github上的地址，说缺少liblocSDK4d.so这个文件，最后的解决方法是定位插件安装好了之后，在plugins目录下找到该插件的位置，之后在百度定位sdk的官网下载最新的sdk

![ionic](/work/Ionic1/ionic1.png)

把ionic项目中的

![ionic](/work/Ionic1/ionic2.png)

这个android目录下的文件全部覆盖即可。
