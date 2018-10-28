#### 函数扩展新增特性
* 参数默认值
* rest参数
* 扩展运算符
* 箭头函数
* this绑定
* 尾调用
------ 

```js
{
    function test(x, y='world'){
        console.log('默认值',x,y);
    }
    test('hello');// 默认值 hello world
    test('hello','kitty');// 默认值 hello kitty
    
    // 注意：如上函数所示，参数只传一个值，y的值就是设定的默认值
    // 如果两个参数都传入，那么就会覆盖y的默认值
    // (x, y='world')这个顺序不能像 (y='world',x)倒过来写，参数默认值只能写在最后，或者后边的都是设置默认值的参数
    // 也不能(y = x,x)像这样声明参数
}

{
    // 作用域
    let x='test';
    function test2(x,y=x){
        console.log('作用域',x,y);
    }
    test2('kill');// kill kill
    
    test2();// undefined undefined
    
    
    // 如果是这样的呢,声明的参数x不在函数的作用域内
    function test3(c,y=x){
        console.log('作用域',c,y);
    }
    test3('kill');// kill test
    test3();// undefined test
}

{
    // 一系列参数转化成了数组，es5中的arguments有异曲同工之妙，
    function test3(...arg){
        for(let v of arg){
          console.log('rest',v);
        }
    }
    test3(1,2,3,4,'a');
    
    // 注意 ： ...arg参数后边不能再跟参数,它不知道这个参数什么时候截止啊
    // rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量
    // 函数的length属性，不包括 rest 参数。length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数
    (function(a) {}).length  // 1
    (function(...a) {}).length  // 0
    (function(a, ...b) {}).length  // 1

}

{
    // 扩展运算符 spread ,数组转换成离散值
    console.log(...[1,2,4]);// 1 2 4
    console.log('a',...[1,2,4]);// 'a' 1 2 4
}

{
    // 函数名，参数，返回值
    let arrow = v => v*2;
    let arrow2 = () => 5;
    console.log('arrow',arrow(3));// 6
    console.log(arrow2()); // 5
}

{
    // 函数尾调用,形如这样的形式，提升性能，递归的相当耗性能的
  function tail(x){
    console.log('tail',x);
  }
  function fx(x){
    return tail(x)
  }
  fx(123)// tail 123
}

```