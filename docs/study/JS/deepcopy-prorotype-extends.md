# JS中的深度拷贝以及实现类的多重继承

方式一：
```js
function clone(Obj) {
     var buf;
     if (Obj instanceof Array) {
         buf = []; //创建一个空的数组
         var i = Obj.length;
         while (i--) {
             buf[i] = clone(Obj[i]);
         }
         return buf;
     } else if (Obj instanceof Object) {
         buf = {}; //创建一个空对象
         for (var k in Obj) { //为这个对象添加新的属性
             buf[k] = clone(Obj[k]);
         }
         return buf;
     } else {
         return Obj;
     }
 }
```

方式二：
```js
const copyProperties=function(target,source){
  // 获取元对象的所有属性
  for(let key of Reflect.ownKeys(source)){
    // 确保key不是其中特别的字段
    if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
        // 拿到key所对应的的值
        let desc=Object.getOwnPropertyDescriptor(source,key);
        // 利用ES5中的对象特性，把key，desc添加到目标上
        Object.defineProperty(target,key,desc);
    }
  }
}
```

实现类的多重继承
```js
const mix=function(...mixins){
  class Mix{}
  for(let mixin of mixins){
    // 属性拷贝
    copyProperties(Mix,mixin);
    // 原型拷贝
    copyProperties(Mix.prototype,mixin.prototype);
  }
  return Mix
}
```