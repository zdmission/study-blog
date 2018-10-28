# ECMA5数组新特性

```js
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 1.位置方法
```js
//indexOf(value),从左往右，返回的是传入值在数组里面的索引位置,如果传入值在数组里面有多个，只返回第一个值所在的索引,
//如果没有查到，返回-1
console.log(list.indexOf(4));//3
//如果传入两个参数，第二个表示从该索引位置开启查找，第一个表示值indexOf(value,index)
console.log(list.indexOf(2,4));//  -1
console.log(list.indexOf(4,2));//  3
//lastIndexOf(value),从右往左，返回的是传入值在数组里面的索引位置,如果传入值在数组里面有多个，只返回第一个值所在的索引
console.log(list.lastIndexOf(8));//7
//lastIndexOf()两个参数的时候，后边的参数无效
```

## 2.迭代方法
```js
//调用 function 时将传入三个参数：元素的值，元素的索引，和遍历的对象。
//forEach：循环数组中的每一项的值，并执行这个指定的函数，函数里面可以做一些逻辑运算等
list.forEach(function (item, index, array) {
    alert(item);
})
也可以直接传入一个函数，比如alert,console.log;

//filter：对数组中的每一项进行一个函数的运行，返回过滤后的结果，返回的是新数组，不会对原来的数组产生影响
var result = list.filter(function (item, index, array) {
    return item > 5;//result的结果为6,7,8,9
})
//every：对数组中的每一项进行一个函数的运行 如果所有项的结果都返回true，结果才返回true，如果有一项返回false，结果返回false
var result = list.every(function (item, index, array) {
    return item > 6;//结果是false
})
//some：对数组中的每一项进行一个函数的运行 如果所有项的结果都返回false，结果才返回false，如果有一项返回true，结果返回true
var result = list.some(function (item, index, array) {
    return item > 8;//结果是true
})
//map：对数组中的每一项进行一个函数的运行 经过函数的执行完毕 把新的结果返回 不会对原来的数据产生影响
var result = list.map(function (item, index, array) {
    return item * 3;
})
```

## 3.缩小方法
```js
//reduce：第一个参数前一个值，第二个参数当前值，第三个参数是当前索引，第四个参数是遍历的对象
//第一次调用回调函数时，previousValue 和 currentValue 的取值可以是下面两种情况之一。如果为 reduce 调用提供了一个 initialValue，则 previousValue 将等于 initialValue 并且 currentValue 将等于数组的首个元素值。如果没提供 initialValue，则 previousValue 将等于数组的首个元素值并且 currentValue 将等于数组的第二个元素值。如果数组里没有元素并且没有提供 initialValue，则抛出一个 TypeError 异常
var result = list.reduce(function (previousValue,currentValue,currentIndex,array) {
    return previousValue+currentValue;
});
//这个返回的结果是累加求和的意思,故结果是 45
console.log(result);

//reduceRight:倒叙遍历，和reduce遍历的起始位置不同而已，实质没有多少区别
//第一次调用回调函数时，previousValue 和 currentValue 的取值可以是下面两种情况之一。如果为 reduceRight 调用提供了一个 initialValue，则 previousValue 将等于 initialValue 并且 currentValue 将等于数组的最后一个元素值。如果没提供 initialValue，则 previousValue 将等于数组的最后一个元素值并且 currentValue 将等于数组的倒数第二个元素值。如果数组里没有元素并且没有提供 initialValue，则抛出一个 TypeError 异常。
var result = list.reduceRight(function (previousValue,currentValue,currentIndex,array) {
    return previousValue+currentValue;
});
console.log(result);//故结果也是 45
```