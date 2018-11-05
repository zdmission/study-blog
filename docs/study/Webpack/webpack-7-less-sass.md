# webpack学习笔记7--less和sass

### 一、less-loader
1、安装：
终端目标文件输入：
```bash
npm i less-loader --save-dev
```
错误提示：<font color=red>npm WARN less-loader@4.0.3 requires a peer of less@^2.3.1 but none was installed.</font>
说明less没有装
2、安装less
终端目标文件输入：
```bash
npm i less --save-dev
```
### 二、less-loader会自己处理@import,就不用再加importLoaders
### 三、sass-loader
1、安装
终端目标文件输入：
```bash
npm i sass-loader --save-dev
```
出现错误提示：
<font color=red>npm WARN sass-loader@6.0.3 requires a peer of node-sass@^4.0.0 but none was installed.</font>

说明需要安装node-sass，解决方法：

终端目标文件输入：
```bash
npm i node-sass --save-dev
```
会有错误提示：<font color=red>npm WARN prefer global node-gyp@3.6.0 should be installed with -g</font>
但是它会自动安装到全局？？？（不确定）

loader比较长，我们也可以简写的loader: 'style!css?importLoader=1!postcss',

//这个时候怎么去判定less-loader在前还是postcss-loader在前呢
loader: 'style!css!postcss!less',

![webpack](/study/Webpack/webpack25.png)

如果我们在less或者sass文件中@import './modal.less'，但是我们并没有在配置文件中加入importLoader，实际上页面都会被加上浏览器前缀，说明less-loader已经帮我们处理了importLoader，但是css是必须要加入importLoader的

![webpack](/study/Webpack/webpack26.png)


