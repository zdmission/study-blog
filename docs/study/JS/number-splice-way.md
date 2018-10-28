# 数字方法splice的使用

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。改方法会改变原始数组

> arrayObject.splice(index,howmany,item1,.....,itemX)

参数：

index：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。

howmany：必需。要删除的项目数量。如果设置为 0，则不会删除项目。

item1, ..., itemX：可选。向数组添加的新项目。

示例数组：
```js
var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"
```

1. 	arr.splice(2,0,"William")  向数组索引为2添加一个值，William

![JS](/study/JS/JS1.png)


2.  arr.splice(2,1,"William")  删除数组索引为2值，并添加一个新元素来代替被删除的那个值William

![JS](/study/JS/JS2.png)

3.  arr.splice(2,3,"William")  删除数组索引为2开始后边的3值，并添加一个新元素来代替被删除的那3个值William

![JS](/study/JS/JS3.png)

4.  arr.splice(-2,0,"ssss")  数组倒着数，在第二哥元素后添加一个元素ssss

![JS](/study/JS/JS4.png)

5.  arr.splice(-2,1,"ssss")  数组倒着数，删除第二个元素并添加一个新元素ssss代替被删除的元素

![JS](/study/JS/JS5.png)

