# TypeScript Module

```ts
/*
moduel模式：模块可以帮助开发者将代码分割为可重用的单元，开发者可以自己决定将模块中的哪些资源（类，方法，变量）暴露出去供外部使用，哪些资源只在模块内使用
1.模块化，可重用
2.封装变量和函数
匿名函数和闭包是javascript最棒的特征之一
 */
一个模块就是一个文件，一个文件就是一个模块
一个模块既可以向外暴露自己的属性和方法，类，又可以导入其他模块导出的属性，方法，类
(function () {
   //内部代码
}())

var a;//全局
function hello(){
    var b;//局部的
}
(function ($,w) {

}(jQuery,window))

var myModuel = function (vip) {
    //声明私有成员
    var Yvip = document.getElementById(vip);
    var YQ ='15844645';
    return{
        //公开成员，外部可以访问
        add: function (t) {
            if(t>=12){
                var Yv = t;
                Yvip.innerHTML='年费:'+Yv+"qq群:"+YQ;
            }else
            {
                var Mv = t;
                Yvip.innerHTML='月费:'+Mv;
            }
        }
    }
}
var mm = myModuel("vip");
mm.add(20);

//一般形式
interface StringValidator{
    isAcceptable(s:string):boolean;
}
var lettersRegexp = /^[a-zA-Z]+$]/
var numberRegexp = /^[0-9]+$]/
class letterOnlyValidator implements StringValidator{
    isAcceptable(s:string):boolean{
        return lettersRegexp.test(s);
    }
}
class ZipCodeValidator implements StringValidator{
    isAcceptable(s:string):boolean{
        return s.length===5&&numberRegexp.test(s);
    }
}

//现在仅有两个验证，可能还有很多，但是我们不可能去创建这么类去实现接口，可以使用TypeScript中的Moduel来实现
module Validator{
    export interface StringValidator{
        isAcceptable(s:string):boolean;
    }
    var lettersRegexp = /^[a-zA-Z]+$]/
    var numberRegexp = /^[0-9]+$]/
    class letterOnlyValidator implements StringValidator{
        isAcceptable(s:string):boolean{
            return lettersRegexp.test(s);
        }
    }
    class ZipCodeValidator implements StringValidator{
        isAcceptable(s:string):boolean{
            return s.length===5&&numberRegexp.test(s);
        }
    }

}

//moduel的应用
//time.ts
module Time{
    export class Test{
        element:HTMLElement;
        span:HTMLElement;
        timer:number;
        constructor(e:HTMLElement){
            this.element = e;
            this.element.innerHTML = '现在的时间是：';
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerHTML = new Date().toTimeString();
        }
        start(){
            this.timer = setInterval(()=>this.span.innerHTML = new Date().toTimeString());
        }
        stop(){
            clearInterval(this.timer);
        }
    }
}

//jstime.js
var div = document.createElement('div');
document.body.appendChild(div);
var obj = new Time.Test(div);
var buttonStart = document.createElement('button');
document.body.appendChild(buttonStart);
buttonStart.innerHTML = '开始';
buttonStart.onclick = function () {
    obj.start();
}
var buttonStop = document.createElement('button');
document.body.appendChild(buttonStop);
buttonStop.innerHTML = '结束';
buttonStop.onclick = function () {
    obj.stop();
}
//index.html
<script type="text/javascript" src="BooleanDemo.js"></script>
<script type="text/javascript" src="jstimer.js"></script>
```
