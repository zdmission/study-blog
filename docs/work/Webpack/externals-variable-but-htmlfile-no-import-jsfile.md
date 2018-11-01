# webpack动态链接库打包公共js出现的问题

1. 如果已经使用动态链接库去提取公共js，然后再在externals中声明，如图

![webpack](/work/Webpack/externals1.png)

，构建完成保证js，css路径正确直接访问没有路径问题，出现错误，如下

![webpack](/work/Webpack/externals2.png)

即不能把同一个文件比如vue，在不同的配置文件中都使用，去掉externals中vue的声明

2. 错误如下图所示： 

![webpack](/work/Webpack/externals3.png)

![webpack](/work/Webpack/externals4.png)

不知道是什么原因，最后一点一点删除代码，把没有使用的代码删除，发现一处了Vuex之后，错误没有了，按理说不应该啊，Vuex只是导入并安装而已，还是一直报该错，最后打印Router信息，为undefined，虽然使用externals抽离了，但是<font color=red>在html中没有引入vue-router这个js文件</font>