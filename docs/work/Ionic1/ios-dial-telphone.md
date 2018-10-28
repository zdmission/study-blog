# 拨打电话android vs ios

拨打电话android vs ios

ios拨打电话有时候会失灵，最好是安装一个拨打电话的插件
```
cordova plugin add https://github.com/Rohfosho/CordovaCallNumberPlugin.git
```
```JS
window.plugins.CallNumber.callNumber(onSuccess, onError, $scope.HDTel);
function onSuccess(){

}
function onError(){

}
```

android上面是可以的,以前的很多打电话的插件ios上都不能使用
