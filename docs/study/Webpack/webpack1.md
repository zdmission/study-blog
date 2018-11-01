# webpack学习笔记1--概要
webpack是一个模块打包工具，下图是webpack打包的过程

![webpack](/study/Webpack/webpack1.png)

左边的这些方块代表着webpack的一些模块，无论是文件你的后缀名是什么，webpack都视作为一个模块，箭头表示文件之间的依赖关系，有依赖关系的模块群通过webpack打包之后，webpack会对其依赖进行处理，直接打包成浏览器可以直接运行的js，css文件以及真实的图片

**webpack目标：**
- 1.切分依赖树进不同的代码块里，按需加载这些依赖，跟前端的懒加载有点像
- 2.初始化加载时间更少
- 3.任何一个静态资源都可以视作一个模块，在项目中被引用
- 4.整合第三方的类库并可以视他们为一个模块
- 5.在项目中的每个地方都可以自定义做一些想做的事情
- 6.非常适合大型项目


**webpack的不同：**
- 代码分割（coding splitting）
- 加载（loader）
- 插件系统（plugin system，模块热更新）

-D表示--save-dev            -S表示--save

一般的项目上如果不是集成开发环境搭建的话一般没有配置打包工具文件配置，所以需要在你的项目文件下边初始化（npm init），完了之后把需要的打包工具安装在你的项目中，到时候会有一个node-modules文件夹和你的包配置文件（比如package.json）

之后一般安装 
> cnpm install webpack webpack-dev-server --save-dev

安装插件
```bash
cnpm install babel-core babel-loader babel-preset-es2015 babel-preset-latest css-loader eslint eslint-config-enough eslint-loader file-loader html-loader html-webpack-plugin less less-loader sass sass-loader postcss-loader style-loader node-sass url-loader --save-dev

npm install --save lodash loader-utils json5 emojis-list babel-code-frame js-tokens esutils chalk escape-string-regexp

npm install postcss-loader --save-dev

cnpm install autoprefixer --save-dev
```

### webpack配置文件
- 1.webpack有一个默认的配置文件webpack.config.js，这个文件需要手动的创建，位于项目根目录中。可以为一个项目设置多个配置文件，已达到不同的配置文件完成不同的功能。怎么设置后面介绍。
- 2.webpack的配置文件会暴露出一个对象，格式如下：
```js
　module.exports = {
　　　//配置项
　}
```
- 3.常用配置项将要说明
```js
　　　　entry:打包的入口文件，一个字符串或者一个对象
　　　　output:配置打包的结果，一个对象
　　　　fileName：定义输出文件名，一个字符串
　　　　path：定义输出文件路径，一个字符串
　　　　module:定义对模块的处理逻辑，一个对象
　　　　loaders：定义一系列的加载器，一个数组
　　　　　　[
　　　　　　　　{
　　　　　　　　　　test:正则表达式，用于匹配到的文件
　　　　　　　　　　loader/loaders：字符串或者数组，处理匹配到的文件。如果只需要用到一个模块加载器则使用
                  loader：string，如果要使用多个模块加载器，则使用loaders：array
　　　　　　　　　　include:字符串或者数组，指包含的文件夹
　　　　　　　　　　exclude：字符串或者数组，指排除的文件夹
　　　　　　　　}
　　　　　　]
　　　　resolve:影响对模块的解析，一个对象
　　　　extensions：自动补全识别后缀，是一个数组
　　　　plugins:定义插件，一个数组
```
- 4.entry详细说明
    - （1）当entry是一个字符串时，这个字符串表示需要打包的模块的路径,如果只有一个要打包的模块，可以使用这种形式
    - （2）当entry是一个对象
        - a.是数组时,当需要将多个模块打包成一个模块，可以使用这个方式。如果这些模块之间不存在依赖，数组中值的顺序没有要求，如果存在依赖，则要将依赖性最高的模块放在最后面。例如：entry:["./app/one.js",".app/two.js"]
        - b.是键值对形式的对象是，当需要分别打包成多个模块时，可以使用这种方式，例如；
        ```js
        　　　　　　entry:{
        　　　　　　　　module1:"./app/one.js",
        　　　　　　　　module2:["./app/two.js","./app/three.js"]
        　　　　　　}
        ```
        注:当entry是一个键值对形式的对象时，包名就是键名，output的filename不能是一个固定的值，因为每个包的名字不能一样
- 5.output详细说明
    - （1）output是一个对象
    - （2）output.filename:指定输出文件名，一个字符串。当输出一个文件，output.filename为一个确定的字符串
        ```
        　　　　　　如：output:{
        　　　　　　　　　　filename:"build.js"
        　　　　　　　　　　　　}
        　　　　　　当输出多个文件，output.filename不能为一个确定的字符串。为了让每个文件有一个唯一的名字，需要用到下面的变量

        　　　　　　[name] is replaced by the name of the chunk.对应entry的键名

        　　　　　　[hash] is replaced by the hash of the compilation.

        　　　　　　[chunkhash] is replaced by the hash of the chunk.

        　　　　　　如：output:{
        　　　　　　　　　　path:'./build/',
        　　　　　　　　　　fialname:'[name].js'
        　　　　　　　　}
        ```
    - （3）output.path:指定输出文件的路径，相对路径，一个字符串
    - （4）output中还有其他的一些值，不在这里说明,可以在webpack的官方网站中获得更多的详细信息

- 6.module.loaders详细说明
    - （1）module是一个对象，定义对模块的处理逻辑
    - （2）module.loaders是一个数组，定义一系列加载器，这个数组中的每一项都是一个对象
    - （3）
        ```
            module.loaders:[
        　　　　　　　　{
        　　　　　　　　　　test:正则，用于匹配要处理的文件
        　　　　　　　　　　loader/loaders: 字符串或者数组， 如果只需要用到一个模块加载器 ,则使用loader：string，
        　　　　　　　　　　如果要使用多个模块加载器，则使用loaders：array
        　　　　　　　　　　include:字符串或者数组，指包含的文件夹
        　　　　　　　　　　exclude：字符串或者数组，指排除的文件夹
        　　　　　　　　}
        　　　　　　]
        ```
    -   （4）module除了可以配置loaders以外还能配置其他的值,在webpack的官网中获得更多的信息

- 7.resolve.extensions详细说明
    - （1）resolve.extensions并不是必须配置的，当不配置时，会使用默认值["", ".webpack.js", ".web.js", ".js"]，当手动为resolve.extensions设置值，它的默认值会被覆盖
    - （2）如果你想要每个模块都能够按照它们自己扩展名正确的被解析，要在数组中添加一个空字符串。
    - （3）如果你想请求一个js文件但是在请求时不带扩展（如：require('somecode')）,那么就需要将'.js'添加到数组中。其他文件一样
    - （4）resolve还有其他的配置项，在webpack的官网获得更多信息

- 8.补充
    - （1）当设置了配置文件后，在命令行中输入webpack就可按照默认配置文件中的配置项打包模块了。
    - （2）设置多个webpack配置文件。webpack默认的配置文件是webpack.config.js,当在命令行中输入webpack时默认找的webpack.config.js。通过在package.json的scripts中添加例如"start-html":"webpack --config webpack.html.config.js"，在命令行中输入npm run start-html查找的就是webpack.html.config.js，通过这种方式可以实现不同的配置文件有不同的用处，这样就不用反复修改同一个配置文件

- 9.下面是一个简单的配置文件
```js
module.exports = {
    entry:{
        one:"./app/one.js",
        two:"./app/two.js"
    },
    output:{
        path:"./build/",
        filename:"[name].js"
    },
    module:{
        loaders:[
            {
                test:/.*\.css$/,
                loaders:["style","css"],
                exclude:'./node_modules/'
            }
        ]
    },
    resolve:{
        extensions:['','.css','.js','jsx']
    }
};
```
