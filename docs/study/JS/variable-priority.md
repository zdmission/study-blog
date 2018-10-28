# JS变量初始化优先级问题

代码执行前分两个阶段一个是初始化阶段（考虑先后，优先级），一个是执行阶段（考虑先后）
```js
(function(){
    alert(a);
    var a = 10;
    alert(a);
    function a(){};
})();
```
执行的结果是。第一个alert是function a(){};  第二个alert是10

编译的时候会是这样

变量实例化，时期：进入上下文时（初始化this，作用域链，变量对象，然后变量实例化），代码执行前，会按照这个顺序初始化

![JS](/study/JS/variable-priority.png)

[解释参考文章链接](http://weizhifeng.net/javascript-the-core.html)

对于本事例，变量实例化，没有函数形参，就进入第二步声明式函数，那么a的值便是function，然后再有一个变量var a，值为undefined，但是对于同名的函数形参，声明式函数，变量，优先级不同，所以undefined这个值并不会把原来的function值覆盖掉，至此变量初始化结束，到了代码执行阶段，不用考虑同名优先级问题，而是执行的顺序，所以第一个alert的结果是function，然后给a赋值10,10会把原来的function值覆盖掉，所以第二个alert结果是10

```js
function(){
    var a;//undefined
    function a(){};//函数a会把上边的a覆盖掉
    alert(a);
    a = 10;这儿给a赋值会把函数a覆盖掉
    alert(a);
})();

// 同名优先级
// 变量初始化优先级从高到低：函数--形参--变量
// 所谓的形参与实参，如下
function one(a,b,c){
    return one.length; // 结果会是3，这里面的abc表示就是形参
}
function two(a,b,c){
    return arguments.length; // 结果会是0，arguments表示执行函数实际传入的参数，比如two(1,2,3);  1,2,3表示就是实际的参数
}
```