# Cordova插件，集成ShareSDK，实现分享功能(微信，QQ，QQ空间，新浪微博)

Cordova插件，集成ShareSDK，实现分享功能(微信，QQ，QQ空间，新浪微博)

安装插件，需要申请相应的key
```bash
ionic plugin add https://github.com/raistlinzx/cordova-plugin-sharesdk.git \
    --variable SHARESDK_IOS_APPKEY=<ShareSDK iOS App Key> \
    --variable SHARESDK_ANDROID_APPKEY=<ShareSDK Android App Key> \
    --variable QQAPPID=<QQ App Id> \
    --variable QQAPPKEY=<QQ App Key> \
    --variable WECHATAPPID=<WeChat App Id> \
    --variable WECHATAPPSECRET=<WeChat App Secret> \
    --variable QQURLSCHEME=<QQ Url Scheme For iOS Only> \
    --variable WBAPPKEY=<SinaWeibo App Key> \
    --variable WBAPPSECRET=<SinaWeibo App Secret> \
    --variable WBREDIRECTURL=<SinaWeibo Redirect Url>
```
没有申请的，他们的值就写上value即可，比如这样
```bash
ionic plugin add https://github.com/raistlinzx/cordova-plugin-sharesdk.git --variable SHARESDK_IOS_APPKEY=19790bb9a47c0 --variable SHARESDK_ANDROID_APPKEY=1979114a3ccb6 --variable QQAPPID=1105291449 --variable QQAPPKEY=GYPWbuJhsYb40YkR --variable WECHATAPPID=wxd34114257fd42d3a --variable WECHATAPPSECRET=6cddc1bc833db7ce7209857eca332a35 --variable QQURLSCHEME=QQ41E168B9 --variable WBAPPKEY=3160609626 --variable WBAPPSECRET=ae12dcf8367d1467e43fef42f7221de0 --variable WBREDIRECTURL=http://sns.whalecloud.com/sina2/callback 
```
这个是调用
```js
function test() {
    cordova.exec(function(result) { 
        alert('分享成功');
    }, function(error) { 
        alert('分享失败'); 
        console.debug(error)
    }, "ShareSDK", "share", ['测试分享标题','你们好啊这里是测试分享','http://cdn.qiyestore.com/openapi/upload/2015/12/25/EYZZ17L785.png','http://www.qiyestore.com']);
}
```
目前集成了新浪，QQ，微信这三个如果有不用的分享。可以删除，减少app的体积


