### 数值扩展
#### 新增方法
#### 方法调整，需要先打Number对象
```js
{
    // es6中二进制表示都是以0B开头,b大小写都可以
    console.log(0b111110111)// 十进制 503
    
    // 八进制 0o，o也是如此，大小写皆可
    console.log(0o767)// 十进制 503
}

{
    // Number.isFinite 判断数值是不是有尽
    console.log('15',Number.isFinite(15));// true
    console.log('NaN',Number.isFinite(NaN)); // false
    console.log('1/0',Number.isFinite('true'/0)); // false
    
    // 判断数值是不是数
    console.log('NaN',Number.isNaN(NaN));// true
    console.log('0',Number.isNaN(0));// false

}

{
    // 判断一个数是不是整数
    console.log('25',Number.isInteger(25));// true 
    console.log('25.0',Number.isInteger(25.0));// true 
    console.log('25.1',Number.isInteger(25.1));// false
    
    // 如果传入的是一个字符串，返回值是false
    console.log('25',Number.isInteger('25')); // false
    
    
}

{
    // 判断一个数是不是在 2^(-53)到2^53之间，不包含端点，不在的话，存储就不准了
    // 最大上限，最小下限
    console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
    
    // 参数一定是一个数
    console.log('10',Number.isSafeInteger(10));// true
    console.log('a',Number.isSafeInteger('a'));// false
}

{
    // 取小数的整数部分,不会自动四舍五入
    console.log(4.1,Math.trunc(4.1));// 4
    console.log(4.9,Math.trunc(4.9));// 4
}

{
    // 判断一个数是整数，0，负数,返回值分别是1,0，-1，参数一定是数字,如果不是数字的话，返回NAN
    console.log('-5',Math.sign(-5)); // -1
    console.log('0',Math.sign(0));// 0
    console.log('5',Math.sign(5));// 1
    
    // '50'会自动转换成数字
    console.log('50',Math.sign('50'));// 1
    console.log('foo',Math.sign('foo'));// NAN
}

{
    // 立方根
    console.log('-1',Math.cbrt(-1));// -1
    console.log('8',Math.cbrt(8));// 2
}

// es6 还有三角函数，对数
```