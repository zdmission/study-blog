# vue路由中数据上报PV,UV

### 问题：
vue项目中路由切换上报PV、UV，如果通过每次切换完成之后，在该路由组件中每次去实例化js是可以的，但是这样显得过于重复，如果不这样做，又该怎么办呢？

### 思路：
监测hash变化，自动上报数据埋点信息，在vue中路由切换并不会触发hashchange事件，只有我们手动的修改location.hash的值后，才会触发hashchange，如果只实例化一次，那么上报的数据属性值如果不去修改那么每次都是一样的数据，所以我们也要动态的修改上报url，进入页面时间，PV值，其他的属性一样，不用修改

### 解决方案：
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