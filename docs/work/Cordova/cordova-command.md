# cordova命令行操作

cordova命令行操作

安装 cordova：
```bash
npm install -g cordova
```

```bash
// 创建应用程序
cordova create hello com.example.hello HelloWorld

// 添加平台
cordova platform add android
cordova platform add ios

// 完成后运行以下命令查看：
cordova platfrom list

// 移除Android平台支持
cordova platform rm android

// 运行以下命令编译应用程序：
cordova build

// 或
cordova build android  //只针对Andorid平台编译

// 实际上build命令相当于以下两个命令：
cordova prepare android
cordova compile android

// 启动模拟器：
cordova emulate android

// 添加插件：
// 可以用CLI搜索可用的插件：
cordova plugin search bar code

// 安装插件，比如:
cordova plugin add org.apache.cordova.device                   //设备API
cordova plugin add org.apache.cordova.network-information  //网络（事件）
cordova plugin add org.apache.cordova.battery-status      //电池（事件）
cordova plugin add org.apache.cordova.device-motion     //加速器
cordova plugin add org.apache.cordova.device-orientation     //罗盘
cordova plugin add org.apache.cordova.geolocation         //定位
cordova plugin add org.apache.cordova.camera                 //摄像头
cordova plugin add org.apache.cordova.media-capture     //媒体文件处理
cordova plugin add org.apache.cordova.media                   //媒体文件处理
cordova plugin add org.apache.cordova.file                        //文件访问
```