# TypeScript类（classes）

## 1.类的创建
```ts
class Person{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    print(){
        return this.name+":"+this.age;
    }
}
//类的实例化
var p = new Person('zhaodong',25);
//类的调用
alert(p.print());
```

## 2.类的继承
```ts
class Person{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    tell(){
        return this.name+":"+this.age;
    }
}
//类Student继承于Person类
class Student extends Person{
    school:string;
    constructor(school:string){
        super('hha',23);
        this.school = school;
    }
    tell(){
        return this.name+":"+this.age+":"+this.school;
    }
}
//如果Person,Student类中没有构造函数
//var s = new Student();
//s.name = 'xy';
//s.age = 23;
//s.school = '大学';
//alert(s.tell())//结果是xy：23：大学

//如果Person类中存在构造函数，那么实例化的时候就必须赋相应的初值
//constructor(name:string,age:number){
//    this.name = name;
//    this.age = age;
//}
//如果Student类中存在构造函数，那么实例化的时候就必须赋相应的初值
//constructor(school:string){
//    super('hha',23);
//    this.school = school;
//}
var s = new Student('大学');
alert(s.tell())//结果是hha：23：大学
```

## 3.访问修饰符
```ts
class People{
    public name:string;
    age:number;
    print(){
        return this.name+":"+this.age;
    }
}
//类Teacher继承于People类
class Teacher extends People{
    school:string;
    print(){
        return this.name+":"+this.age+":"+this.school;
    }
}
//默认情况下是公共的属性或者方法（public），如果定义的private，即私有的，this.name+":"+this.age+":"+this.school;这个中this.name便会报错
var t = new Teacher();
t.name = 'nihao';
t.age = 25;
t.school = 'dhhfdhd';
alert(t.print());

// 例2：
class People{
    public name:string;
    age:number;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    print(){
        return this.name+":"+this.age;
    }
}
//类Teacher继承于People类
class Teacher extends People{
    school:string;
    constructor(school:string){
        this.school = school;
        super('zhaodong',25);
    }
    print(){
        return this.name+":"+this.age+":"+this.school;
    }
}
//默认情况下是公共的属性或者方法（public），如果定义的private，即私有的，this.name+":"+this.age+":"+this.school;这个中this.name便会报错
var t = new Teacher('ddd');
//t.name = 'nihao';也可以这样赋值，会覆盖掉构造函数里面默认的
//t.age = 26;
//t.school = 'dhhfdhd';
alert(t.print());
```

## 4.封装的实现
```ts
//get set方法
class Hello{
    private _name:string
    tell(){
        return this._name;
    }
    get name():string{
        return this._name;
    }
    set name(new_name:string){
        this._name = new_name;
    }
}
//如果我们声明name的属性为private，那么在赋值的时候h.name = 'zhaodong';对外部不可见，就会报错
var h = new Hello();
h.name = 'zhaodong111';
alert(h.tell())

//例子
class Hello{
    private _age:number
    tell(){
        return this._age;
    }
    get age():number{
        return this._age;
    }
    set age(new_age:number){//也可以在set方法中做些操作，验证之类的逻辑
        if(new_age>200 || new_age<0){
            alert('请填写正确的年龄');
        }else
        this._age = new_age;
    }
}
//如果我们声明age的属性为private，那么在赋值的时候h.age = 10;对外部不可见，就会报错
var h = new Hello();
h.age = 240;
//alert(h.tell())
```

## 5.static静态
如果使用static关键字，在构造函数或者其它函数中用到声明的属性会报错，编译不通过，如下图所示

正确写法：
```ts
class Person{
    static name:string;
    tell(){
        alert("姓名："+Person.name);
    }
}

var p = new Person();
Person.name = 'kkkkkk';
p.tell();
```

例子：
```ts
class Greeter {
    static greeting:string
    constructor(message:string) {
        Greeter.greeting = message;//属性必须要使用类名来调用Greeter.greeting
    }
    greet() {
        return "Hello,"+Greeter.greeting;
    }
}
//var greet:Greeter;//指定变量当前的类型为Greeter类型
//greet = new Greeter('zhaodong');//实例化
var greet = new Greeter('zhaodong');//这种方式也可以
alert(greet.greet());
```

例3：
```ts
//定义的变量名字要注意不要与系统的关键字冲突，这个例子中，如果定义的变量名为name，那么得到的结果便是“姓名：Person”，而不是设置的值（这个也要考虑浏览器的兼容问题，IE浏览器显示的事正确的，而在谷歌显示是错误的）

class Person{
    static name1:string;
    constructor(message:string){
        Person.name1 = message;
    }
    tell(){
        return "姓名："+Person.name1;
    }
}

var p = new Person('kkk');
Person.name1 = 'kkkkkk';
alert(p.tell());
```