### 正则新增扩展
* 构造函数的变化
```js
{
    //es5中写法
    let regex = new RegExp('xyz','i');
    let regex = new RegExp(/xyz/i);
    //两种方式声明正则，第一种方式两个参数 ，第一个参数必须是字符串，第二个参数是修饰符
    console.log(regex.test("xyz123"),regex2.test("xyz123"));//true true
    //es6中增加的写法
    let regex3 = new RegExp(/xyz/ig,"i");
    console.log(regex3.flags);// i 
    //es6中如果使用这种方式去声明构造函数的话，第二个修饰符会覆盖掉第一个参数中ig这个修饰符
    //flags是es6新增的，用来的获取修饰符的一个属性
}
```
* 正则方法的扩展
* u修饰符
```js
{
    //u修饰符，是unicode的第一个字母,用来处理大于\uffff（也就是两个字节的字符）
    console.log('u1',/^\uD83D/.test("\uD83D\uDC2A"));// true
    console.log('u1',/^\uD83D/u.test("\uD83D\uDC2A"));// false
    /**
    \uD83D\uDC2A这是unicode码对汉字的编码，一个汉字两个字节，一个编码对应一个字符
    第一个没加u，四个字节，两个字符，第一个会匹配成功
    而第二个加u了，会把\uD83D\uDC2A这四个字节看成是一个字符，所以匹配不成功
    */
    console.log(/\u{61}/.test('a')); // false
    console.log(/\u{61}/u.test('a')); // true
    //这中情况大括号{}包起来的内容是作为unicode字符的，但是如果不加u的话是没办法识别的
    
    //如果你的字符串中有字符大于两个字节的话，你就要特别注意了
    /**
    ES3允许使用类似\u0061这样的形式来表示字符，其中的数字是Unicode-8编码。

    但如果超出\uffff的字符，必须使用双字节的形式表达，例如 \uD842\uDFB7。

    在ES6中，可以用\u{20BB7}这种形式表示，其中数字是Unicode-16编码。
    */
    //点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。

    var s = '𠮷';
    
    /^.$/.test(s) // false
    /^.$/u.test(s) // true

    //上面代码表示，如果不添加u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败
}
```
* y修饰符
```js
{
   //es5写法
   let s = 'bbb_bb_b';
   let a1 = /b+/g;
   let a2 = /b+/y;
   console.log("one",a1.exec(s),a2.exec(s));
   //第一步匹配两种方式的结果是一样,结果是bbb_bb_b
   //接下来再在第一步的基础上进行匹配
   console.log("two",a1.exec(s),a2.exec(s))
   //结果却有点不一样，第一种方式会匹配bb_b，而y修饰符匹配返回的结果是null
   //这两种方式都是全局匹配
   /**
   g修饰符强调的是下一次匹配不要求第一个值就匹配上，后边的任何一个地方匹配上都可以，而y修饰符必须是第一次匹配成功之后第二次接着匹配的的第一个字符就要匹配上，否则返回的结果就是null
   在本例中，g修饰符会忽略下划线，而y修饰符则不会，他们首次匹配因为都是bbb开头所以返回的结果是一样的
   */
   console.log(a1.sticky,a2.sticky);//false true
   //判断是否开启y修饰符
}
```
* s修饰符（es6提案里有但是没有完善）