# TypeScript接口

## 1.创建接口（使用接口来规范类型）
```ts
function printLabel(labelObj:{label:string}){
    console.log(labelObj.label);
}
var myObj = {label:'hello'};
printLabel(myObj);//结果是hello

interface LabelValue{
    label:string;
}
function printLabel(labelObj:LabelValue){
    console.log(labelObj.label);
}
var myObj = {label:'hello world'}
printLabel(myObj);//hello world

// 两种方式的结果是一样的，使用接口更加灵活一些
```

## 2.可选属性
```ts
//并不是接口中的每一个属性都会用到
interface USB{
    name?:string;
    age:number
}
function printUSB(pu:USB){
    console.log(pu.name);
    console.log(pu.age);
}
var my = {name:'金士顿',age:100}
printUSB(my);
var my1 = {age:100}
printUSB(my1);//该结果中没有name，它是可选属性，编译不会报错，但是输出的会有undefined，并没有给name赋值
```

## 3.函数类型
```ts
//接口是非常强大，可以描述javascript的任何对象，当然也可以描述一个函数对象
interface SearchFunc{
    (source:string,subString:string):boolean;
}
var mySearch:SearchFunc;
mySearch = function (src:string,sub:string) {
    var result = src.search(sub);
    if(result!=-1)
    return true;
    else return false;
}
//针对于类型的检查，不是类型的名称src:string,sub:string
```

## 4.数组类型
```ts
interface StringArray{
    [index:number]:string;
}
var myArray:StringArray;
myArray = ['zhaodong','xy'];//规范了类型，所填的值必须是字符串类型，其他的编译报错
alert(myArray[1]);
```

## 5.Class类型
```ts
interface ClockInterface{
    currentTime:Date;
    setTime(d:Date)
}
class Clock implements ClockInterface{
    currentTime:Date;
    setTime(d:Date){
        this.currentTime = d;
    }
    constructor(h:number,m:number){}
}
```

## 6.继承类型
```ts
interface Shape{
    color:string;
}
interface PenStroke{
    penWidth:number;
}
interface Square extends Shape,PenStroke{
    sideLength:number;
}
var s = <Square>{};
s.color = 'blue';
s.sideLength = 10;
s.penWidth=19;
```

## 7.混合类型
```ts
interface Counter{
    interval:number;
    reset():void;
    (start:number):string;
}
var c:Counter;
c(10);
c.reset();
```