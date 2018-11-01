# webpack学习笔记4--自动生成项目中的html

自动生成项目中的html页面，如果已经是创建好的页面，对于js的引用，我们是在手动的引入，有没有不用每次都去修改，而自动的去完成那么路径的设置呢

安装
```bash
cnpm install html-webpack-plugin --save-dev
```
![webpack](/study/Webpack/webpack18.png)

我们的控制台也会有提示，说明插件为我们生成了index.html

![webpack](/study/Webpack/webpack17.png)

在我们的目标文件夹中的index.html文件中的路径也换成了我们生成的文件

![webpack](/study/Webpack/webpack16.png)


可是在实际开发过程中生成的index.html和我们的源文件index.html并没有建立什么关联，插件的使用往往需要我们自定义，传参数等等复杂的操作
建立某种关联，又或者以根目录下的index.html为模板去生成目标文件呢

![webpack](/study/Webpack/webpack15.png)

这次执行，生成了目标文件，文件中除了该有的两个js按需生成的js文件外，还有一个是模板文件中的js引入，如图

![webpack](/study/Webpack/webpack14.png)


js的模板语法

![webpack](/study/Webpack/webpack13.png)

插件的files和options属性
```html
<!--插件htmlWebpackPlugin对象有两个属性files和options--> 
        files           
        options
            
    <div>files的属性及属性值</div>
        publicPath:""                           
        chunks:{"main":{"size":16136,"entry":"js/main-35b8b1d4b24478b347c6.js","hash":"35b8b1d4b24478b347c6","css":[]},"a":{"size":39,"entry":"js/a-d41595b60ca2149e6955.js","hash":"d41595b60ca2149e6955","css":[]}}                           
        js:["js/main-35b8b1d4b24478b347c6.js","js/a-d41595b60ca2149e6955.js"]                            
        css:[]                            
        manifest:                            
    <div>（插件的配置）options属性及属性值</div>
```
这些参数的具体意思可以[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)上详细了解
        
```
template:"C:\\Users\\ZD\\Desktop\\webpack-test\\node_modules\\._html-webpack-plugin@2.28.0@html-webpack-plugin\\lib\\loader.js!C:\\Users\\ZD\\Desktop\\webpack-test\\index.html"
                    
filename:"index.html"                            
hash:false                            
inject:"head"                            
compile:true                            
favicon:false                            
minify:false                            
cache:true                            
showErrors:true                            
chunks:"all"                           
excludeChunks:[]                           
title:"webpack is good"                            
xhtml:false                            
date:"2017-05-13T12:04:23.791Z"
```


需求又变化了，把一部分的js放在head中，一部分的js放在body中
只通过配置文件是做不到的，这是可以使用script标签，其中的src我们可以使用模板语法动态获取，如果jnject的值不是false，那么目标文件中出了按需求引入的javascript文件之外还有自动引入的，如果不想要的话，就设置为inject:"false";

![webpack](/study/Webpack/webpack12.png)



//项目上线后的文件地址和本地相对路径肯定不一样，这时候需要借用publicPath

//可以把publicPath理解成一个占位符,这个时候你在html中引用的js文件路径就会被替换为绝对路径以这个地址开头的路径

publicPath:"http://www.jialeme.com"    如图所示

![webpack](/study/Webpack/webpack4.png)

![webpack](/study/Webpack/webpack5.png)

![webpack](/study/Webpack/webpack6.png)


最后完成比较复杂的实例
```js
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //之前处理的都是单页面应用，entry可以用来处理多一面应用，传入一个对象
    entry:{
            main:'./src/script/main.js',
            a:'./src/script/a.js'
        },
    output:{
        filename:'js/[name]-[chunkhash].js',
        path:path.resolve(__dirname,'dist'),
        //项目上线后的文件地址和本地相对路径肯定不一样，这时候需要借用publicPath
        //可以把publicPath理解成一个占位符,这个时候你在html中引用的js文件路径就会被替换为绝对路径以这个地址开头的路径
        publicPath:"http://www.jialeme.com"
    },
    plugins:[
        new htmlWebpackPlugin({
            //文件命令，也可以附有hash值index-[hash].html
            filename:'index.html',
            //传入一个模板，本文就是根目录下的index.html文件
            template:'index.html',
            //脚本标签放的位置，
            inject:'head',
            //更复杂的需求，在模板中获取到title 的值,可以通过模板语法去获取<%= htmlWebpackPlugin.options.title%>
            title:'webpack is good',
            //任何自定的属性，都可以在模板中通过插件的options对象获取到值
            date:new Date(),
            //对文件进行压缩，minify有很多的参数https://github.com/kangax/html-minifier#options-quick-reference
            minify:{
                //删除注释
                removeComments:true,
                //删除空格，即标签与标签之间的空格
                collapseWhitespace:true
            }
        })
    ]
}
```


### 处理多页面
意味着需要多个模板页面，生成多个目标文件，plugins的参数是数组，就意味着可以有多个值，我们再new几个一样的插件，不就可以了么
一个模板支持三个页面的生成和文件导入呢，有时候出现的问题是生成的几个文件的js文件都是同一个，怎么样才可以让三个页面各自引入自己的js文件呢，使用chunks:['main','a']，另一个new出的插件也可以这样chunks:['main','b'],以此类推

![webpack](/study/Webpack/webpack7.png)

如果我们要生成很多个这样的页面，每次都单独的指定相对应的js，或者其他文件，有什么解决的方法呢，可以使用excludeChunks(就是排除你不必引入的js文件)

![webpack](/study/Webpack/webpack8.png)


再深入一点，想把页面的性能达到极致，把初始化的脚本嵌入到页面，而不是引入到页面，可以提高脚本的加载速度和运行速度，没有http请求，这个怎么做的，原来这个插件是没有考虑到，后来就提意见了，官方就给出了一个[可行的方案](https://github.com/jantimon/html-webpack-plugin/blob/master/examples/inline/template.jade)  如图所示

![webpack](/study/Webpack/webpack9.png)

compilation是webpack自身暴露出来给我们使用的一个索引，引用
assets是打包生成文件的一个对象，传入文件名的路径到这个对象中，我们就可以拿到这个文件的索引，然后在调用source就可以拿到文件内容
htmlWebpackPlugin.files.chunks.main.entry 这个本身带有了publicPath，有路径的，但是compilation.assets没有带，所以我们就要过滤掉publicPath这个路径
执行了这个话htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)的结果便是 js/main-af3e58a084bce5449598.js，
如果我们不去掉publicPath，得到的结果便是http://www.jialeme.com/js/main-af3e58a084bce5449598.js
执行这条js的模板语法便可以在页面内联js代码
```html
<script type="text/javascript">
        <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
    </script>
```
但是在目标文件中还是有main文件引入，怎么去修正呢，对我们的插件参数进行修改，inject:false,

![webpack](/study/Webpack/webpack10.png)

但是同样所有的目标文件中都不会有main和自己要引入的那个js文件，所以还需要处理一下

![webpack](/study/Webpack/webpack11.png)

这样就保证了公用的mian文件是inline方式插入的，而不同的js文件是以外联的形式引入的
```html
<% for(var k in htmlWebpackPlugin.files.chunks){ %>
        <% if(k !== 'main'){ %>
            <script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks[k].entry %>"></script>
        <% } %>
    <% } %>
```