# ionic2常见问题-camera插件从图库选择照片每次都会弹出权限提示,借鉴他人

问题描述

我的cordova-plugin-camera插件,从图库选择照片每次都会弹出是否允许权限对话框, 如下图

![ionic](/study/Ionic2+/ionic2+11.png)


查看从图库选择照片的源码,发现注释已经说明://FIXME: Stop always requesting the permission,翻译过来就是 "修复我,要不然总是请求权限",源码如下图

![ionic](/study/Ionic2+/ionic2+12.png)


解决方法
群里朋友说插件版本2.1.0不会出现这个问题,于是安装插件
```
ionic plugin add cordova-plugin-camera@2.1.0
```
果然解决了问题

去camera github查看各个版本的源码,确实发现2.1.0后面的版本均有注释//FIXME: Stop always requesting the permission

所以我们暂时就先用2.1.0版本,后面官方应该会修复.目前最新版是2.3.2-dev

解决过程

安装2.1.0版

![ionic](/study/Ionic2+/ionic2+13.png)


重新build一个apk,在手机看是否解决
```bash
ionic platform rm android
ionic platform add android
ionic build android
```