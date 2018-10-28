# ionic3 懒加载配置实践

懒加载意味着，不是一运行ionic的应用就把所有的页面都加载进来，而是当你想打开某个页面的时候才加载，这在一方面提高了ionic应用的启动速度

接下来看看是怎么实现的吧

## 1.配置所需要懒加载的文件，
![ionic](/study/Ionic2+/ionic2+1.png)

图中红色箭头指向的文件都是自己新增的 .module.ts 文件，文件的名字一定要这样写，符合规则，我们以about.module.ts文件为例，里面的内容如下

![ionic](/study/Ionic2+/ionic2+2.png)

意思大概是把 AboutPage 文件加载到 IonicPageModule 模块中，便于集中管理，这是ionic内部决定的

接下来是配置about.ts文件

![ionic](/study/Ionic2+/ionic2+3.png)

该文件中最主要的是要在@Component前边加上@IonicPage()
其他的几个文件类似这样的配置

## 2.配置tabs.ts文件
设置了about.module.ts，about.ts ，然后在tabs.ts中不需要引入AboutPage，只需要把用AboutPage的地方，加上引号即可，比如 'AboutPage';

![ionic](/study/Ionic2+/ionic2+4.png)

## 3. 配置app.component.ts文件，应为该文件是入口的处理文件，会使用到TabPage，

![ionic](/study/Ionic2+/ionic2+5.png)

## 4. 配置 app.module.ts 文件，该文件修改的部分就是删除页面的引用

![ionic](/study/Ionic2+/ionic2+6.png)

## 5.运行懒加载，效果

![ionic](/study/Ionic2+/ionic2+7.gif)


## 6.注意点：
- 1.如果在某个页面文件中，没有加入@IonicPage()，那么会报core.es5.js:1085ERROR Error: Uncaught (in promise): invalid link: HomePage

解决方法：加上@IonicPage()即可

- 2.如果某个页面设置了懒加载，你跳转到那个页面使用的正常方式，比如这样

![ionic](/study/Ionic2+/ionic2+8.png)

但是这样却报错了
```
// 错误如下
nav-controller-base.js:88 Failed to navigate:  No component factory found for PersonPage. Did you add it to @NgModule.entryComponents?
ERROR Error: Uncaught (in promise): Error: No component factory found for PersonPage. Did you add it to @NgModule.entryComponents?
```

解决方法：

设置了懒加载，就要按照那样的规则去行驶，

![ionic](/study/Ionic2+/ionic2+9.png)

要么你就不要去设置懒加载，正常的方式即可

- 3.添加了懒加载的页面，一定要exports出来，要不然该页面的内容无法在页面中显示

![ionic](/study/Ionic2+/ionic2+10.png)

