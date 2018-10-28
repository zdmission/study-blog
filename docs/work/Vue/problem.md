# 问题集合

## 1.vue中使用异步组件问题，通过一种自动引入组件并注册是不能实现异步的
![yibu](/work/Vue/problem/problem1-2.png)
上图中不能把组件模块单独抽离出来，只有使用原始的方法才行，如下图
```js
import rollTxt from './roll-txt.vue'
```
![yibu](/work/Vue/problem/problem1-1.png)

## 2.组件多，图片转成base64也多，导致业务js文件大
分离出这样的含有图片多的组件，把该组件当成异步组件处理，打包的时候会被分割，与业务js分离

## 3.微信禁止复制，禁止刷新
```js
wx.hideMenuItems({
    menuList: ['menuItem:copyUrl','menuItem:openWithSafari','menuItem:openWithQQBrowser'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
})
```