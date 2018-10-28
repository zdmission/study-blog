# TypeScript函数

TypeScript完全兼容javascript，所以也可以在TypeScript中书写javascript函数
## 1.函数类型
```ts
//JavaScript书写方式
function add(x,y){
    return x+y;
}
var myAdd= function (x,y) {
    return x+y;
}

//TypeScript书写方法
function add(x:number,y:number):string{
    return "hello TypeScript";
}
alert(add(10,10));//实际的返回值是hello TypeScript
var myadd = function(x:number,y:string):string{
    return "hello ts";
}
alert(myadd(10,'ni'));//结果是hello ts
var myAddts:(name:string,age:number)=>number = function(n:string,a:number):number{
    return a;
}
alert(myAddts('ss',10));
```

## 2.函数的参数
```ts
function buildName(firstName:string,lastName:string){
    return firstName+" "+lastName;
}
var result1 = buildName('11','22');
var result2 = buildName('11');//这个是错误的，参数个数不对
var result2 = buildName('11','33','22');//这个是错误的，参数个数超出范围

//换种方式，可选参数lastName?:string，意思是可以有，也可以不写
function buildName(firstName:string,lastName?:string){
    if(lastName)
    return firstName+" "+lastName;
    else
    return firstName;
}
var result1 = buildName('11','22');
alert(result1);
var result2 = buildName('11');
alert(result2);

//默认参数
//显示到页面上<p id="pid">东哥</p>
function buildName(firstName:string,lastName='dongge'){
    if(lastName)
        return firstName+" "+lastName;
    else
        return firstName;
}
var result1 = buildName('11');
alert(result1);
var result2 = buildName('11','rr');//会覆盖掉默认的值
alert(result2);
document.getElementById('pid').innerHTML=result1;
var result3 = buildName('11','rr','22');//三个参数超出范围，编译不通过
```

## 3.可变参数
```ts
// 可变参数声明   ...restOfname:string[]
function peopleName(firstName:string, ...restOfname:string[]){
    return firstName+" "+restOfname.join("-");
}
var pn = peopleName('11','22','33','zhaodong','?')
document.getElementById('pid').innerHTML = pn;
// 结果便是11 22-33-zhaodong-?
```

## 4.Lambads和this关键字的使用
```ts
var people = {
    name:['11','22','33','44'],
    getName: function () {
        return function () {
            var i = Math.floor(Math.random()*4);
            return{
                n:this.name[i]
            }
        }()
    }
}
var Myname = people.getName();
alert("姓名："+Myname.n);//这样运行的话，结果会是undefined，this指向的getName，而不是name这数组

lambda表达式 ()=>{something}或()=>something 相当于js中的函数,它的好处是可以自动将函数中的this附加到上下文中。
var people = {
    name:['11','22','33','44'],
    getName: function () {
        return  ()=> {
            var i = Math.floor(Math.random()*4);
            return{
                n:this.name[i]
            }
        }
    }
}
var Myname = people.getName();
alert("姓名："+Myname().n);//结果会是数组中的任何一个数据
```

## 5.函数的重载
```ts
function attr(name:string):string;
function attr(age:number):number;
function attr(nameorage:any):any{
    if(nameorage&&typeof nameorage === 'string'){
        alert('姓名');
    }else {
        alert('年龄');
    }
}
attr('zhaodong');//姓名
attr(10);//年龄
```

## 6.函数新特性
- 6.1 Rest 和 Spread操作符
```ts
//第一个用法声明一个可以传入任意参数个数（...args）的方法
function func1(...args){
    args.forEach(function (arg) {
        console.log(arg);
    })
}
func1(1,2,3,4)
func1(6,7,8,9,10)

//涉及ES6,方法所需参数是固定的，但是所传参数不是固定的，typescript编译不会通过，但是代码可以正常运行
function func2(a,b,c){
    console.log(a);
    console.log(b);
    console.log(c);
}
//第二个用法:可以将任意长度的数组转化为某个函数固定参数的调用
var arg1 = [1,2];
func2(...arg1);//结果是1,2，undefined，函数所需三个参数，但是只传入两个，所以前边两个有值，后边一个没有定义
var agr2 = [7,8,9,10,11];
func2(...agr2);//结果是7,8,9，函数所需三个参数，但是传入了5个，函数只会取前三个值
```

- 6.2  generator函数（目前typescript不支持，它是es6的一种规范）
```ts
// 控制函数的执行过程，手工暂停和恢复代码执行
function* doSomething(){
  console.log('开始');
  yield;
  console.log('结束');
}
var fun1 = doSomething();
fun1.next();//开始
fun1.next();//结束

// 写了一个股票买入的函数
function* getStockPrice(stock){
 
 while(true){
  yield Math.random()*100;
 }
  
}
var priceGenerator =  getStockPrice('IBM');
var limitPrice = 15;
var price = 100;
while(price>limitPrice){
  price = priceGenerator.next().value;
  console.log(`the generator return ${price}`);
}
console.log(`the buy price ${price}`)
// 结果是
```

- 6.3 destructuring析构表达式
```ts
// 通过表达式将对象或数组拆解成任意数量的变量
// 利用析构表达式从对象中拆取出值来赋给本地变量
function getStock(){
    return{
        code:'IBM',
        price:100
    }
}
//ES5下的规范写法
var stock = getStock();
//var code = stock.code;
//var price = stock.price;

//ES6下的规范写法
//var {code,price} = stock;
//console.log(code);
//console.log(price);
var {code:codex,price} = stock;//或者这样的写法，从stock中取出code属性，然后放到本地变量codex中，给对象里的属性起别名
console.log(codex);
console.log(price);

function getStock1(){
    return{
        code:'IBM',
        price:{
            price1:100,
            price2:400
        }
    }
}
var stock1 = getStock1();
//如何去嵌套里的属性
var {code,price:{price2}} = stock1;
console.log(code);
console.log(price2);

var array1 = [1,2,3,4]
//针对数组的析构表达式
var [num1,num2] = array1;
console.log(num1);
console.log(num2);
//如果要取3,4
var [,,num3,num4]=array1;
console.log(num3);
console.log(num4);

//如果要取1,4
var [num1,,,num4]=array1;
console.log(num1);
console.log(num4);

//第一个元素放在num1里面，第二个元素放在num2里，剩下的元素放在others里
var [num1,num2,...others] = array1;
console.log(others);//返回的是一个数组

//析构表达式作为方法的参数
function doSomething([num1,num2,...others]){
    console.log(num1);
    console.log(num2);
    console.log(others);
}
doSomething(array1);
```