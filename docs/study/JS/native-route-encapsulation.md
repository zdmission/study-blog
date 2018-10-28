# 原生路由封装
使用jQuery来获取元素

页面布局：
```html
<body>
<a href="#/">主页</a>
<a href="#/news">新闻页</a>
<div id="route-view" style="height:300px;"></div>
</body>
```

js部分：
```js
var route = {
    "#/" : "homepage.html",
    "#/news" : "news.html"
}
// 监测 hashchange 事件
window.addEventListener("hashchange",functiong(){
    console.log("change"+ location.hash);
    if(route[location.hash]){
    // 加载html页面到本页面中
    $("route-view").load(route[location.hash]);
    }
})
```
需要启动本地的服务，你使用的是jQuery来加载页面

但是也可以不使用jQuey的，原生js加载页面也可以
