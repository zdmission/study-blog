# 安装node-sass遇到的问题

实际上是因为被强的原因吧，最好是使用npm install安装，但是安装之前最好把package.json中的node-sass:字段给删除，等待安装完成之后，在拷贝完整的node-sass的包到node-modules目录下即可

### 解决方法：

- 方案一
1. 从以下网址中寻找到对应平台的Binary文件：https://github.com/sass/node-sass/releases，比如Linux下：https://github.com/sass/node-sass/releases/download/v4.7.2/linux-x64-59_binding.node。

2. 设置环境变量：
```
set SASS_BINARY_PATH=$fileLoactionOnYourDisk
```
或者是直接在环境变量中永久配置

3. 然后正常的安装node-sass：
```bash
npm install node-sass
```
或者：
```bash
set SASS_BINARY_PATH=$fileLoactionOnYourDisk && npm install node-sass
```
比如： 
```bash
set SASS_BINARY_PATH=C:\Program Files\nodejs\win32-x64-57_binding.node && npm install -g node-sass
```

- 方案二
在nodejs安装目录下有一个npmrc的文件，

![common](/work/Common/common6.png)

打开添加如下的链接，目的是为了，下载node-sass的时候去淘宝镜像地址去下载，而不是去github上
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
```

- 方案三
直接通过npm安装，但是需要翻墙，否则安装不上或者安装很慢，这种方式要确保已安装node-gyp，windows-build-tools（该包会自动下载和安装python2.7.14和Visual Studio的相关东西）