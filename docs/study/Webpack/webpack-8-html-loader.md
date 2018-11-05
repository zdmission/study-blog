# webpack学习笔记8--html-loader

- 1.模板文件可以是任一文件格式的，比如html，string，xml，hy，tpl等等，既可以是自定义的又可以是已经存在的文件格式，
处理模板文件通常的做法是：webpack将模板文件当做一个字符串进行处理，webpack将模板文件当成已经编译好的的模板的处理函数。对js模板语法，模板引擎，模板的作用的认识和了解再来看这章会比较容易理解。我们就可以使用commonjs的规范去引入那个模板文件，
```js
var headerTpl = require('../tpls/header.html'); 
```
headerTpl就得到了那个模板字符串 

在github上关于[webpack常见处理模板的loader](http://webpack.github.io/docs/list-of-loaders.html#templating),解释了每一个loader的作用

html-loader的作用就是把html当做是一个字符串

要支持html文件，安装html-loader，终端目标文件输入：
```bash
npm install html-loader --save-dev
```

要支持.ejs文件或者是.tpl文件，安装ejs，终端目标文件输入：
```bash
npm install ejs-loader --save-dev
```
layer.js载入ejs模板时，返回的是一个function，这时的import tpl from './layer.tpl';中的tpl代表的不再是字符串，表示的是一个已经编译过的函数

layer.tpl模板
```html
<div class="layer">
<div>this is <%= name %> layer </div>
    <% for(var i = 0;i<arr.length;i++){ %>
        <%= arr[i]%>
    <%}%>
</div>
```

在layer.js文件中
```js
import tpl from "./layer.tpl";
function layer(){
    return {
        name:'layer',
        tpl:tpl
    }
}
export default layer;
```

在app.js文件中使用
```js
import Layer from "./component/layer/layer.js";
const App = function(){
    return {
        var dom = document.getElementById('app');
        var layer = new Layer();//layer就是一个对象
        dom.innerHTML = layer.tpl({
            "name":'zd',
            "arr":["zd","lq","xy"]
        })//传入模板中所要的数据
    }
}
new App();//执行
```

现在babel里支持了jsx插件，无论你是使用vue还是react都是可以用jsx语法写代码的，通过babel工具去支持jsx语法，不用重新引入一个loader去处理