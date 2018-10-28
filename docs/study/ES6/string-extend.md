### 字符串扩展

#### 字符串新增特性
* Unicode表示法
* 遍历接口
* 模板字符串
* 新增方法10种

------

注意一些方法是ES7的提案，如果不打补丁，不处理兼容性的话，这些方法在ES6编译中是没办法通过的，所以需要安装一个补丁库，处理兼容的，这些方法经常用到，安装babel-ployfill
在文件中引入兼容库 import 'babel-ployfil'; ES7提案方法就可以正常使用了
-------

* Unicode表示法
```js
{
    //正确的表示了a
    console.log('a',`\u0061`);
    //当unicode大于0xFFFF的时候回事什么情况呢，字符串不会当做一个字符来处理，而是两个，20BB不是Unicode编码，与7都当做两个字节去解析，故显示 口7
    console.log('s',`\u20BB7`);
    
    //怎么处理这种编码呢，打上括号
    console.log('s',`\u{20BB7}`);//𠮷
}

{
  // charCodeAt
  // es5中处理，因为unicode码大于0xFFFF，大于两个字节，即当做四个字节处理，计算长度的时候，每两个字节就算是一个长度
  let s='𠮷';
  console.log('length',s.length);// 2
  //取第一个位置的字符
  console.log('0',s.charAt(0));// 乱码
  console.log('1',s.charAt(1));// 乱码
  //取第一个字符的unicode编码
  console.log('at0',s.charCodeAt(0));// 55362
  console.log('at1',s.charCodeAt(1));// 57271
  //es5中对unicode码处理不到位

  // es6中处理   codePointAt
  let s1='𠮷a';
  console.log('length',s1.length);// 3
  //取第一个字符的unicode编码
  console.log('code0',s1.codePointAt(0));// 134071
  //码值对应的字符,自动计算四个字节的码值
  console.log('code0',s1.codePointAt(0).toString(16)); // 20bb7 𠮷
  
  //取第二个字符的unicode编码,获取的是四个字节的后两个字节的码值
  console.log('code1',s1.codePointAt(1));// 57271
  console.log('code2',s1.codePointAt(2));// 97 即是a
}

{
  // String.fromCharCode
  console.log(String.fromCharCode("0x20bb7")); // 乱码
  console.log(String.fromCodePoint("0x20bb7")); // 𠮷

}

{
    // 字符串遍历,在es5中还是被当成两个字节去处理了，所以会乱码
    let str='\u{20bb7}abc';
    for(let i=0;i<str.length;i++){
     console.log('es5',str[i]);
    }
    //结果是 乱码 乱码 a b c
    
    // 通过 es6 中for---of---就可以正确处理
    for(let code of str){
     console.log('es6',code);
    }
    //结果是 𠮷 a b c
}

{
  let str="string";
  // 包含某个字符
  console.log('includes',str.includes("c"));  // false
  // 以什么字符开始
  console.log('start',str.startsWith('str')); // true
  //以什么字符结尾
  console.log('end',str.endsWith('ng'));//true
}

{
    // 重复次数，字符串复制功能
    let str="abc";
    console.log(str.repeat(2)); // abcabc
}

{
    // 模板字符串,${name} 包起来
    let name="list";
    let info="hello world";
    let m=`i am ${name},${info}`;
    console.log(m);// i am list,hello world
}

{
  // 处理日期，还有某些补缺问题相当有效，但是注意es7，需要添加补丁库
  // 补白作用，在1的前边加上0，总长度是2
  console.log('1'.padStart(2,'0'));// 01
  // 在1的后边加上0，总长度是2
  console.log('1'.padEnd(2,'0'));// 10
}

{
    // 过滤html字符串，防止xss攻击的时候，用这个特别好，还有就是处理多语言，通过不同的return，返回不同的结果
    //标签模板，怎么用，用在哪儿
    let user={
        name:'list',
        info:'hello world'
    };
    console.log(abc`i am ${user.name},${user.info}`);
    function abc(s,v1,v2){
        // 结果是 
        console.log(s,v1,v2);
        return s+v1+v2
    }
}

{
  // \n换行符没有生效，所以结果就是Hi\n3
  // raw对\n进行了转义，成了 \\n
  console.log(String.raw`Hi\n${1+2}`);
  
  //结果是换行生效
  //Hi
  //3
  console.log(`Hi\n${1+2}`);
}
```

