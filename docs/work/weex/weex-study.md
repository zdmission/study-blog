# weex初探

1. 执行命令安装
``` bash
npm install weex-toolkit -g
```
过程给出了一个错误：MSBUILD : error MSB4132: 无法识别工具版本“2.0”。可用的工具版本为 "14.0", "4.0"。

### 解决方案：

- 1.管理员权限的Windows PowerShell或CMD，执行npm install --global --production windows-build-tools
- 2.如果没有手动安装过Python则在上面一步自动安装Python后可能需要手动配置一下环境变量，Windows PowerShell或CMD中执行npm config set python python2.7
- 3.重新设置该项目的msvs版本，同样Windows PowerShell或CMD中执行npm config set msvs_version 2015，或者全局的话加个-g，比如（npm config set msvs_version 2015 -g）
然后再重新安装就不会出现刚才的那个错误了

网络超时，请求在客户单根本没有被发出，默认超时设置ios很短，android是3秒，在网络比较差的情况下，很容易超时的，所以需要设置默认的超时设置timeout:20s等等
```js
http://tech.dianwoda.com/2017/12/25/weexshi-yong-guo-cheng-zhong-de-na-xie-keng/
https://www.cnblogs.com/sunjianfei/p/7298950.html
```

[网易严选weex demo](https://github.com/zwwill/yanxuan-weex-demo)


[weex学习](https://github.com/zwwill/blog/issues/3)

[weex插件](http://natjs.com/#/zh-cn/?id=%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)

[weex ui库](https://alibaba.github.io/weex-ui/#/cn/)

[weex从.we转.vue之BroadcastChannel](https://segmentfault.com/a/1190000009885105)


[weex加载本地图片](https://www.sunzhongwei.com/weex-android-ios-loaded-local-pictures)



https://www.cnblogs.com/xiaoqi/p/weex-hackernews-code-part1.html

[weex 一个传说级巨坑-- 2018最新版weex踩坑指南(weex navigator 多界面跳转)](https://blog.csdn.net/jupiterxx/article/details/80026909)

对应三端跳转方式
```js
getJumpBaseUrl(toUrl) {
 
        var bundleUrl = weex.config.bundleUrl;
 
        var isnav = true
        bundleUrl = new String(bundleUrl);
        var nativeBase;
        var native;
        var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
        var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        if (isAndroidAssets) {
            nativeBase = "local://" + 'file://assets/dist/';
            native = nativeBase + toUrl + ".js";
        } else if (isiOSAssets) {
            nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
            native = nativeBase + toUrl + ".js";
        } else {
            var host = 'localhost:8081';
            var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
            if (matches && matches.length >= 2) {
                host = matches[1];
            }
 
            //此处需注意一下,tabbar 用的直接是jsbundle 的路径,但是navigator是直接跳转到新页面上的.
            if (typeof window === 'object') {
                nativeBase = 'http://' + host + '/';
            } else {
                nativeBase = 'http://' + host + '/';
            }
 
            native = nativeBase + toUrl + ".html";
        }
        return native;
    }
```

[weex&ReactNative对比](https://zhuanlan.zhihu.com/p/21677103)
