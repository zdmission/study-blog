# webpack3.x需要优化问题

- 1.构建是meta等静态文件如无变化时不去拷贝和计算hash，打包后的部分文件中注释未删除 解决（特别的注释不包含在删除的范围之内，拷贝文件插件计算一次）

- 2.vue中style scoped无变化时不要重新计算css hash 解决（contenthash）

- 3.静态文件资源构建后双hash 解决（因为在输出文件名后多加了hash串）

- 4.tap事件处理 使用fastclick代替

- 5.懒加载路径问题 解决

- 6.首屏css问题

- 7.zepto取舍涉及module中的引用部分，（网络请求改用原生ajax，不适用zepto中的东西）

- 8.状态管理vuex，或者事件总线bus，达到多组件共享数据的目的，不使用遍历到某个组件中去调用该组件的方法和数据

- 9.globalpath命令行构建各种域名 解决

- 10.命名规范，封闭规范，使用ES6的方式去书写代码，封装tools，config，api到一个文件，这个文件叫做Glob

- 11.happypack加快构建速度，处理vue，js等文件

- 12.最终的html文件引入js包括（vue，axios、。。。。+ vendor + bundle.js + 异步加载的js）