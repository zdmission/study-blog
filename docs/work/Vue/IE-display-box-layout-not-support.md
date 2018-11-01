# IE下display box布局不支持，多行省略

在写了分页插件，使用display:box布局，但是IE下不支持，怎么才能使得我们的分页按钮在一排显示呢，类似于这样

![IE](/work/Vue/ie.png)

- 1.使用float浮动元素，但是怎么居中显示每一个按钮呢
- 2.采用了父元素display:table  子元素display:table-cell布局但是问题来了，这样是可以实现在一排上显示的，但是margin，padding不起作用了，怎么解决呢，这是表格布局，所以要使用表格之间是的间距去解决

在父元素上加上border-collapse:separate;border-spacing: 5px;便可以解决，正如截图一样的效果

- 3.多行省略的话，css3的属性是可以实现的，但是只针对的是webkit的内核，其他的浏览器就不生效了，最后就采用js的方式截取字符串，拼接上...实现省略号的效果