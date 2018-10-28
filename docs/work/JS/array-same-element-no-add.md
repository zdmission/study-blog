# 数组中相同元素不重复添加

数组中相同元素不重复添加
```js
var datahuizong = {};
// 参数：prop = 属性，val = 值
function createJson(prop, val) {
    // 如果 val 被忽略
    if(typeof val === "undefined") {
    // 删除属性
    delete datahuizong[prop];
    }
    else {
    // 添加 或 修改
    datahuizong[prop] = val;
    }
}
```