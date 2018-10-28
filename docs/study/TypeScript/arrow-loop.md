# TypeScript箭头表达式与循环

## 1.箭头表达式
```ts
// 用来声明匿名函数，消除传统匿名函数的this指针问题
var sum = (arg1,arg2)=>{ return arg1+arg2};
var array = [1,2,3,4];
console.log(array.filter(value => value%2==0));

function getStock(name:string){
    this.name = name;
    setInterval(function () {
        console.log("this name is:"+this.name);
    },1000)
}
var stock = new getStock('zhaodong');//this name is:  后边就没有输出的值，这是传统javascript的this关键字存在的问题

function getStock2(name:string){
    this.name = name;
    setInterval(()=> {
        console.log("this name is:"+this.name);
    },1000)
}
var stock1 = new getStock2('zhaodong');//结果便是this name is:zhaodong,只是声明匿名函数的方式不一样
```

## 2.循环
```ts
var myArray = [1,2,3,4]
myArray.desc = 'four number';
//会自动忽略掉desc这个属性，在forEach语句中，不支持break，不能跳出循环
//myArray.forEach(value =>{console.log(value);})

//for循环，循环的对象或者是数据集合里边属性的名字，任何一个对象或者结合都是一个键值对
for(var i in myArray){
    console.log(i);
}//这样的结果是0 1 2 3 desc

for(var i in myArray){
    console.log(myArray[i]);
}//这样的结果是1 2 3 4 four number

//for..of..循环，也会忽略掉添加的属性,循环是可以被打断的
for(var n of myArray){
    console.log(n);
}//这样的结果是1 2 3 4

for(var n of myArray){
    if(n>2) break;
    console.log(n);
}//这样的结果是1 2

for(var k of 'four number'){
    console.log(k);
}
```