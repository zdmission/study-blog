# 如果不想使用babel-polyfill整个文件，可以使用按需引入

babel-polyfill文件压缩之后也有100k左右，如果在你的项目中没有使用很多ES6或者以上版本的扩展方法，那么你可以按需引入你使用的方法

1. 安装core-js核心方法集合
```bash
npm i -D core-js
```
2. 使用
```js
import assign from 'core-js/library/fn/object/assign'
import {includes} from 'core-js/library/fn/array'
console.log(ass)
let a = {
    name: 'zd',
    age: 24
}
let b = {
    name: 'lq',
    address: '大锅饭的客户反馈'
}
console.log([1,2,3,4].includes(1)) // true
console.log([1,2,3,4].includes(5)) // false
console.log(assign({},a,b)) // {name: "lq", age: 24, address: "大锅饭的客户反馈"}
```