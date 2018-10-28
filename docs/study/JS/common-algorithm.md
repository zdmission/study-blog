# 常见算法

## 1.冒泡排序

```
var arr = [98, 2, 56, 42, 85, 11, 23, 67, 95];
//冒泡排序
// 方式一
for(var i = 0; i < arr.length - 1; i++) {
    for(var j = 0; j < arr.length - i - 1; j++) {
        if(arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

// 方式二
for(var i = 0; i < arr.length - 1; i++) {
    var index = i;
    for(var j = i + 1; j < arr.length; j++) {
        if(arr[j] < arr[index]) {
            index = j;
        }
    }
    if(index != i) {
        arr[i] = arr[i] + arr[index];
        arr[index] = arr[i] - arr[index];
        arr[i] = arr[i] - arr[index];
    }
}
```

## 2.选择排序
```
//选择排序
for(var i = 0; i < arr.length - 1; i++) {
    for(var j = i + 1; j < arr.length; j++) {
        if(arr[i] > arr[j]) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
// console.log(arr);
```

## 3.快速排序
```
//快速排序
function quickSort(arr) {
    if(arr.length < 2) {
        return arr;
    }
    var midindex;
    //获取数组的中间索引值
    if(arr.length % 2 == 0) {
        midindex = arr.length / 2;
    } else {
        midindex = (arr.length - 1) / 2;
    }

    var left = [];
    var right = [];
    //循环与中间索引的具体数组值作比较，比中间值小，放在左边的数组，比中间值大，放右边数组，等于的时候，结束本次循环
    for(var i in arr) {
        if(i != midindex) {
            if(arr[i] <= arr[midindex]) {
                left.push(arr[i]);
            } else {
                right.push(arr[i])
            }
        }
    }
    return quickSort(left).concat(arr[midindex]).concat(quickSort(right));
}
console.log(quickSort(arr));
```

## 4.插入排序
```
//插入排序
var arr = [98, 2, 56, 42, 85, 0, 100, 11, 23, 67, 95];

function insertSort(arr) {
    var list = [arr.shift()];
    //或者这样写var list = [arr[0]];对原数组不影响
    for(var i = 0; i < arr.length; i++) {
        //for(var i=1;i<arr.length;i++){
        for(var k = list.length - 1; k >= 0; k--) {
            if(arr[i] < list[k]) {
                list[k + 1] = list[k];
                if(k == 0) {
                    list[k] = arr[i];
                    break;
                }
            } else {
                list[k + 1] = arr[i];
                break;
            }
        }
    }
    return list;
}
//这样会对原来的数组产生影响var list = [arr.shift()];
console.log(insertSort(arr));
```