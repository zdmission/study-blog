# 常用工具方法


## 1.去空格
```js
// 去空格
export function trim (value){
    return value.replace(/\s+/gm, '')
}
```

## 2.cookie的读写
```js
//cookie的读写
export function cookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        let expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            let date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        let path = options.path
            ? '; path=' + options.path
            : '; path=/';
        let domain = options.domain
            ? '; domain=' + options.domain
            : '';
        let secure = options.secure
            ? '; secure'
            : '';
        document.cookie = [
            name,
            '=',
            encodeURIComponent(value),
            expires,
            path,
            domain,
            secure
        ].join('');
    } else { // only name given, get cookie
        let cookieValue = null;
        if (document.cookie && document.cookie != '') {
            let cookies = document
                .cookie
                .split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].replace(/\s/g, "");
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
```

## 3.算术运算-加法
```js
//算术运算-加法
export function Math_add(arg1, arg2) {
    let r1,
        r2,
        m,
        c;
    try {
        r1 = arg1
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
};
```

## 4.算术运算-减法
```js
//算术运算-减法
export function Math_sub(arg1, arg2) {
    let r1,
        r2,
        m,
        n;
    try {
        r1 = arg1
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2)
        ? r1
        : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
```

## 5.算术运算-乘法
```js
//算术运算-乘法
export function Math_mul(arg1, arg2) {
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
```

## 6.算术运算-除法
```js
//算术运算-除法
export function Math_div(arg1, arg2) {
    let t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
        t1 = arg1
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {}
    try {
        t2 = arg2
            .toString()
            .split(".")[1]
            .length;
    } catch (e) {}
    // with(Math) {  r1 = Number(arg1.toString().replace(".", ""));  r2 =
    // Number(arg2.toString().replace(".", ""));  return (r1 / r2) * pow(10, t2 -
    // t1); }

};
```

## 7.页面跳转
```js
//页面跳转
export function goUrl(aUrl) {
    var _url = aUrl.replace(/(.*)(\.html)(.*)/g, ($0, $1, $2, $3) => {
        if($3 === "") {
            return `${$1}${$2}?timeStamp=${Date.now()}`
        } else {
            switch($3.slice(0, 1)) {
                case "?":
                    return `${$1}${$2}?timeStamp=${Date.now()}&${$3.slice(1)}`
                case "#":
                    return `${$1}${$2}?timeStamp=${Date.now()}${$3}`
                default :
                    return $0
            }
        }
    })
    
    window.location.href = _url;
};
```

## 8.获取url中的某个参数
```js
//获取url中的某个参数
export function getPara(param) {
    let query = window.location.search;
    if (query.length == 0) {
        return "";
    } else {
        let iLen = param.length;
        let iStart = query.indexOf(param);
        //判断是否有那个需要查询值的传递参数
        if (iStart == -1) {
            return ""; //没有就返回一个空值
        }
        iStart += iLen + 1;
        let iEnd = query.indexOf("&", iStart); //判断是不是带有多个参数   &为多个参数的连接符号
        if (iEnd == -1) {
            return query.substring(iStart);
        }
        return query.substring(iStart, iEnd);
    }
};
```

## 9.获取系统时间
```js
/*获取系统时间
 *参数类型
 *time:返回时间戳
 *默认返回：yyyy-mm-dd:年月日
 */
export function getSysTime(type) {
    let date = new Date();
    let y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate();
    m = m < 10
        ? "0" + m
        : m;
    d = d < 10
        ? "0" + d
        : d;
    switch (type) {
        case "time":
            return date.getTime();
            break;
        default:
            return y + "-" + m + "-" + d;
    }
};
```

## 10.本地存储-获取/增加/修改 value值为字符串或者json对象
```js
//本地存储-获取/增加/修改 value值为字符串或者json对象
export function storage(name, value) {
    let cstorage = window.localStorage;
    if (!arguments.length) {
        return cstorage; //没有参数时返回所有localStorage
    }
    if (typeof value === "undefined") {
        //取本地存储
        let curValue = cstorage.getItem(name);
        let transValue = isJson(curValue);
        return curValue = transValue
            ? transValue
            : curValue;
    } else {
        //添加、修改本地存储
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        cstorage.removeItem(name);
        cstorage.setItem(name, value);
    }
};
```

## 11.删除本地存储
```js
//删除本地存储
export function delStorage(name) {
    let cstorage = window.localStorage;
    if (arguments[0] === -1) {
        cstorage.clear();
    } else {
        cstorage.removeItem(name)
    }
};
```

## 12.判断字符串是否是json格式
```js
//判断字符串是否是json格式
export function isJson(str) {
    try {
        if (window.JSON)
            JSON.parse(str);
            return true
        }
    catch (e) {
        return false;
    }
};
```

## 13.rem布局设置函数
```js
/* rem布局设置函数 */
export function remFn(num) {
    let htmlObj = document.getElementsByTagName("html")[0]
    htmlObj.style.fontSize = document.body.clientWidth / num + "px";
};
```

## 14.千分位，小数点格式化
```js
/**
 * 千分位，小数点格式化
 * @param {string,number} num 表示需要转换的数据
 * @param {number} isFixed 表示保留的小数位,传入值是小数,默认情况是原数输出
 */
export function formatThousandUpdate(num, isFixed) {
    if (isNaN(parseFloat(num))) {
        return ''
    }
    let val = isFixed != undefined ? Number(num).toFixed(isFixed).toString() : Number(num).toString()
    if(isFixed != undefined) {
        let valEnd = (/\./).test(val),
            leftValue = '',
            rightValue = ''
        if (valEnd) {
            leftValue = val.split('.')[0]
            rightValue = val.split('.')[1]
        } else {
            leftValue = val
        }
        let reg = /(\d+)(\d{3})/
        while (reg.test(leftValue)) {
            leftValue = leftValue.replace(reg, '$1,$2')
        }
        return `${leftValue}${isFixed?'.':''}${rightValue}`
    }else {
        return val
    }
}
```

## 15.千分位，小数点格式化2
```js
//num:金额 isFixed:小数的位数,默认为2位小数
export function formatThousand(num, isFixed) {
    if (isNaN(parseFloat(num))) {
        return '';
    }

    if (isFixed === undefined) {
        isFixed = 2;
    }
    let val = num.toString(),
        valEnd = (/\./).test(val),
        str = '',
        reg = /(\d+)(\d{3})/;
    if (isFixed && isFixed != 0) {
        if (valEnd) {
            if (val.split('.')[1].length < isFixed) {
                for (let i = 0; i < isFixed - val.split('.')[1].length; i++) {
                    str += '0';
                }
                val = val + str;
            } else if (val.split('.')[1].length == isFixed) {
                val = val;
            }

        } else {
            for (let i = 0; i < isFixed; i++) {
                str += '0';
            }
            val = val + "." + str;
        }

        while (reg.test(val.split('.')[0])) {
            val = val.replace(reg, '$1,$2');
        }
    } else {
        if (valEnd) {
            while (reg.test(val.split('.')[0])) {
                val = val
                    .split('.')[0]
                    .replace(reg, '$1,$2');
            }
        } else {
            while (reg.test(val)) {
                val = val.replace(reg, '$1,$2');
            }
        }

    }
    return val;
}
```

## 16.时间戳转换日期格式
```js
/*时间戳转换日期格式*/
/*接口返回的是毫秒*/
export function formatTime(times,type) {
    let now = new Date(times)
    let year = now.getFullYear(),
        month = now.getMonth() + 1,
        date = now.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (date < 10) {
        date = '0' + date
    }
    if(type == undefined) {
        return year + "-" + month + "-" + date
    }else {
        return `${year}${type}${month}${type}${date}`
    }
}
```

## 17.时间戳转换成年月日时分秒，形如 2018-04-16 15:13:14
```js
// 时间戳转换成年月日时分秒，形如 2018-04-16 15:13:14
export function formatSecond(times) {
	let time = new Date(times)
	let year = time.getFullYear()
	let month = (time.getMonth() + 1) > 9 && (time.getMonth() + 1) || ('0' + (time.getMonth() + 1))
	let date = time.getDate() > 9 && time.getDate() || ('0' + time.getDate())
	let hour = time.getHours() > 9 && time.getHours() || ('0' + time.getHours())
	let minute = time.getMinutes() > 9 && time.getMinutes() || ('0' + time.getMinutes())
	let second = time.getSeconds() > 9 && time.getSeconds() || ('0' + time.getSeconds())
	let YmdHis = `${year}-${month}-${date} ${hour}:${minute}:${second}`
	return YmdHis;
}
```

## 18.返回页面，页面停留在上一次的位置
```js
export function toGoOrigin() {
    document.body.ontouchend = () => {
        setTimeout(function () {
            cookie('scrollTop', window.scrollY || window.pageYOffset || document.body.scrollTop)
        }, 900)
    }

    let scrollWindow = function () {
        let scrollTop = 0
        let cookieTop = cookie('scrollTop');
        if (!!cookieTop) {
            scrollTop = cookieTop
        }
        setTimeout(function () {
            window.scrollBy(0, scrollTop)
        }, 500)

    }
    window.addEventListener('load', scrollWindow, false)
    // window.addEventListener('beforeunload', addOnBeforeUnload, false)
};
```

## 19."Function", "Object", "String", "Undefined"判断变量是否属于
```js
const typeArr = [
        "Function", "Object", "String", "Undefined"
    ],
    utils = {}; // 类型数组

// 给utils对象添加上类型判断的方法
typeArr.forEach(function (item) {
    /**
         * [检查对象是否属于某个类型的方法]
         * @param  {[Any]} obj [需要检测的对象 必须]
         * @return {[Boolean]}     [返回检测的结果]
         */
    this["is" + item] = function (obj) {
        return Object.prototype.toString.call(obj) === "[object " + item + "]";
    };
}, utils);
```

## 20.参数序列化
```js
/**
 * 参数序列化
 */
export function paramSerialization(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        let keys = Object.keys(data)
        // 把对象里面的键值对拼接成userId=234cd8fbcdbe4bd3943e02a44ce10213&token=267BA2AB6760D7634B99EA12976227DF这样的形式
        return encodeURI(keys.map((name) => `${name}=${data[name]}`).join('&'))
    }
}
```

## 21.对象合并函数
```js
// 对象合并函数
export function merge (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let singleData = arguments[i] || {};
        for (let key in singleData) {
            if (singleData.hasOwnProperty(key)) {
                let value = singleData[key]
                if (value !== undefined) {
                    target[key] = value
                }
            }
        }
    }
    return target
}
```

## 22.封装原生ajax请求
```js
/**
 * 封装原生ajax请求
 * 参数object
 * method：请求的方式，GET或者POST，默认是GET
 * url: 请求地址
 * data: 传输数据
 * async: 同步异步请求，默认是true(异步)
 */
export function ajaxApi(options = {
    method: 'GET',
    url: '',
    data: {},
    async: true
}) {
    let type = options.method.toLowerCase()
    return new Promise((resolve, reject) => {
        !options.url ? reject("[ajaxAPI: error] empty url isn't allowed") : ''
        let xmlHttp = null
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest()
        } else if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
        } else {
            reject("[ajaxAPI: error] browser not supported")
        }
        type == 'get' ? xmlHttp.open('GET', options.url + '?' + paramSerialization(options.data), options.async) : xmlHttp.open('POST', options.url, options.async)

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                resolve(JSON.parse(xmlHttp.responseText))
            } else {
                reject({
                    control: {
                        error: xmlHttp.status,
                        reponse: xmlHttp.response
                    }
                })
            }
        }
        if (type == 'get') {
            xmlHttp.send()
        } else {
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xmlHttp.send(paramSerialization(options.data))
        }
    })
}
```

## 22.判断是够是空对象
```js
// 判断是够是空对象
export function isEmptyObject(obj) {
    for (let key in obj)
        return !1
    return !0
}
```

## 23.正则判断是否是手机号
```js
/**
 *
 * 正则判断是否是手机号
 * @export
 * @param {String} value
 * @returns {Boolean} 
 */
export function isMobile(value) {
    return /^1\d{10}$/.test(value)
}
```

## 24.正则判定身份证号是否合法
```js
/**
 *
 * 正则判定身份证号是否合法
 * @export
 * @param {String} id
 * @returns {Boolean} 
 */
export function isIDCard(id) {
    return /(^\d{15}$)|(^\d{17}([0-9Xx])$)/.test(id)
}
```

## 25.是否含有中文字符
```js
/**
 *
 * 是否含有中文字符
 * @export
 * @param {String} str
 * @returns {Boolean}
 */
export function isHasChinese(str) {
    return /[\u4e00-\u9fa5]{1,}/g.test(str)
}
```

## 26.导出
```js
export {
    utils
}
export default Object.assign({
}, utils)
```
