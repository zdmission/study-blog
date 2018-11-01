# axios post请求参数数据格式化处理

有时候需要处理数据，把json数据格式转换成x-www-form-urlencoded 这样的格式（userId=234cd8fbcdbe4bd3943e02a44ce10213&token=267BA2AB6760D7634B99EA12976227DF）

**有好几种方式可以实现：具体如下**
### 1.方法一
```js
const formatData1 = (data) => {
    let param = new URLSearchParams()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // const element = data[key];
            param.append(key, data[key])
        }
    }
    return param
}
```
### 2.方法二
```js
const formatData = (data, mark = '') => {
    let keys = Object.keys(data), list = []
    let str = keys.map((name, index, array) => {
        if ('[object Array]' === Object.prototype.toString.call(data[name])) {
            mark = name
            list = list.concat(formatData(data[name], mark))
        } else {
            if (mark!=='') {
                list.push(`${mark}[${name}]=${data[name]}`)
            } else {
                list.push(`${name}=${data[name]}`)
            }
        }
    })
    return list.join('&')
}
```

### 3.nodejs中的querystring模块也可以实现
```js
require('querystring').stringify(config.data);
```

### 4.方法四
修改axios的默认方法
```js
transformRequest: [function (data, headers) {
        // 判断传入是不是对象
        if (Object.prototype.toString.call(data) === '[object Object]') {
            let keys = Object.keys(data)
            // 把对象里面的键值对拼接成userId=234cd8fbcdbe4bd3943e02a44ce10213&token=267BA2AB6760D7634B99EA12976227DF这样的形式
            return encodeURI(keys.map((name) => `${name}=${data[name]}`).join('&'))
        }
    }]
```

### 5.引用qs的npm包， import qs from "qs";
[QS使用参考](https://github.com/ljharb/qs)