# splash screen黑屏白屏,借鉴他人的经验

splash screen黑屏白屏
在 stackoverflow 找到了这个问题描述，简直太贴切了，但是单靠问题下面的回答无法解决白屏问题，还需要改配置文件

最初发现的现象是黑屏（把上面英文描述里的white换成黑），后来找到了原因：主视图容器 ion-nav-view 是空的，而它的背景色是 #000 ，所以修复方法是给里面塞个 ion-view ：
```html
<!-- 内容 --> 
<ion-nav-view> 
    <!-- 防止启动时黑屏 --> 
    <ion-view></ion-view> 
</ion-nav-view> 
```
或者添css，把 ion-nav-view 的背景色改成白色。但问题还没解决，黑屏问题变成白屏问题了，解决方案比较麻烦

把splashscreen插件降级到v2.0.0

v2.0.0之后的版本有bug，目前（2016/1/9）自带的版本是v3.0.0。先cd到项目文件夹，然后命令行：
```bash
// 删掉现有版本 
cordova plugin rm cordova-plugin-inappbrowser 
// 安装v2.0.0 
cordova plugin add cordova-plugin-inappbrowser 
```

改配置文件MyApp/config.xml
```
<preference name="SplashScreen" value="screen"/> 
<preference name="AutoHideSplashScreen" value="false"/> 
<preference name="auto-hide-splash-screen" value="false"/> 
<preference name="ShowSplashScreenSpinner" value="false"/>
<preference name="SplashMaintainAspectRatio" value="true" />
<preference name="SplashShowOnlyFirstTime" value="false"/> 
<preference name="SplashScreenDelay" value="10000"/> 
```
取消自动隐藏（改为代码控制隐藏），把持续时间改为较大的值（10秒），设置每次打开应用都显示splash screen

P.S.默认只有 SplashScreen 和 SplashScreenDelay ，需要把其它的（ SplashMaintainAspectRatio 可选）都添上

改app.js

手动隐藏splash screen，在run里面添上
```js
.run(['$rootScope', function($rootScope) { // init // $rootScope.isLoading = false; // hide splash immediately if(navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
        }
    });
}]) 
```
这样就好了，不要延时调用hide，否则仍然会出现白屏（有些解决方案要求$timeout 50毫秒hide，仍然会出现白屏，不要这样做）
最怨念的问题结束了，看似简单的功能，想要有 完美的原生体验 却很难，奇奇怪怪的问题很难解决，目前可行的解决方案可能过段时间就不行了，可以查看 White page showing after splash screen before app load 感受一下


