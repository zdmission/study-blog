# vue向路由组件传递props

[参考vue-router官网](https://router.vuejs.org/zh-cn/essentials/passing-props.html)

别的组件中跳转到目标组件：

![route](/work/Vue/route/route3.png)

注意这里路由跳转的时候需要使用name，而不是path，path跳转之后，props属性userType的值为undefined

路由中声名：

![route](/work/Vue/route/route1.png)

组件中声名：

![route](/work/Vue/route/route2.png)

