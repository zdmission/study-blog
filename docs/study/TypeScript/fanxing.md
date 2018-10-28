# TypeScript泛型

## 1.认识泛型
```ts
//function Hello(num:number):number{
//    return num;
//}

//没有明显的类型规范
function Hello(num:any):any{
    return num;
}

//<T>泛型
function hello<T>(agr:T):T{
    return agr;
}
//使用的时候才去指定相应的类型，要一一对应
var output = hello<string>('hello shijie');
alert(output);
```

## 2.泛型的应用
```ts
function hello<T>(num:T):T{
    alert(num.length)//Property 'length' does not exist on type 'T'.
    return num;
}
function hello<T>(str:T[]):T[]{
    //alert(str.length)//编译通过，具有length属性，T泛型是根据你所传递的类型具有哪些属性
    return str;
}
var list:Array<string> = hello<string>(['1','2','3']);
for(var i= 0;i<list.length;i++){
    alert(list[i]);
}
```

## 3.泛型类型
```ts
//泛型类型
function Hello<T>(str:T):T{
    return str;
}
//var myHello:<K>(agr:K)=>K = Hello;
//alert(myHello('hello'));

//当前myFunc是一个函数，它的返回值是一个string类型,lambda表达式理解成匿名函数
var myFunc:(a:number)=>string = function (a:number):string {
    return 'hello'+a;
}
alert(myFunc(2));

//var myHello:{<T>(arg:T):T} = Hello;
alert(myHello('zhaodong'));

interface Hello{
    <T>(arg:T):T;
}
function myHello<T>(arg:T):T{
    return arg;
}
var h:Hello = myHello;
alert(h<string>('zhaodong'))
//又或者
interface Hello1<T>{
    (arg:T):T;
}
function myHello1<T>(arg:T):T{
    return arg;
}
var h1:Hello1<number> = myHello1;
alert(h1(10));
```

## 4.泛型类
