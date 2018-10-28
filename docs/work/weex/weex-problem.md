# weex使用过程的问题总结

1. weex页面使用canvas，使得直接使用h5方式去画图，判断平台在浏览器端的时候使用canvas，在原生端就是gcanvas
2. gcanvas使用的时候需要依赖原生端，android和ios都需要做相关配置（[参考](https://alibaba.github.io/GCanvas/docs/Integrate%20GCanvas%20on%20Weex.html)），然后在js端使用需要有一个gcanvas.min.js文件（[参考](https://alibaba.github.io/GCanvas/docs/Developer's%20Guide.html)），按照上边的操作基本上是可以完成绘图的

3. 调试过程，这个是要在原生端打包的app中运行js的代码，因为gcanvas依赖原生端，特别重要的一点看日志，连接手机在android或者ios开发者的电脑上，运行app中js代码的时候是可以在控制台输出一些信息的

4. ios中fireGlobalEvent一直不能传递信息给js端，js端监听自定义的事件是没有问题的，但是就是没有调用回调函数，weex sdk ios源码中调用回调函数有一个判断，要么是没有weex实例，或者是weex实例id相同，结果创建这个全局事件的时候是每次都去实例一个weex，判断条件没有通过，故不会调用回调函数

    ![weex](/work/weex/weex1.png)

5.errorCode:-9400 functionName: exception:[WX_KEY_EXCEPTION_WXBRIDGE] [undefined:288:17] ReferenceError: Can't find variable: window

在自己封装的http请求文件中出现此问题，还以为是不支持Promise，但是官方明确说了支持，一点点去掉浏览器的东西，最后还是不行，最后把import weex from 'weex-vue-render'去掉之后使用Promise也可以了