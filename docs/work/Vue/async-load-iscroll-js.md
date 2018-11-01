# webpack异步引入iscroll文件

项目使用了webpack3.x+vue2.x+es6的方式去写代码，有些js文件没有必要加载的首页的时候一次性加载到页面，所以需要异步加载，什么时候需要就什么时候去加载，webpack中提供了require.ensure(['这里是需要依赖的文件，可以写，可以不写'], () => {
这里是回调函数，require进你需要的js文件，如下

![vue](/work/Vue/iscroll/iscroll1.png)

},'这是最后加载这个异步文件的名称，比如你写的是iScroll，那么最后生成的时候会是iScroll.chunk.js')

这里需要注意的点，引入的js需要封装成模块的形式，比如

![vue](/work/Vue/iscroll/iscroll2.png)

也可以是这样

![vue](/work/Vue/iscroll/iscroll3.png)

两种封装形式都是可以的

最后一点，在webpack的配置文件中，输出文件目录output下加入chunkFilename，只有这样reuqire.ensure后边的参数才可以被识别和利用

![vue](/work/Vue/iscroll/iscroll4.png)


