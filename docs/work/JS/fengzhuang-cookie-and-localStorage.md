# 封装cookie和localStorage，提供了一些公共的方法
```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.storage = factory();
})(this, function () {

    /**
     * 定义一个函数
     * 
     * @param {string} flag 传入参数，标志用户希望存储的方式，默认是cookie方式，传入locals表示localStorage存储
     * @returns {function} 
     */
    var mergeStorage = function (flag) {
        return mergeStorage.fn.init(flag);
    }
    // 模仿jQuery封装方式
    mergeStorage.fn = mergeStorage.prototype = {
        /**
         * 初始化函数
         * 
         * @param {string} flag 传入参数，存储方式
         * @returns {function} 
         */
        init: function (flag) {
            this.flag = flag || 'cookie';
            return this.judgment();
        },
        /**
          可以有用户选择存储的方式，还有一种情况是ios的无痕模式，localStorage会报错，故强制使用cookie
         * 判断用户选择的存储方式
         * 
         * @returns {function} 
         */
        judgment: function () {
            var _this = this;
            if (_this.flag === 'locals') {
                try {
                    // ios无痕模式，使用setItem会报错，捕捉错误选择cookie存储
                    window.localStorage.setItem("localStorage", 1);
                    window.localStorage.removeItem("localStorage");
                    return new _this.bLocalStorage();
                } catch (error) {
                    return new _this.cookieStorage();
                }
            } else {
                return new _this.cookieStorage();
            }
        }
    }
    mergeStorage.fn.init.protoytpe = mergeStorage.fn;
    mergeStorage.prototype.cookieStorage = function () {
        // 得到所有的cookie值，并转换为json格式的数据，后边的操作全都是操作这个this.cookie对象，当然会同步到浏览器的cookie中
        this.cookie = getAllCookie();
        /**
         * 获取存储cookie的长度
         * 
         * @param {object} obj 传入参数
         * @returns {number} len长度
         */
        this.length = (function (obj) {
            var len = 0;
            for (var key in obj) {
                len++;
            }
            return len;
        })(this.cookie);

        /**
         * 获取所有的cookie并保存在一个对象中
         * 
         * @returns {object} cookie对象
         */
        function getAllCookie() {
            var cookie = {},
                allCookieValue = document.cookie;
            if (!allCookieValue)
                return cookie;
            var listData = allCookieValue.split("; "),
                len = listData.length;
            for (var i = 0; i < len; i++) {
                var item = listData[i],
                    index = listData[i].indexOf("="),
                    key = "",
                    value = "";
                if (index > 0) {
                    key = item.substr(0, index);
                    value = decodeURIComponent(item.substr(index + 1));
                    // 把经过 JSON.stringify转换的先转回来，如果没有转换运行到JSON.parse(value)错误被捕捉后续处理
                    try {
                        cookie[key] = JSON.parse(value);
                    } catch (error) {
                        cookie[key] = value;
                    }
                }
            }
            return cookie;
        }
        /**
         * 遍历出所有存储的键值对，回调函数中
         * 
         * @param {function} fn 回调函数，第一个参数是value，第二个参数是key 
         * @returns 
         */
        this.forEach = function (fn) {
            for (var key in this.cookie) {
                fn(this.getItem(key), key);
            }
        }

        /**
         * setItem ,存储cookie，第三个值不限定,如果value为null的话，就相当于是删除这个值
         * 
         * @param {string} key 存储名称
         * @param {any} value 存储值 
         * @param {number} day 表示希望设置存储值过期的时间，单位是天 
         * @returns 
         */
        this.setItem = function (key, value, options) {
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                var path = options.path ? '; path=' + options.path : '; path=/';
                var domain = options.domain ? '; domain=' + options.domain : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [key, '=', encodeURIComponent(JSON.stringify(value)), expires, path, domain, secure].join('');
                this.cookie = getAllCookie();
            } else {
                throw new Error("value是必选项，请填写");
            }
        }
        /**
         * 获取存储值
         * 
         * @param {string} key 
         * @returns {any} 有就返回该值，反之返回null
         */
        this.getItem = function (key) {
            if (!this.cookie.hasOwnProperty(key))
                return null;
            return this.cookie[key];
        }
        /**
         * 根据key删除存储值
         * 
         * @param {string} key 存储名
         * @returns {boolean} 成功返回true，失败返回false
         */
        this.removeItem = function (key) {
            // 如果对象里面没有key这个属性就退出这个操作，否则继续删除
            if (!this.cookie.hasOwnProperty(key))
                return false;
            try {
                delete this.cookie[key];
                this.setItem(key, null);
                return true;
            } catch (error) {
                return false;
            }
        }

        /**删除所有的cookie，让所有的浏览器cookie过期同时置this.cookie为空对象
         * 删除所有的存储值        
         * @returns {boolean} 成功返回true，失败返回false
         */
        this.clear = function () {
            try {
                for (var key in this.cookie) {
                    this.setItem(key, null);
                }
                this.cookie = {};
                return true;
            } catch (error) {
                return false;
            }
        }
        return this;
    }
    mergeStorage.prototype.bLocalStorage = function () {
        this.storage = window.localStorage;
        // 获取存储数据的长度
        this.length = this.storage.length;
        /**
         * 存储 setItem
         * 
         * @param {string} key 存储名称
         * @param {any} value 存储值 
         * @param {number} day 表示希望设置存储值过期的时间，单位是天 
         * @returns 
         */
        this.setItem = function (key, value, day) {
            var temp = {},
                expires = day || 1;
            temp['value'] = value;
            // 如果没有设置多少天，那么默认和session一样，关闭浏览器即失效，和cookie的默认过期时间一样,如果小于0，立即清除
            temp['time'] = new Date().getTime() + 1000 * 60 * 60 * 24 * expires;
            expires > 0 ? this.storage.setItem(key, JSON.stringify(temp)) : this.removeItem(key);
        }
        /**
         * 获取存储值
         * 
         * @param {string} key 
         * @returns {any} 有就返回该值，反之返回null
         */
        this.getItem = function (key) {
            var item = "";
            try {
                item = JSON.parse(this.storage.getItem(key));
            } catch (error) {
                item = this.storage.getItem(key);
            }
            if (item === null) {
                return null;
            };
            if (item['time'] > new Date().getTime()) {
                return item['value'];
            } else if (item['time'] === undefined) {
                return item;
            } else {
                this.removeItem(key);
                return null;
            }
        }

        /**
         * 遍历出所有存储的键值对，回调函数中
         * 
         * @param {function} fn 回调函数，第一个参数是value，第二个参数是key 
         * @returns 
         */
        this.forEach = function (fn) {
            for (var i = this.length - 1; i >= 0; i--) {
                var key = this.storage.key(i);
                fn(this.getItem(key), key)
            }
        }
        /**
         * 根据key删除存储值
         * 
         * @param {string} key 存储名
         * @returns {boolean} 成功返回true，失败返回false
         */
        this.removeItem = function (key) {
            try {
                this.storage.removeItem(key);
                this.refresh();
                return true;
            } catch (error) {
                return false;
            }
        }
        /**
         * 删除所有的存储值        
         * @returns {boolean} 成功返回true，失败返回false
         */
        this.clear = function () {
            try {
                this.storage.clear();
                return true;
            } catch (error) {
                return false;
            }
        }
        /**
         * 重新获取存储的值，和长度     
         * @returns {boolean} 成功返回true，失败返回false
         */
        this.refresh = function () {
            this.storage = window.localStorage;
            this.length = this.storage.length;
        }
        return this;
    }
    return mergeStorage;
});
```

### 使用示例
```js
/**
 * 默认使用cookie存储，如果想要使用localStorage存储，请传入参数new storage('locals')
 * */

// 页面script标签引入,那么暴露出来的全局变量是storage
var obj = new storage() // 这种方式是cookie存储
var obj = new storage('locals') // 这种方式是localStorage存储

// es6
import storage from '../../js/storage.js'
let obj = new storage()

// AMD方式
require(['storage'],function(storage){
    var obj = new storage()
})

// 提供的方法
// 1、存储值
obj.setItem('obj','123')

// 2、获取值
obj.getItem('obj')

// 3、循环
obj.forEach(function(item) {

})

// 4、移除某一个值
obj.removeItem('obj')

// 5、清除所有的值
obj.clear()

```