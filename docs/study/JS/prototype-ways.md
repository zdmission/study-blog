# 原型继承的几种方式

### 1.  第一种方式-----在函数Itouch中可以把函数Ipod函数赋值给this.ss，这个this指向的便是Itouch这个函数，待this.ss();执行之后，Itouch便有了playmusic 方法
```js
function Ipod(){
		this.playmusic = function(){
			console.log("paly music....");
		}
	}
function Itouch(){
		this.ss = Ipod;
		this.ss();
		this.playgame = function(){
			console.log("play game....");
		}
}
new Itouch().playmusic() //调用Ipod里面的方法
console.log(new Itouch());如图所示
```

### 2. 第二种方式----利用call（函数不可独立存在，总是要依附于某个对象，不管是自定义的，还是全局的，因此函数的执行，总是这样）方法，
```js
obj.func();  //表示对象obj调用了func

但我们也可以反过来:

func.call(obj);  //函数func被调用了，通过obj

如果需要传参数：

func.call(obj, param1, param2,....);
比如  这样的方式
function Father(p1,p2,p3,p4){
     this.money = 1000000;
}
function Son(v1,v2,v3,v4){
     Father.call(this, v1, v2, v3, v4);
}

call改变调用函数的对象，Ipod.call(this);把Ipod对象变成了Itouch，故Itouch可以使用Ipod里面的方法

function Ipod(){
    this.playmusic = function(){
        console.log("paly music....");
    }
}
function Itouch(){
    Ipod.call(this);
    this.playgame = function(){
        console.log("play game....");
    }
}
console.log(new Itouch());如图所示
```


### 3.  第三种方式----apply与call方式类似。只是apply可加入参数的方式是数组，这个可以利用arguments类数组对象，参数传入都保存在了arguments这个类数组对象中
```js
function Father(p1,p2,p3,p4){
    this.money = 1000000;
}
function Son(v1,v2,v3,v4){
    Father.apply(this, [v1, v2, v3, v4]);
}
// 可以再改造一下：
function Son(){
    Father.apply(this, arguments);
}
```

### 4.  第四种方式-----原型继承，可以扩展函数系统的能力，原型属性一般不可以更改，但是可以用原型覆盖原来的属性和方法
```js
function Ipod(){
}
Ipod.prototype.playmusic = function(){
    console.log("paly music....");
}
function Itouch(){
    this.playgame = function(){
        console.log("play game....");
    }
}
Itouch.prototype = new Ipod();  //那么Itouch便可以使用Ipod中的原型方法了

Itouch.prototype.playmusic(); //结果便是play music...
```

### 5  第五种方式----
```js
Object.create 
// 创建对象的一种新形式：
var father = {
     money: 999999
}
var son = Object.create(father);
son.money; //999999
//不要误以为这是在复制对象，实际上这是在继承，因为father对象的内容被存入了son对象的原型当中
```

举例：
```js
function Father(){
    this.name = "王健林";
    this.age = 60;
}
Father.prototype = {
    wanda : function(){
        return "$99999999999";
    }
}
```
//以前的写法，大概是这样：
```js
//Son.prototype = new Father();
```
//缺点很明显就是，连名字和年龄都继承了，其实我们并不想要这些

//下面的写法，带来了一定的好处，Son的原型的原型是Fahter的原型，同样是原型链继承的效果。
```js
Son.prototype = Object.create(Father.prototype);
function Son(){    
     this.name = "王思聪";
     this.age = 30;
}
new Son().wanda();
```

//要注意这个方法不能实现对象拷贝，因为这里是原型的赋值，并且生成了新对象，不是简单的属性复制

例如：
```js
var a = {
     text1 : "abc"
}
var b = {
     text2 : "def"
}
b = Object.create(a); //结果b虽然继承了a，但原有内容被覆盖了！

b.text1; //abc
b.text2; //undefined
```

解决办法如下：
```js
var b = Object.create(a, {
     text2 : {
         value : "def" 
     }
})
```

原型有两种访问方式
```js
Itouch.prototype.playgame();

var it = new Itouch();
it.__proto__.playgame();
```

通过prototype或者__proto__的方式可以修改原型

prototype 说的是构造函数和原型对象之间的关系， __proto__ 说的是实例对象和原型对象之间的关系

用的多的还是混合继承
```js
function Father(){
     
}
Father.prototype.liaomei = function(){

}
Son.prototype = new Father();
function Son(){
    Father.apply(this,arguments);    
}
```
