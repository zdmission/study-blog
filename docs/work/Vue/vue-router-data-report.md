# vue路由中数据上报PV,UV

### 问题：
vue项目中路由切换上报PV、UV，如果通过每次切换完成之后，在该路由组件中每次去实例化js是可以的，但是这样显得过于重复，如果不这样做，又该怎么办呢？

### 思路：
监测hash变化，自动上报数据埋点信息，在vue中路由切换并不会触发hashchange事件，只有我们手动的修改location.hash的值后，才会触发hashchange，如果只实例化一次，那么上报的数据属性值如果不去修改那么每次都是一样的数据，所以我们也要动态的修改上报url，进入页面时间，PV值，其他的属性一样，不用修改

### 解决方案一：
<font color=red>据埋点中，使用了location.hash = route.fullpath 手动触发hash改变，以便能监听到hashchange的改变，然后在window.addEventListener('hashchange',function(){//处理页面PV,UV上报})，这时实际上跳转页面的时候，hash值已经改变，然后我们又手动的改变了hash值，只是改变的值和原来的hash值是一样的，用户看不出变化了，但这条记录已经在浏览器的历史记录中了，使用replace只是替换了第一条历史记录，手动触发hash值改变的这条并没有被替换，上报数据有误，故该方案pass</font>


全局路由钩子函数
```js
router.beforeEach((to, from, next) => {
    // 需要上报的信息
    window.objPushData = window.objPushData || {}
    window.objPushData['timestampEnter'] = new Date().getTime()
    next()
})
router.afterEach( route => {
    // 手动改变hash值，触发hashchange事件
    location.hash = route.fullPath
})
```

数据上报js中添加hashchange事件的监听代码，其中_this.pushData是自封装的上报函数实例化之后的对象，
```js
window.addEventListener('hashchange', function () {
            _this.pushData.isPv = 1
            _this.pushData.timestampEnter = window.objPushData && window.objPushData.timestampEnter || _this.pushData.timestampEnter
            _this.pushData.url = window.location.href
            _this.pushData.pushData(false)
        })
```

### 可行方案二
```js
// 数据埋点js中添加一个上报PV,UV的方法，比如pushReport

    /**
     * 路由页面PV,UV上报
     * pushReport
     * @param {*} fromPath
     * @param {*} toPath
     * @memberof DataReport
     */
    pushReport(fromPath, toPath) {
        let times = Date.now();
        this.pushData.isPv = 1
        this.pushData.timestampLeft = times
        this.pushData.url = fromPath
        this.pushData.pushData(false)
        this.pushData.timestampLeft = ''
        this.pushData.timestampEnter = times
        this.pushData.url = toPath
        this.pushData.pushData(false)
    }
// 在入口文件中Vue的实例下添加watch对$route的监听，切换路由上报数据埋点信息
new Vue({
	el: '#app',
    router,
    store,
    watch: {
        $route(to, from) {
            let toPath = `${location.origin}${location.pathname}#${to.path}`,
            fromPath = `${location.origin}${location.pathname}#${from.path}`
            // 绑定在Vue原型上的数据埋点的实例化对象
            Vue.prototype.DR.pushReport(fromPath, toPath)
        }
    },
	render: h => h(App)
})

```