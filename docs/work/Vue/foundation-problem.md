# 基金项目总结

1. 父子组件通信，props传值命名，如果是驼峰命名(codeValue)，那么在父组件中要分开(:code-value) ，如果想要清楚子组件中的值，可以调用子组件中的方法去清除，一般想要通过赋值去清除子组件中的值，第一次是可以的，但是后面就不行了，需要通过事件去通知子组件更新

2. 如果要使用 vue中 $root属性获data中的值，那么必须在根组件中定义，如下图

![foundation](/work/Vue/foundation/foundation1.png)

3. 项目中抽离的css不能加浏览器前缀，可能是因为升级了vue-cli的原因吧，在根目录下建一个下面的文件即可，文件名postcss.config.js
```js
const Config = require('./config/index')
module.exports = {
    plugins: [
        require('autoprefixer')(['iOS >= 6', 'Android >= 4.1'])
        // require('autoprefixer')('last 2 versions')
    ]
};
```

4. 对于 encodeURI() 函数可把字符串作为 URI 进行编码。

![foundation](/work/Vue/foundation/foundation2.png)

![foundation](/work/Vue/foundation/foundation14.png)

5. vue中v-if的值为false其实并没有把节点元素真正的从内存中移除，vue还是会有保留，所以通过这样的方式创建的组件实例依然存在

![foundation](/work/Vue/foundation/foundation3.png)

缓存实例可行，下次调用无需再次创建，为了在同一个页面中多次调用组件，但是传值不同，显示不同的效果，默认参数设置如下

![foundation](/work/Vue/foundation/foundation4.png)

当我们调用password方法时，实际使用的opt这个外层对象，v-if并没有在内存中移除节点对象，那么我们下次调用该方法时实际也是用的opt对象中的值，如果我们传的option参数中没有把上一次设置的值给覆盖的话，就会出现显示的信息有些还是上一次设置的，改良版

![foundation](/work/Vue/foundation/foundation5.png)

保证每次的值都是最新的加默认值

6. 我想点击重试，然后弹出键盘，如下图所示

![foundation](/work/Vue/foundation/foundation6.png)

逻辑是正常流程，点击重试，调用打开键盘方法，但是键盘却是先打开然后关闭，怎么会这样呢，是什么让打开的键盘关闭了呢，原来我是给document绑定了事件，然后调用了关闭键盘的方法，当我点击重试按钮的时候并没有阻止冒泡，所以调用了打开键盘方法有冒泡到document上，调用了关闭方法，故出现打开又关闭的场景

解决方法：给重试按钮添加组件冒泡

7. 给toast提示框动态设定位置，比如距离上20%的位置，采用了计算属性computed来设定，:style="setToastPosition"
```js
setToastPosition() {
    if(!isNaN(parseFloat(this.position))) {
        return {top: `${this.position}%`,
            '-webkit-transform': `translate3d(-50%, -${this.position}%, 0)`,
            'transform': `translate3d(-50%, -${this.position}%, 0)`
        }
    }
}
```
注意返回值是一个对象，千万别写成行内样式的样子，不然不会生效的
```
`{top: ${this.position}%;-webkit-transform: translate3d(-50%,-${this.position}%, 0);'transform': translate3d(-50%, -${this.position}%, 0);}`
```

8. watcher的用法immediate设置，该回调将会在侦听开始之后被立即调用

![foundation](/work/Vue/foundation/foundation7.png)

9. 创建的插件中，实例化插件函数，通过扩展的方式拿到插件对象

![foundation](/work/Vue/foundation/foundation8.png)

10. v-model在vue中的使用范围不仅仅是input等可输入性的标签，可用于任何元素，比如div，p，h1等块元素和行内元素，

![foundation](/work/Vue/foundation/foundation9.png)

使用：
```html
<custom-input v-model="searchText"></custom-input>
```
![foundation](/work/Vue/foundation/foundation10.png)


11. 绑定的click事件内容不仅仅是一个方法，还是可以写属性值修改，比如
![foundation](/work/Vue/foundation/foundation11.png)

12. 使用webpack的tree shaking删除无用代码，需要注意使用es6的import和export，对于函数的导出需要这样写

![foundation](/work/Vue/foundation/foundation12.png)

13. 单笔买入页，发现进入的时候加载特别慢，查看文件都不是很大，但是加载文件的中间某个时候出现空白段，不知道是啥，最后查看到是parse html，页面上出现了上万的节点，原来是滑动组件分段数写错了，（50000-1000）/1000，但是写成了（50000-1000）/10，这就不是一个级别的了，导致页面上渲染的元素节点有上万个，增加了渲染时间，写代码的时候要小心啊

14. 使用requestAnimationFrame来控制时间，优化动画执行
![foundation](/work/Vue/foundation/foundation13.png)

控制每隔300ms去执行一次automaticSelect函数

15. 如果使用vue没有在data中声名的变量，那么可能会造成一页面渲染不出来了，打开浏览器开发者工具查看的时候，元素节点是<!-- --> 这样子的，这个时候就要考虑是否已经声名这个变量
