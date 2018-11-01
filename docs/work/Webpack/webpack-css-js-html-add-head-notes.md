# webpack给js，css，html文件添加头部注释

给js，css添加头部注释，webpack自身集成了该插件，[BannerPlugin文档](http://www.css88.com/doc/webpack/plugins/banner-plugin/)

使用如下：这里就不用加什么斜杠，*等等的注释东西，插件会自动的给你添加上
```js
let bannerText = `
  Copyright (c) ${banner.homepage}
  Created by ${banner.author}
  Date ${new Date}  
`
// 使用BannerPlugin并传入参数
new webpack.BannerPlugin({
  banner: bannerText
})
```


给html添加头部注释，这个就需要扩展html-webpack-plugin插件，监听其中的事件，[html-webpack-plugin插件扩展文档](https://github.com/jantimon/html-webpack-plugin#configuration)

![webpack](/work/Webpack/note1.png)

**调用：**

![webpack](/work/Webpack/note2.png)

注意这里就要采用的字符串模板，左边要对其，否则在页面显示就会有很多空格，字符串模板会保留你的所有字符（空格也在其中），还要写上完整的注释