# 注解annotations
你一定好奇@Component和@View到底是怎么回事。看起来像其他语言（比如python） 的装饰器，是这样吗？
ES6规范里没有装饰器。这其实利用了traceur的一个实验特性：注解。给一个类 加注解，等同于设置这个类的annotations属性：
```js
//注解写法
@Component({selector:"ez-app"})
class EzApp{...}
```

等同于:
```js
class EzApp{...}
EzApp.annotations = [new Component({selector:"ez-app"})];
```

很显然，注解可以看做编译器（traceur）层面的语法糖，但和python的装饰器不同， 注解在编译时仅仅被放在annotation里，编译器并不进行解释展开 - 这个解释的工作是 Angular2完成的：
![annotations](/study/Angular/annotations/annotations1.png)
