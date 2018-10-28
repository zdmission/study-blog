# ionic项目中遇到的一些问题和处理方法

## 1.计时函数
```
var promise = $interval(function(){
    console.log(123);
},3000);
$scope.$on('$destroy',function(){
    $interval.cancel(promise);
})
```

## 2.ios中禁止数字自动提示成电话号码，在index.html中添加
```
<meta name="format-detection" c />
```

## 3.获取手机屏幕的高宽
```
var availWidth = parseInt($(window).width());
var availHeight = parseInt($(window).height());
```

## 4.http中post请求格式
http中post请求格式
```
var configHeader1={
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
}

var data = {act: 'act_my_bonus'}

$http.post(URL+"person.php?token="+window.localStorage.getItem("loginSessionId"),{"data": JSON.stringify(data)},configHeader1);
```

## 5.ion-refresher和ion-infinite-scroll调用多次的问题
一个页面上，我同时使用了ion-refresher和ion-infinite-scroll用来下拉刷新当前数据以及到底自动获取下一页内容。

偶然发现当ion-refresher下拉刷新之后，页面内容刷出来的一瞬间，infinite的方法被调用了多次，因为页面内容当时还没刷出来，列表一片空白，所以此时页面其实就是已经默认到了最底部了，于是就触发了获取下一页的方法

解决方法也很简单，就是设置一下immediate-check的值
```
<ion-infinite-scroll ng-if="!noMorePage" immediate-check="false" on-infinite="queryNext()" distance="1%"></ion-infinite-scroll>
```

这个设置官方解释是

Whether to check the infinite scroll bounds immediately on load

就是设置是否在页面加载后立刻触发on-infinite的方法，设为false后，则只有滚动到页面边缘时才会触发，即使页面加载出来已经到最底部，不滚动一下的话也是不会触发的

至于$scope.$broadcast('scroll.refreshComplete');和$scope.$broadcast('scroll.infiniteScrollComplete');
广播下拉刷新和滚动触发的停止事件就不多说了，官方都有说明

## 6.list点击跳转后返回，list滚动到了顶部
list跳转后返回无法保持原位置，而是回到了页面顶部，设置如下可解决
```
ion-content元素上的overflow-scroll="true"
```

## 7.设置字体的大小有区别
设置字体的大小，考虑到像素问题，太小了，肉眼看不清楚，android和ios设置的值有时候会有区别，设置的字体小于浏览器最小值时会出现这种情况

## 8.ionic打包过程中的一点bug，原因是构建工具太高级导致的错

ionic打包过程中的一点bug，原因是构建工具太高级导致的错

<font color=red>Error:java.lang.UnsupportedClassVersionError: com/android/dx/command/Main : Unsupported major.minor version 52.0</font>


解决方法：当是是在更新了最新的SDK之后出现的问题，就尝试降低构建版本，在把buildToolsVersion从24.0.0降到23.0.3之后项目就正常了，可以正常运行。

我直接把android sdk目录下的build-tools下的24版本删掉了。

## 9.安装ionic的一些插件，比如ionic-filters-bar，出现的问题
<font color=red>bower invalid-meta The "name" is recommended to be lowercase, can contain digits, dots, dashes</font>

解决方法：看一哈项目里面的bower.json，把name里面的值是大写的改成小写

<font color=red>Bower : ENOGIT git is not installed or not in the PATH</font>

解决方法：因为bower管理的包的源码都是托管在github网站上，配置Git的路径在系统环境变量，path路径

## 10.ion-content的阻尼回弹效果没了
ionic v1.2取消了 ion-content 默认的阻尼回弹效果，明明一模一样的代码，就是没有回弹效果，后来发现是版本更新的锅，

也就是说，v1.2之后想要有阻尼回弹效果，需要这么做：
```
<ion-content overflow-scroll="false" has-bouncing="true"></ion-content>
```

## 11.ionic从1.7.16升级到2.1.0打包出现问题
<!-- <font color=red> -->
WARN: ionic.project has been renamed to ionic.config.json, please rename it.

Uh oh! Looks like you're missing a module in your gulpfile:

Cannot find module 'gulp'

Do you need to run `npm install`?
<!-- </font> -->

解决方法：
```
npm remove ionic
npm install -g ionic@1.7.16
```

## 12.ionic打包出现Error Cannot find module 'plist-native'
After having cloned a Git repository containing a Ionic app, you need to run these 2 commands in order to install the dependencies:
```
npm install

// this will install all the Node.js dependencies in the local node_modules folder. The modules considered are the ones listed under dependencies and devDependencies in the Ionic app package.json.
```
```
ionic state restore
// this command looks at the cordovaPlugins and cordovaPlatforms attributes in the package.jsonfile to restore the app with those platforms and plugins.
```

## 13.热更新问题总结
热更新对于ios，可能会遇见一定的问题，可能不能安装cordova plugin add cordova-hot-code-push-local-dev-addon，这个安装能可能在Xcode打包的时候会报错，其次资源文件找不到路径的，移除android，ios平台，重新添加，ios上config.xml中图片引用地址是反斜杠，把反斜杠改为斜杠，如果ios上界面不跳转，记住Safari浏览器调试，看报错的地方。

## 14.英文换成中文--ios系统的设备，对于一些cordova的插件，比如调用相机，相册，系统原生的键盘，日期，有些操作显示的是英文，比如“cancel”，
英文换成中文-------ios系统的设备，对于一些cordova的插件，比如调用相机，相册，系统原生的键盘，日期，有些操作显示的是英文，比如“cancel”，“done”等等。要求需要用中文来显示，XCode打包的时候，

大部分更改语言设置的建议都是在info.plist文件(即项目的info选项)中设置<font color=red>Localization native development region</font>的字段

该字段默认为en即英文，改为china即可将该app内的软件设为中文

![ionic](/work/Ionic1/ionic4.png)


然而，有些app无效……网上很多地方也没有解答和说明

找了很久终于发现，还要在项目的PROJECT -> Info -> Localizations中添加语言包才可以

![ionic](/work/Ionic1/ionic5.png)

## 15.如果safari中遇到加载资源文件失败，找不到某个资源
file:///var/mobile/Containers/Data/Application/53491A98-DFBD-411E-95E8-D8005B272F0C/Library/Application%20Support/com.jialeme.huidang/cordova-hot-code-push-plugin/2017.02.27-22.21.03/www//css/bootstrap.css.map 

Failed to load resource: 在此服务器上找不到所请求的 URL 

解决方法：

> 把bootstrap.css中最后一行/*# sourceMappingURL=bootstrap.css.map */删除即可