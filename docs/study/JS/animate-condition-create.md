# animate根据条件制作动画效果
```
/**
 1.所有设定的值要同时满足，一个定时器不能满足需求，若有一个条件满足，只清除该条件的定时器；
 2.产生作用域不影响代码的逻辑（1）使用闭包函数的自调用，声明的变量是局部的，彼此不影响（2）使用let关键字，便有了块级作用域，声明的变量
 	是局部的，在当前作用域中有效；
 3.对于本案例中的需要获取元素的当前位置，非行内样式，可以优化，不用每次都去获取
 */
```

```js
//缓冲运动
//obj表示要运动的对象
//target表示运动终点
//animate(obj,{left:800,width:200},time)
function animate(obj, target, time) {
	//第一种利用闭包实现作用域，每一个属性对应一个定时器
	/*for(var attr in target){
		(function(prop){
			var timer = setInterval(function(){
				//获取元素当前的属性值
				var iNow = getStyle(obj,prop);
				//计算速度
				var speed = (target[prop]-iNow)/8;
				//speed的值最后会在[-1，1]之间，对于绝对值小于1的数值来说，浏览器无法识别
				if(Math.abs(speed)<1){
					speed = speed>0?1:-1;
				}
				//元素实时变化的位置属性
				obj.style[prop] = iNow + speed + "px";
				//元素到达终点
				if(parseInt(obj.style[prop] == target[prop])){
					clearInterval(timer);
				}
			},20)
		})(attr)
	}*/

	//第二种是利用let关键字，实现块级作用域，声明的变量只在该作用内使用
	for(let attr in target) {
		let timer = setInterval(function() {
			//获取元素当前的属性值
			var iNow = parseInt(getStyle(obj, attr));
			//计算速度
			var speed = (target[attr] - iNow) / 8;
			//speed的值最后会在[-1，1]之间，对于绝对值小于1的数值来说，浏览器无法识别
			if(Math.abs(speed) < 1) {
				speed = speed > 0 ? 1 : -1;
			}
			//元素实时变化的位置属性
			obj.style[attr] = iNow + speed + "px";
			//元素到达终点
			if(parseInt(obj.style[attr]) == target[attr]) {
				clearInterval(timer);
			}
		},20)
	}
}

//获取非行内样式兼容写法
function getStyle(obj, attr) {
	if(obj.currentStyle) { //IE浏览器
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

//利用三角正弦函数实现，不用每次都去取元素的当前位置，添加了回调函数
function animateRelease(obj, target,extend){
	console.log(111)
	//设置初始角度
	var degree = 0;
	//保存元素所有属性的起始值
	var init = {};
	for(var attr in target){
		init[attr] = parseInt(getStyle(obj,attr));
	}
	var timer = setInterval(function(){
		for(var attr in target){
			//剩余路程
			var distance = target[attr]-init[attr];
			//元素移动过程中的位置属性的变化
			obj.style[attr] = init[attr]+distance*Math.sin(degree*Math.PI/180)+"px";
		}
		if(degree == 90){
				clearInterval(timer);
				(extend && extend.callback) ? extend.callback() : "";
			}
		degree++;
	},20)
}
```
