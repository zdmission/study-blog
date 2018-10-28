#### 对象新增特性
* 简洁表示
* 属性表达式
* 扩展运算符
* Object新增方法
* 
这个对象表示指class生成的对象，而是Object
------

```js
{
    // 简介表示法
    let o=1;
    let k=2;
    let es5={
        o:o,
        k:k
    };
    let es6={
        o,
        k
    };
    console.log(es5,es6);// 结果一样，es6更加简洁
    
    let es5_method={
        hello:function(){
          console.log('hello');
        }
    };
    let es6_method={
        hello(){
          console.log('hello');
        }
    };
    console.log(es5_method.hello(),es6_method.hello());

}

{
    // 属性表达式
    // es5中的属性一般是一个定值，而es6可以是定值也可以是变量
    let a='b';
    let es5_obj={
        a:'c',
        b:'c'
    };
    
    let es6_obj={
        [a]:'c'
    }
    
    console.log(es5_obj,es6_obj);
}

{
    // 新增API
    // 判断两个值是不是完全相等，与 === 的功能是一样的
    console.log('字符串',Object.is('abc','abc'),'abc'==='abc'); // true true
    
    // 数组是引用类型，指向内存中的地址不一样,值都是空
    console.log('数组',Object.is([],[]),[]===[]); // false false
    
    // 拷贝功能，从右往左合并,属于浅复制，只拷贝引用，不拷贝所有的属性，如果有继承的，不可枚举的话，都是不拷贝的
    console.log('拷贝',Object.assign({a:'a'},{b:'b'})); // {a:'a',b:'b'}
    
    
    let test={k:123,o:456};
    for(let [key,value] of Object.entries(test)){
        console.log([key,value]);
    }

}

{
    // 扩展运算符，需要加入补丁的，但貌似支持不好，一般不怎么使用
    let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
    c={
     c:'ddd',
     d:'ccc'
    }
}

```