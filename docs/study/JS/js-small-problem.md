# js实际应用中的问题集合

## 1.数字前边加0
比如对一个10以下的数字前边加0
```js
("00"+9).substr(-2)    // 09
// 也可以是ES6中的一个方法
"1".padStart(2,"0")  // 01
```

## 2.浏览器文字突然放大
浏览器渲染过程，会按照设定的样式或者默认的样式去渲染标签，如果当时的某个div没有宽高，那么就会以为字体太小，会自动放大字体

## 3.收尾去除空格
```js
String.prototype.tirm1 = function(){
    return this.replace(/^\s+/g,"").replace(/\s+$/g,"");
}
```

## 4.为数组添加一个原型去重复方法
```js
//为数组加一个去重复的功能
Array.prototype.norepeat = function(){
    var obj = {};
    for(var i=0;i<this.length;i++){
        obj[this[i]]=1;
    }
    var arr = [];
    for(var attr in obj){
        arr.push(Number(attr));
    }
    return arr;
}
var a = [2,2,2,5,5,5,5,8,8,8,8,8];
console.log(a.norepeat());
```

