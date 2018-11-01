# 多页面抽离非业务逻辑js代码，比如vue，axios等等js文件

鉴于是多页面，如果采用chunks的方式提取出公共文件，减少业务逻辑js文件大小的话是不可取的，最后商定采用webpack中externals方式去实现该需求，例子如下
``` js
externals: {
    axios: 'axios',
    vue: 'window.Vue',
    pushData: 'UserData',
}
```

在我们入口页面html中写法
```html
<script src="./js/vue.min.js"></script>
<script src="./js/axios.min.js"></script>
<script src="./js/UserData.min.js"></script>
```