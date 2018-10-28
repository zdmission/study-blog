#  ionic cordova 插件 资源

基本都给出了github地址，github里面有demo，可预览

### 1.关于phonegap调试
```
https://www.genuitec.com/products/gapdebug/
```
[phonegap调试](https://www.genuitec.com/products/gapdebug/)

### 2.百度地图定位
```
https://github.com/mrwutong/cordova-qdc-baidu-location
```
[百度地图定位](https://github.com/mrwutong/cordova-qdc-baidu-location)

### 3.禁用ios向后滑返回
```
$ionicConfigProvider.views.swipeBackEnabled(false); //禁用ios向后滑返回----app.js
```

### 4.动态天气图标
```
http://codepen.io/joshbader/pen/EjXgqr
http://www.jqueryrain.com/demo/jquery-weather-plugin/
```

### 5.新用户指引插件
```
http://market.ionic.io/plugins/ng-walkthrough
```
[新用户指引插件](http://market.ionic.io/plugins/ng-walkthrough)

### 6.获取手机号码插件
```
https://github.com/vliesaputra/DeviceInformationPlugin
```
[获取手机号码插件](https://github.com/vliesaputra/DeviceInformationPlugin)

### 7.白名单
```
http://www.cnblogs.com/kuangliu/p/4512187.html
```
[白名单](http://www.cnblogs.com/kuangliu/p/4512187.html)

最新的cordova 5.0 更新了白名单机制，增强了安全性，但是也给我们在开发中带来了很多问题：
当你引入谷歌、百度地图时，会出现 Failed to load resource

解决办法：
```
1.ionic plugin add cordova-plugin-whitelist
2.<meta http-equiv="Content-Security-Policy" c * 'unsafe-eval'; connect-src * 'unsafe-eval';object-src 'self'; style-src * 'unsafe-inline'; img-src *" >
```
注：如果没有使用 ionic ，把它替换成 cordova 就可以了
ps参考：
[1、](http://forum.ionicframework.com/t/failed-to-load-external-scripts-when-running-ionic-emulate-android-or-ionic-run-android/22171/5)
[2、](http://docs.ionic.io/v1.0/docs/cordova-whitelist)
[3、](https://github.com/apache/cordova-plugin-whitelist)

### 8.ionic filter bar
```
https://github.com/djett41/ionic-filter-bar
```
[ionic filter bar](https://github.com/djett41/ionic-filter-bar)

### 9.ionic date picker 日期选择
```
https://github.com/rajeshwarpatlolla/ionic-datepicker
```
[ionic date picker 日期选择](https://github.com/rajeshwarpatlolla/ionic-datepicker)

### 10.ionic time picker 时间选择
```
https://github.com/rajeshwarpatlolla/ionic-timepicker
```
[ionic time picker 时间选择](https://github.com/rajeshwarpatlolla/ionic-timepicker)

### 11.ion-autocomplete
```
https://github.com/guylabs/ion-autocomplete/
```
[ion-autocomplete](https://github.com/guylabs/ion-autocomplete/)

### 12.可滑动切换tab
```
1.https://github.com/saravmajestic/ionic/tree/master/tabbedSlideBox
2.https://github.com/JKnorr91/ion-slide-box-tabs
```

### 13.评分插件
```
https://github.com/fraserxu/ionic-rating
```
[评分插件](https://github.com/fraserxu/ionic-rating)

### 14.滑动自动固定
```
demo：http://codepen.io/Poordeveloper/pen/BNpxrm
https://github.com/Poordeveloper/ion-sticky
```
[滑动自动固定](https://github.com/Poordeveloper/ion-sticky)


### 15.相册点击放大
```
https://github.com/pedroabreu/ion-gallery
```
[相册点击放大](https://github.com/pedroabreu/ion-gallery)

### 16.树形结构
```
https://github.com/fer/ion-tree-list
```
[树形结构](https://github.com/fer/ion-tree-list)

17.酷炫modal动画
```
demo：http://codepen.io/kevincobain2000/pen/EjJzjx
https://github.com/kevincobain2000/ionic-animated-modal
```
[酷炫modal动画](https://github.com/kevincobain2000/ionic-animated-modal)

### 18.右侧字母导航
```
//github地址：
https://github.com/aquint/ion-alpha-scroll
```
[右侧字母导航](https://github.com/aquint/ion-alpha-scroll)