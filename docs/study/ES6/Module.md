# module
### ES6中的模块化是必用的，模块Module：一个模块，就是一个对其他模块暴露自己的属性或者方法的文件。

暴露函数，类，变量

```js
{
    // 导出 变量
    export let A = 123;
    
    // 导出函数
    export function test(){
        console.log(123);
    }
    
    // 导出类
    export class Test{
        Hello(){
            console.log(123);
        }
    }
    
    //当然可以批量导出
    //属性name
    var name = "前端君";
    //属性age
    var age  = 25;
    //方法 say
    var say = function(){
        console.log("say hello");
    }
    
    //批量导出
    export {name,age,say}
    
    //在另一个文件导入这个东西，变量名字必须跟导出的一致才能准确获取，位置顺序无要求。
    import {A,test,Test} from '路径';
    
    //重命名导入的变量
    import { name as myname } from "./module-B.js";
    
    // 如果模块非常多，复杂，我们需要一一导出么，导出了那么多的内容，我们只需要里两个，又怎么办呢
    
    // 想要谁就导入谁
    import {A} from '路径';
    
    // 我们导入的时候需要写所有的名字么，当然不是,*实现整体导入
    import * as lesson from '路径';//导入的东西全部保存在lesson别名中，使用的时候lesson.A就可以使用了
}

{
    // 默认导出
    export default function(){
        console.log("I am default Fn");
    }
    
    //使用export default关键字对外导出一个匿名函数，导入这个模块的时候，可以为这个匿名函数取任意的名字
    import sayDefault from "./module-B.js";

    sayDefault();
    //结果：I am default Fn
    
    //注意事项
    1.声明的变量，对外都是只读的
    //---module-B.js文件------
    var name = "前端君"
    export {name}


    //---module-A.js文件------
    import {name} from "./module-B.js";
    name = "修改字符串变量";
    //报错：name is read-only

    2.模块B导出的是对象类型的值，就可修改
    //---module-B.js文件---
    var person = {"name":"前端君"}
    export { person }


    //---module-A.js文件------
    import {person} from "./module-B.js";
    person.name = "修改字符串变量";
    //修改成功
    
    3.导入不存在的变量，值为undefined。
    //---module-B.js文件---
    var name = "前端君";
    export {name}


    //---module-A.js文件------
    import { height } from "./module-B.js";
    console.log(height);
    //打印结果：undefined
}

{
    let A=123;
    let test=function(){
        console.log('test');
    }
    class Hello{
        test(){
            console.log('class');
        }
    }
    
    export default {
        A,
        test,
        Hello
    }
    
    import lesson from '路径';
    lesson.A
}
```