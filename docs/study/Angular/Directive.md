# 指令Directive和数据绑定，@Input及事件绑定，@Output

![directive](/study/Angular/directive/directive1.png)

具备某种能力去完成某种任务

- 1.组件指令
app-home指令帮我们调用home组件的模板，样式
router-outlet指令帮我们路由，而且是在无网络刷新的情况下进行路由

- 2.属性指令
改变结构中的样式，并不改变结构，比如ngClass，ngStyle，ngModel

- 3.结构指令
改变当前dom元素的结构，比如ngIf(如果我们要使用仅仅是隐藏的话，使用内置属性[hidden])，ngFor，ngSwitch

NgNonBindable不编译不渲染纯字符串
```html
<span class="pre" ngNonBindable>
   {{ content }} 
</span>
// 显示结果将是 {{ content }} 直接显示插值表达式
```


数据绑定
```html
// 单项数据绑定，模板绑定，属性绑定（浏览可以解析的属性的话，就直接[]使用即可,如果再ts文件中没有声明那个属性，
// 但是又想要在页面中某个元素里面附上这个属性，title这个属性在ts文件中是有的，title:string="abc"，
// 比如这样定义
<div [attr.my]="title"></div>，
// 最后显示出来<div my="abc"></div>），在ts中准备数据，在html展示数据
```

```
hah = "世界那么大"
```

比如 

```
value={{hah}}这是模板绑定   
```

在 Angular 的世界中，attribute 唯一的作用是用来初始化元素和指令的状态。 当进行数据绑定时，只是在与元素和指令的 property 和事件打交道，而 attribute 就完全靠边站了。

[value]="hah"这是属性绑定，又比如我们在css文件定义了 .a{} .b{} .c{} 

在html中引用
```html
<div class="a" [class]="'b c'" [class.b]="true" ></div>
// 还有就是这样 class="{{title}}"  title的值为b c
```

这两者之间有什么区别呢？

模板绑定只能使用字符串，属性绑定字符串和表达式都可以

但数据类型不是字符串时，就必须使用属性绑定了

双向数据绑定是MVVM设计模式中显著的特征，简单来说，页面发生了变化，数据就发生了变化 || 数据发生了变化，页面也就发生了变化，通过[(ng-model)]来实现数据的双向绑定

@Input 是用来让父模块向子模块传递内容所使用的特殊模块
父级组件向子级组件传递数据，一个组件准备数据，一个组件显示数据
自定义属性就是自己定义非系统内置属性，常用于多组件传值配合@Input使用
自定义属性与属性绑定很相似
比如父组件中的数据		
```
person={name:'shjshos',color:'blue'}
```
子组件 
```html
<app-home [person]="person"></app-home>
```


事件绑定：将某种事件（点击，鼠标，键盘）绑定到指定的元素上，事件的表示有两种，分别是
on-event || （event），js的事件在angular2都涉及了，只是表示形式或者实现方法不一样
比如 
```html
<button on-click="sss()"></button>
<button (click)="sss()"></button>
```
ng-content有点类似于vue中插槽slot的概念，
@Output 当子模块想自定义一些event传递给父模块时，我们需要用到

自定义事件（非系统内置事件），常用于子组件传递事件到父组件且配合@Output使用

子组件中添加 
```js
import {Output, EventEmitter } from '@angular/core';
@Output() clickChild = new EventEmitter()
this.clickChild.emit("ssssss")
```
父组件中 
```html
<app-home (clickChild)="fuzujianClick($event)"></app-home>
```

有一个方法 fuzujianClick(){alert("shhshss")}   如果点击app-home那么触发父级中的fuzujianClick方法