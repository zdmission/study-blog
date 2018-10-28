# cmd规范，sea.js中，使用jquery的问题

使用教程推荐 ： [张鑫旭](http://www.zhangxinxu.com/sp/seajs/#api)

正常使用过程

// 引入sea.js
```js
<script src="sea.js"></script>
<script>
// 配置别名
    seajs.config({
        alias:{
            "jQuery": "./jquery.js",
        }
    });
// 使用定义好的模块
    seajs.use(["./test"]);
</script>
```

下边是test.js模块
```js
define(function(require, exports, module) {
    // 使用jQuery
    var $ = require('jQuery');
    console.log($);
//        exports.sayHello = function() {
//            $('#hello').toggle('slow');
//        };
    });
```

一切都看似很完美，按照官方的教程配置了，但是console.log出来的结果却是 undefined 或者 null，怎么回事儿呢，配置没什么问题啊。

解决方法：
原来是jquery实现了amd规范，但是没有实现cmd规范，在jquery的源码中找不到与cmd相关的字眼，在源码中只找到了amd，我是用的jquery版本是3.2.1，位置大概在10213行，如下图

![JS](/study/JS/JS6.png)


所以呢我们要在jquery中实现 cmd 规范，让渡 $ 符号（即注释的第一种写法）或者返回jQuery对象（即第二种写法）都是可以的，如下图

![JS](/study/JS/JS7.png)


现在很多js的库都在是用 $ 符号，如何不让所有这样的对象冲突呢，要么让渡出 $ 的使用权，像zepto.js就没有让渡这个用法，具体问题具体分析，要么使用 amd 规范，不会有冲突，

var zd = $.noConflict();让渡出来 $ 符号，但是可以新绑定一个名字，功能和 $ 符号一样