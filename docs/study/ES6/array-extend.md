# 数组扩展
**数组新增特性**

Array.from | Array.of | copyWithin
---|---|---
find/findIndex | fill | entries/keys/values
includes | 

```js
{
    // 一组数字转换成数组
    let arr = Array.of(3,4,7,9,11);
    console.log('arr=',arr);// [3,4,7,9,11]
    
    // 不传入参数，返回的是空数组
    let empty=Array.of();
    console.log('empty',empty);// []
}

{
    // 把伪数组，集合转换成真正的数组
    let p=document.querySelectorAll('p');
    let pArr=Array.from(p);
    // forEach方法只能遍历真正的数组
    pArr.forEach(function(item){
        console.log(item.textContent);
    });
   
    // Array.from还有一个类似于数组方法中国map的功能，除了第一个参数外，还有第二个参数是一个函数
    // 转换数组的同时还遍历了数组并计算返回新的数组
    console.log(Array.from([1,3,5],function(item){return item*2})); // [2,6,10]
}

{
    console.log('fill-7',[1,'a',undefined].fill(7)); // [7,7,7]
    
    // 替换，第一个参数表示替换的值，第二个参数表示从哪开始替换（包含起始索引），第三个参数表示到哪结束，不包含结束索引
    console.log('fill,pos',['a','b','c'].fill(7,1,3));// [a,7,7]
}
{
    for (let index of ['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1
    
    // 有兼容问题，需要补丁
    for (let elem of ['a', 'b'].values()) {
        console.log(elem);
    }
    // 'a'
    // 'b'
    
    for (let [index, elem] of ['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
    
    //如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']
}

{
    // 第一个参数 替换
    // Array.prototype.copyWithin(target, start = 0, end = this.length)
    // target（必需）：从该位置开始替换数据。
    // start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
    // end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
    [1, 2, 3, 4, 5].copyWithin(0, 3)
    // [4, 5, 3, 4, 5]
    console.log([1,2,3,4,5].copyWithin(0,3,4)); 
    // [4,2,3,4,5]
}

{
    // 找出第一个符合条件的返回
    console.log([1,2,3,4,5,6].find(function(item){return item>3})); // 4
    
    // 找出第一个符合条件的值的索引值
    console.log([1,2,3,4,5,6].findIndex(function(item){return item>3})); // 3
}


{
    // Array.prototype.includes方法返回一个布尔值
    console.log('number',[1,2,NaN].includes(1)); // true
    console.log('number',[1,2,NaN].includes(NaN)); // true
    
    [1, 2, 3].includes(4)     // false
    
    //该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
    
    // NAN是不能做相等运算的
    // es5中使用indexOf检查是否包含某一个值
    arr.indexOf(el)!==-1
    // indexOf一不够语义化，二是内部使用严格相等运算符（===）进行判断，会产生对NAN的误判
}
```
#### es6中的数组方法会对数组空位转为undefined
#### ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

* forEach(), filter(), every() 和some()都会跳过空位。
* map()会跳过空位，但会保留这个值
* join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。





















