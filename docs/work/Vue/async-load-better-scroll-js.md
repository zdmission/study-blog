# 异步加载better-scroll，点击加载才去加载这个js

[better-scroll文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)

## 方法一
使用到了webpack3提供的Dynamic Imports，动态导入模块文件，后边的注释第一个webpackChunkName代表打包之后的异步文件存放的位置，最后一个是文件名，注释中第二个引号代表依赖的文件可以是相对路径也可以直接引用node_modules中的文件，

![vue](/work/Vue/better-scroll/better-scroll1.png)

还有就是要在webpack配置文件中配置，这个output一般是生成环境下的，这个name就是上图路径中的iScroll

![vue](/work/Vue/better-scroll/better-scroll2.png)

但是要注意的是，导入的BScroll是经过封装的对象，如下图所示

![vue](/work/Vue/better-scroll/better-scroll3.png)

实际上我们所需要的应该是这样的，如下图

![vue](/work/Vue/better-scroll/better-scroll4.png)

初始化才能成功

## 方法二
这样也可以实现，异步加载，但是没有最后打包js的路径有点问题

![vue](/work/Vue/better-scroll/better-scroll5.png)

