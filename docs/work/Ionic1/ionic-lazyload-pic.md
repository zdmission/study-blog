# ionic图片懒加载

ionic图片懒加载

js文件在目录文件夹下
- 1、确定使用的是ionic-image-lazy-load 架构Git地址：
```
https://github.com/paveisistemas/ionic-image-lazy-load 
```
首先是先将下载的ionic-image-lazy-load.js 引入到项目中；
```js
<scriptsrc="js/ionic-image-lazy-load.js"></script>
```

- 2、常用主要的参数说明
    - 2.1 设置lazy-scroll参数缺少了这个参数就监听不到滚动事件，image-lazy-distance-from-bottom-to-load="100"就没有效果；
    ```html
    <ion-contentlazy-scroll>
    ```

    - 2.2 image-lazy-src/image-lazy-distance-from-bottom-to-load 含义
    ```
    image-lazy-src加载的图片链接； 

    image-lazy-distance-from-bottom-to-load滚动到底部的距离才加载图片链接； 

    image-lazy-distance-from-right-to-load类同距离右边的距离才加载；
    <img image-lazy-src="{{item.thumbnail}}"image-lazy-loader="lines"image-lazy-distance-from-bottom-to-load="100">
    ```

image-lazy-loader主要的是在加载过程中出现的动画效果，源码如下，这个可以配置， 
可以改为Android/iOS等等；
```js
if ($attributes.imageLazyLoader) {                       
    loader = $compile('<div class="image-loader-container"><ion-spinner class="image-loader"></ion-spinner></div>')($scope)                       
    $element.after(loader);
} 
```