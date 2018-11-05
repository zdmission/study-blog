# webpack学习笔记5--使用loader去转换代码

### 转换上

1. 使用babel-loader转换ES6代码
- a.指定loader去做相应的转换，除了这种方式还有两种

![webpack](/study/Webpack/webpack19.png)

- b.则是通过在项目的根目录下，创建一个.babelrc文件，然后写上配置
```js
{
"presets":['es2015']
}
```
- c.第三种，在package.json文件中配置
```json
"babel":{
    "presets":['latest']
}
```

webpack打包的时间还是很长的

![webpack](/study/Webpack/webpack20.png)

babel-loader是一个比较耗时的语法转换，怎么去改善它呢

![webpack](/study/Webpack/webpack21.png)


loaders有五个参数，exclude是排除范围（指定某个目录不去处理，因为这个目录已经处理过了），include是需要处理的范围

如果不在exclude或者include后边的路径中加入__dirname+'src/'的话，会报错，如下

![webpack](/study/Webpack/webpack22.png)

所以应该这样写

![webpack](/study/Webpack/webpack23.png)


**给loader指定参数presets**
- 1、直接Loader后跟问号
```js
require('url-loader?mimetype=images/png!./file.png');
```
- 2、配置文件中跟问号
- 3、配置文件中用query
- 4、项目根目录建立babelrc配置文件，配置文件中一个对象，对象中参数为presets.
- 5、config.js中指定babel，babel指定presets.

### 转换下

- 1、path.resolve(__dirname,'app/src')
```
node有个api：path，path有个方法：resolve（解析）。
__dirname：在运行环境下的变量，在当前环境的路径，
'app/src':相对路径
解析完了之后可以得到一个绝对路径
```
- 2、改善方法：
    - （1）改善的代码：exclude:path.resolve(__dirname,'/node_modules/'),include:path.resolve(__dirname,'/src/')
把es6代码转换成浏览器可执行的js代码



















