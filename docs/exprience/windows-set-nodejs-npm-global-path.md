# windows操作，比如Path，设置一些立即生效的变量等

## 1.Windows 系统下设置Nodejs NPM全局路径

Windows下的Nodejs npm路径是appdata，很不爽，想改回来，但是在cmd下执行以下命令也无效
```
npm config set cache "C:\Program Files\nodejs\node_cache"
npm config set prefix "C:\Program Files\nodejs\node_global"
```
最后在nodejs的安装目录中找到node_modules\npm\.npmrc文件

修改如下即可：
```
prefix = C:\Program Files\nodejs\node_global
cache = C:\Program Files\nodejs\node_cache
registry = https://registry.npm.taobao.org
```

## 2.修改windows环境变量立即生效
以修改环境变量“PATH”为例，修改完成后，进入DOS命令提示符，
```
// 输入：
set PATH=路径
```
关闭DOS窗口。再次打开DOS窗口，
```
// 输入
echo %PATH% 
```
可以发现“我的电脑”->“属性”->“高级”->“环境变量”中设置的 PATH 值已经生效。

不用担心DOS窗口中的修改会影响环境变量的值，DOS窗口中的环境变量只是Windows环境变量的一个副本而已。但是对副本的修改却会引发Windows环境变量的刷新，这正是我们想要的!

修改环境变量之后，如果受影响的是应用程序，那么只要简单地重新启动此应用程序，环境变量的修改就会反映到该程序中，而不必重新启动计算机；但是，如果受影响的是系统服务，就必须重新启动才能将环境变量的修改反映到系统服务中（因为没有办法在不重启计算机的情况下重新启动系统服务管理器）

## 3.FAT32转换成NTFS

打开cmd或者WIN+R

输入如下命令convert x: /fs:ntfs(x为U盘的盘符)，回车运行即可。