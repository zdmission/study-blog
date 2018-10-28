# 千分位加逗号，或者电话号码加空格

首先我们举个例子，
```js
var reg = /([a-z]+)\s(\d{4})/;
var str = "hello 2020";
alert(reg.exec(str)[0]); // hello 2020
alert(reg.exec(str)[1]); // hello
alert(reg.exec(str)[2]); // 2020

那我们看看reg.exec(str)的结果又是什么呢
//["hello 2020", "hello", "2020", index: 0, input: "hello 2020", groups: undefined]
```


一个有长度，有索引的伪数组

那这个正则表达式又是什么意思呢

1.匹配一次或者多次字母并且有空格并且有4为数字，字母为一组，数字为一组


### 前瞻捕获：
```js
var reg = /[a-z]+(?=gle)  // 意思是得到后边跟的是gle的这样的字符串
console.log(reg.exec("doogle")) // ["doo"]
```

### 非捕获性分组：
```js
var reg = /([a-z]+)\s(?:\d{4})/;  // 不想捕获后边的一个分组(?:\d{4})
var str = "hello 2020";
alert(reg.exec(str)[0]); // hello 2020
alert(reg.exec(str)[1]); // hello
alert(reg.exec(str)[2]); // undefined
reg.exec(str)的结果又是什么呢
// ["hello 2020", "hello", index: 0, input: "hello 2020", groups: undefined]
```

很显然已经没有 "2020" 这一项了，所以并不会捕获 "2020"这一项

又例如：
```js
var reg = /\b\w+(?=ing\b)/g;   
意思是 \b 匹配一个字边界，即字与空格间的位置
\w 匹配包括下划线的任何单词字符
整个正则的意思是：一个字符串后三位是ing，至于ing前边的字符一个或多个，整个字符串的前后都要有边界
形如这样的    hh 34hing ss，如果匹配，那么返回值应该是34h
例如："I'm singing while you're dancing".match(/\b\w+(?=ing\b)/g)
结果是 ["sing", "danc"]
```

?! 零宽度负预测先行断言(?!exp)，断言此位置的后面不能匹配表达式exp,，例如：\d{3}(?!\d)匹配三位数字，而且这三位数字的后面不能是数字；\b((?!abc)\w)+\b匹配不包含连续字符串abc的单词。

```js
"123456".replace(/(?=(?!\b)(\d{3})+$)/g,',')   // 123,456
"123456".replace(/(?=(\B)(\d{3})+$)/g,',')      // 123,456
"123456".replace(/(?=(\d{3})+$)/g,',') // 123,456

"15708484875".replace(/(?=(\d{4})+$)/g,' ')  //  157 0848 4875
// 从后往前匹配，前瞻捕获，匹配4位数字，然后在前边加上空格
```