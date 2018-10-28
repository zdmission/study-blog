# 遇到问题，编写的函数整理

## 1.计算元素在页面上的绝对位置

```js
function offsetPagePosition(ele){
    var _left = 0;
    var _top = 0;
    while(ele.offsetParent){
        _left+=ele.offsetParent.offsetLeft;
        _top+=ele.offsetParent.offsetTop;
        ele = ele.offsetParent;
    }
    return {"left":_left,"top":_top}
}
```

## 2.筛选元素节点，变相的利用过滤器不要文本空白节点，返回元素节点数组
```js
function filterNodes(element){
    var listNodes = element.childNodes;
    var newNodes = [];
    for(var i = 0; i<listNodes.length;i++){
        if(listNodes[i].nodeType==1){
            newNodes.push(listNodes[i]);
        }
    }
    return newNodes;
}
```

## 3.生成随机颜色
```js
// 方法一
function randomColor(){
   var R = Math.floor(Math.random()*256).toString(16);
   var G = Math.floor(Math.random()*256).toString(16);
   var B = Math.floor(Math.random()*256).toString(16);
   return "#" + (R.length<2?"0"+R:R) + (G.length<2?"0"+G:G) + (B.length<2?"0"+B:B);
}

// 方法二
function randomColorTwo() {
    this.color="#"+parseInt(Math.random()*0xffffff).toString(16);
}
```

## 4.获取非行内样式
```js
function getStyle(obj, attr) {
    if(obj.currentStyle) { //IE浏览器
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj,null)[attr];
    }
}
```

## 5.根据class名称获取元素
```js
if(!document.getElementsByClassName){
   document.getElementsByClassName = function(classname){
      var temp = [];
      var alldom = document.getElementsByTagName("*");
      for(var i=0; i<alldom.length; i++){
         if(alldom[i].className.indexOf(classname+" ") != -1){
            temp.push(alldom[i]);
         }
      }
      return temp;
   }
}
```

## 6.键盘事件兼容写法
```js
function uniKeyCode(e) {
    var ev = e || event;
    var key = ev.keyCode || ev.which;
    if(ev.ctrlKey&&key==13||key==10){
        if(msg_input.value==''){
            alert("请输入内容");
        }else {
            fsong();
        }
    }
}
```

## 7.截取数组，同时将伪数组转换为数组
```js
function slice(obj,start,stop){
   if(obj == undefined){
      console.log("%c 参数传递有问题，对象不能为空","color:red");
   }else {
      start = start || 0;
      stop = stop || obj.length;
      var list = [];
      for(var i = start ;i<stop;i++ ){
         list.push(obj[i]);
      }
   }
   return list;
}
```

## 8.给元素绑定事件，兼容写法
```js
function addEvent(element,eventname,func,isCapture){
    if(element.addEventListener){
        element.addEventListener(eventname,func,isCapture);
        addEvent = function(){
            element.addEventListener(element,eventname,func,isCapture);
        }
    }else{
        element.attachEvent("on"+eventname,func);
        addEvent = function(element,eventname,func){
        element.attachEvent("on"+eventname,func);
    }
   }
}
```

## 9.浏览器兼容的获取event.offsetX的最简单方法
```js
function getOffsetX(event){
    var evt = event||window.event;
    var srcObj = evt.target || evt.srcElement;
    if (evt.offsetX){
        return evt.offsetX;
    }else{
        var rect = srcObj.getBoundingClientRect();
        var clientx = evt.clientX;
        return clientx - rect.left;
    }
}
// 或者 
function getOffsetXTwo(event) {
    var evt = event||window.event;
    var srcObj = evt.target || evt.srcElement;
    return evt.offsetX || (evt.clientX - srcObj.getBoundingClientRect().left);
}
```

## 10.遇见有趣的问题
- 1.文本居中
```html
<div class=“content”>
文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容
</div>
.content宽度固定（宽度300px），当内容只有单行文本时显示居中对齐的效果，当有多行文本时显示左对齐的效果。
注：如果需要，可以适当添加HTML元素和属性。

// 代码实现
<div style="text-align: center;background-color: aqua;width: 300px">
    <div style="text-align: left;display: inline-block;">
         好看的换个看好看的换个看好看的换个看好看的换个看好看的换个看
    </div>
</div>

```
- 2.请编写一个函数，indexOf(arr, target);  其中arr为数组，target为需要在数组查找的目标元素，该函数返回目标元素在数组中的下标，若没有找到，则返回-1。（假定数组有序，请使用二分法查找）
```js
function erfen(arr,target){
    var start = 0;
    var stop = arr.length-1;
    while(start<=stop){
        var midindex = (start+stop+1)%2==0?(start+stop+1)/2:(start+stop+1-1)/2;
        if(target == arr[midindex]){
            return midindex;
        }else if(target>arr[midindex]){
            start = midindex+1;
        }else if(target<arr[midindex]){
            stop = midindex-1;
        }
    }
    return -1;
}
```
- 3.完成一个函数，接受数组作为参数，数组元素为整数或者数组，数组元素包含整数或数组，函数返回扁平化后的数组，如：[1,[2,[[3,4],5],6]] = > [1,2,3,4,5,6]
(注意判断数组的方法是instanceof，不是typeof)
```js
function tigui(arr){
    var list = [];
    for(var i in arr){
        if(arr[i] instanceof Array){
            list = list.concat(tigui(arr[i]))
        }else {
            list.push(arr[i]);
        }
    }
    return list;
}
```

- 4.设计一个缓存结构map，该结构可以缓存大量的数据，以键值对方式来存取
例如：

> map.put(“no163021”, {sno: 163021,name:”bily”,age:20, school:”qinghua”} );
向缓存中添加了一个学生信息。提取信息时，只需要map.get(“no163021”)即可获得该对象。
为了保证存储大量数据时，查找的速度足够快，可能需要用到哈希算法。
以下提供DJB哈希算法供参考：
```js
function DJBHash(str) {
    var hash = 5381;
    for(var i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charAt(i);
    }
    return hash;
}

var map = {
    data:[],
    put: function (key,value) {
        var str = DJBHash(key);
        var index = '';
        for(var i=0;i<str.length;i++){
            index+= str.charCodeAt(i);
        }
        this.data[Number(index)]=value;
    },
    get: function (key) {
        var str = DJBHash(key);
        var index = '';
        for(var i=0;i<str.length;i++){
            index+= str.charCodeAt(i);
        }
        return this.data[Number(index)];
    }
}
```

- 5.给数组的原型添加一个方法，以便可以求出一个数组的最大最小值，并用对象的方式返回值，比如{max:5,min:1}，使用apply的方法
```js
Array.prototype.getboth = function(){
    return {
        max:Math.max.apply(null,this),
        min:Math.min.apply(null,this)
    }
}
```

- 6.给出一组数据，转换成期望数组

```js
var data = {
			"rows":[["jack","16","female"],["zd","25","male"]],
			"meatdata":[
				{"name":"name","note":""},
				{"name":"age","note":""},
				{"name":"gender","note":""}
			]
		}
function getData(){
    var list=[];
    for(var arr of data.rows){
        var obj = {};
        for(var j in arr){
            var ovalue = arr[j];
            var okey = data.meatdata[j].name;
            obj[okey] = ovalue;
        }
        console.log(obj);
        list.push(obj);
    }
    return list;
}
console.log(getData());
     
```

## 11.浏览器事件对象
```js
var EventUtil={
    getEvent:function(event){//事件对象
        return event ? event:window.event
    },
    getTarget:function(evet){//事件目标
        return event.target || event.srcElement;
    },
    prventDefault:function(event){//取消事件默认行为
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    stopPropagation:function(event){//取消事件进一步冒泡或捕获
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },
    addHandler:function(element,type,handler){
        if(element.addEventListener){//检测是否存在DOM2
            element.addEventListener(type,handler,false)
        }else if(element.attachEvent){//存在ie
            element.attachEvent('on'+type,handler)
        }else{//DOM0
            element['on'+type]=handelr;
        }
    },
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type]=null;
        }
    }
}
```

## 12.用setTimeout实现setInterval
首先我们看看setInterval的缺点：

- 1.不去关心回调函数是否还在运行
在某些情况下，函数可能需要比间隔时间更长的时间去完成执行。比如说是用setInterval每隔5秒对远端服务器进行轮询，网络延迟，服务器无响应以及其他因素将会阻止请求按时按成。结果会导致返回一串无必要的排成队列请求。
- 2.忽视错误
因为某些原因，setInterval调用的代码中会出现一个错误，但是代码并不会中止执行而是继续执行错误的代码。
- 3.缺乏灵活性
除了前面提到的缺点之外，我非常希望setInterval方法能有一个表明执行次数的参数而不是无休止的执行下去。

```js
// 自实现一个setInterval
function interval(func,second,times){
    let interfunc = function(){
        if(typeof times === 'undefined' || times-->0){
            setTimeout(interfunc,second);
            try{
                func.call(null);
            }catch(e){
            t = 0;
                throw e.toString();
            }
        }
    }
setTimeout(interfunc,second)
}

// 执行 interval(function(){console.log(1)},1000,5) 结果是每个一秒打印出一个1
```

## 13.农场牛，确定年龄，性别，每隔三年生小牛，20年后有多少头牛，面向对象的方式编些
```js
var niu = function(age){
    this.age = age;
    this.sex = Math.round(Math.random());
}
niu.prototype.born = function(){
    if(this.age%3==0&&this.sex==1){
        return new niu(1);
    }
}
var farm = {
    list:[new niu(1),new niu(1),...new niu(1)];
    nextyear:function(){
        var newList=[];
        for(var i in this.list){
            var obj = this.list[i].born();
            if(obj){
                newList.push(obj);
            }
            this.list[i].age++;
        }
        this.list = this.list.concat(newList);
    }
}
for(var i=0;i<20;i++){
    farm.nextyear();
}
console.log(farm.list.length);
```