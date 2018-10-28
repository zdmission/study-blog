# ionic命令行

ionic命令行

更新ionic
```bash
npm update -g ionic
```
```bash
ionic start your_app_name [template]
//创建一个项目，其中template可以是内置的模板类型：blank/sidemenu/tabs（default）三种，也可以是github地址：https://github.com/driftyco/ionic-starter-tabs （这叫ionoic-starter），或者是Codepen starter地址：http://codepen.io/ionic/pen/odqCz

// Ios创建安装运行 （打包需要MAC）
ionic startmyproject
cd myproject
ionic platformadd ios
ionic build ios
ionic emulateios

// Android创建安装运行
ionic startmyproject
cd myproject
ionic platformadd android
ionic buildandroid
ionic emulateandroid (模拟器运行)
ionic runandroid (连接上手机运行) 
```

