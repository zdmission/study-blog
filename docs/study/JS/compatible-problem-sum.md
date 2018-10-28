# 兼容问题总结

## 1.获取滚动距离的兼容
```js
//非chrome
document.documentElement.scrollTop   
document.documentElement.scrollLeft

//chrome
document.body.scrollTop
document.body.scrollLeft

//兼容写法：由于浏览器只支持其中一种，另一种为0，因此采用相加的方式
var scrolltop = document.documentElement.scrollTop + document.body.scrollTop

//更为稳妥的兼容写法：
var scrolltop = document.documentElement.scrollTop || document.body.scrollTop
```

## 2.getElementsByClassName()
```js

if(!document.getElementsByClassName){ //如果不存在该方法
    document.getElementsByClassName = function(classname){ //则手动创建
          var arr = []; 
          var all = document.getElementsByTagName("*");
          for(var i=0; i<all.length; i++){
               if(all[i].className.indexOf(classname+" ") != -1){
                    arr.push(all[i]); 
               }
          }
          return arr;
    } 
}
```

## 3.JS获取非行内样式
```js
window.getComputedStyle(ele, null)      //非IE
ele.currentStyle      //IE

function getStyle(obj, attr) {
    if(obj.currentStyle) { //IE浏览器
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj,null)[attr];
    }
}
```

## 4.获取Event对象的兼容写法
```js
obj.xxxx = function(evt){
     var e = evt || window.event;
}
```

## 5.全世界最短IE6判定
```js
if(!-[1,]) { //IE6
     
} else{ //非IE6

}
```

## 6.全世界最无争议IE判定
```js
if(window.VBArray){

} else {

}
```

## 7.键盘码获取
```js
e.keyCode || e.which
```

## 8.阻止事件传播
```js
e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
```

## 9.event.target
```js
var srcObj = event.target || event.srcElement;
```

## 10.阻止默认行为
```js
event.preventDefault();
event.returnValue = false;
e.preventDefault ? e.preventDefault() : e.returnValue=false;
```

## 11.事件监听
```js
obj.addEventListener("click",function(){},true);   //非IE

obj.attachEvent("onclick", function(){});      //IE

function addEvent(ele, eventType, func, isCapture){
     if(ele && ele.attachEvent){
          ele.attachEvent("on"+eventType, func);
     } else {
          ele.addEventListener(eventType, func, isCapture||false);
     }
}
```


## 12.函数柯里化
```js
var addEvent = (function(){
    if(window.attachEvent) {
        return function(obj, eventType, func){
            obj.attachEvent("on"+eventType, func);
        }
    } else {
        return function(obj, eventType, func,  isCapture) {
            obj.addEventListener(eventType, func, isCapture||false);
        }
    }
})();
```

## 13.request对象的兼容
```js
new ActiveXObject("Msxml2.XMLHTTP")   //IE

var req = ActiveXObject?new ActiveXObject("Msxml2.XMLHTTP"):new XMLHttpRequest() ;
```




