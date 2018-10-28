# Symbol
#### Symbol用法，提供一个独一无二的值，用Symbol声明的值，不重复不相等

```js
{
    // 没有使用new，而是当函数使，
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1===a2); // false
    
    // Symbol.for(key)先确定在全局范围内是不是有注册了该值，如果没有的话，就取调用Symbol()生成独一无二的值
    let a3=Symbol.for('a3');
    let a4=Symbol.for('a3');
    console.log(a3===a4); // true
}

{
    let a1=Symbol.for('abc');
    let obj={
        [a1]:'123',
        'abc':345,
        'c':456
    };
    // 考虑问题，都是abc的属性，是不是重复了呢
    console.log('obj',obj);// {abc:345,c:456,Symbol(abc):"123"}
    
    // 如果对象中有用Symbol作为属性(key)的，for--of--,for--in--是拿不到key值的，只拿到了非Symbol得key-value
    for(let [key,value] of Object.entries(obj)){
        console.log('let of',key,value);
    }
    // 结果是 let of abc 345
    // 结果是 let of c 456
    
    // 这个方法就可以取到Symbol作为属性(key)的值啦，只拿到了Symbol得key-value
    Object.getOwnPropertySymbols(obj).forEach(function(item){
        console.log(obj[item]);// 123
    })

    // 既拿到Symbol得key-value，又拿到非Symbol得key-value
    Reflect.ownKeys(obj).forEach(function(item){
    console.log('ownkeys',item,obj[item]);
  })
  // ownkeys abc 345
  // ownkeys c 456
  // ownkeys Symbol(abc) 123
}
```