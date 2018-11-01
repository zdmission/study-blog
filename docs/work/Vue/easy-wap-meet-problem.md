# 做一个简单的wap站，展示一些数据，图片，遇到的问题

- 1.字符串处理，后台给的数据是字符串，一般我们会先转换成对象，目前需求是遇到类似这样的数据
```js
//数据
var str = "：\r\n1.根据需求分析文档完成数据库及程序设计；\r\n2.制定开发计划并能够分析解决软件开发过程中的问题。";
    var str1 = `
\r\n1、计算机相关专业全日制本科及以上学历，211，985院校优先，4年以上Java工作经验；
\r\n2、熟练应用多种JAVA设计模式，并在实际的项目中有比较丰富的应用经验；
\r\n3、精通J2EE相关技术，精通spring mvc、mybatis、spring、dubbo等开源技术框架
\r\n4、掌握MySQL数据库的开发、配置、管理、调试，熟练掌握SQL查询优化；
\r\n5、熟练使用svn、git等版本管理工具
\r\n6、有大型互联网公司经验或大型分布式系统开发经验者优先，熟悉分布式消息队列（RabbitMQ、RocketMQ等），分布式缓存（Redis、Memcached），zookeeper等
↵7、强烈的责任心和良好的分析问题、解决问题的能力，良好的沟通能力，良好的职业道德及敬业精神；`
```

我们需要分割字符串，然后放到数组里面，利用正则，匹配（数字. || 数字、）然后分割
```js
var reg = /\d+[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\.]{1}/g;
console.log(str.split(reg));
```

- 2.使用vue1.0在methods定义函数的时候使用的是es6的写法，这就存在一个问题，不是<font color=red>所有的浏览器都支持es6</font>的，可能比较老一点的系统是不支持es6，所以vue中的函数定义和函数调用时不会有效的，所以最好是写成es5语法，如果你的项目中有babel转换，有babel-polyfill，那么你可以尽情的时候比较新的写法，切记

- 3. 背景要色渐变，使用css3的 gradients 但是有兼容问题，比如IE9及以下，所以要使用特别的方法，IE9及以下对rgb支持还是有点异样的，颜色变化比较大，所以最好还是使用十六进制，各大浏览器的写法还有点区别，注意
```css
.gradient {
      background: #000000;
      background: -moz-linear-gradient(top, rgb(0, 32, 46) 0%, rgb(2, 6, 18) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgb(0, 32, 46)), color-stop(100%, rgb(2, 6, 18)));
      background: -webkit-linear-gradient(top, rgb(0, 32, 46) 0%, rgb(2, 6, 18) 100%);
      background: -o-linear-gradient(top, rgb(0, 32, 46) 0%, rgb(2, 6, 18) 100%);
      background: -ms-linear-gradient(top, rgb(0, 32, 46) 0%, rgb(2, 6, 18) 100%);
      background: linear-gradient(to bottom, rgb(0, 32, 46) 0%, rgb(2, 6, 18) 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=#011f2e, endColorstr=#020612, GradientType=0);
      -ms-filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#011f2e,endcolorstr=#020612,gradientType=0);/*IE8*/
    }
```

- 4. 文本对其方式，要想左右对其的话使用 
```css
text-align: justify
```

- 5. 动态改变html文件中的title
使用jquery在ie8及以下会出现 jquery的方法报错，所以还需要使用原生js来写
```js
document.title = "这是你的设置的title"
```


