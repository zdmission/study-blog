# ionic3创建项目和使用命令过程中的一些更改
ionic3和过去有所不同，基于angular框架来编写，语法，目录结构，模块不尽相似，相辅相成

1. 创建app的命令
 
（1）ionic1使用 ionic start 项目名 
模板名(不写的话默认是tabs，可以选择sidemenu，blank)，比如这样
> ionic start ionic-app tabs(这种方式ionic版本是1) 或者 ionic start --type ionic1（这种方式ionic版本是3）

（2）ionic3的方式有点区别，模板页增加了好几个（blank,complex-list,maps,salesforce,sidemenu,tabs）,使用ionic start -l方式查看，如图
![image](http://note.youdao.com/yws/api/personal/file/4573C3943663442096E91F2320EEB84A?method=download&shareKey=69dd2d539e679f68c8a9141404a57460)

> ionic start ionic-app tabs

然后就坐等你的webapp创建成功，这中间下载包和依赖项的时候可能会因为网络的缘故系在出错，可能会翻墙

如果你创建的应用不用于打包成apk或者ipa安装包，那么执行创建命令时需要加上--no-cordova
> ionic start ionic-app tabs --no-cordova

为应用自动生成icon，splash各个尺寸的图片资源，在resources目录下必须有icon.png和splash.png两张图片，首先得有android和ios的平台，添加平台

> cordova platform add ios --save

> cordova platform add android --save

执行命令 ionic cordova resources 就会自动生成了
> ionic cordova resources

可能会出现问题
[WARN] Error occurred during command execution from a CLI plugin
       (@ionic/cli-plugin-cordova). Your plugins may be out of date.
按照错误的描述去更新@ionic/cli-plugin-cordova即可

> sudo npm install --save-dev --save-exact @ionic/cli-plugin-cordova@latest