# vue axios基础封装

```js
// 引入 本地的axios文件 文档 https://www.npmjs.com/package/axios
import axios from "../libs/axios/axios.min";
// import axios from "axios";
// 请求数据的序列化 qs是nodejs的一个库 文档 https://www.npmjs.com/package/qs
import qs from "qs";
const axiosAPI = axios.create({
    baseURL: "/",
    // 网络请求时间，如果超过8秒，请求将被取消
    timeout: 8000,
    // 设置返回数据为json格式
    responseType: "json",
    // 是否允许携带cookie，默认是false，不允许
    withCredentials: true,
    // http状态验证，你可以规定状态码的范围，比如 status >= 200 && status < 300，记住是一个boolean值
    validateStatus: function (status) {
        return true;
    },
    // 请求头部
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "X-Requested-With": "XMLHttpRequest"
    }
});
// 请求拦截，可以设置一些参数等等  文档 https://www.npmjs.com/package/axios
axiosAPI.interceptors.request.use(config => {
    // 请求头部中的Accept的值
    config.headers.Accept = "application/json";
    // 如果是post请求，那么需要数据序列化
    if (config.method === "post") {
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截 对于返回的数据进行处理
axiosAPI.interceptors.response.use(res => {
    const status = res.status;
    if (status === 200) {
        return Promise.resolve(res);
    } else {
        return Promise.reject(res);
    }
});

// 请求的方式post，get，请求对象exportAjaxAPI封装（包含了post，get）
const axiosRequestMethod = ["post", "get"];
const exportAjaxAPI = {};
axiosRequestMethod.forEach(method => {
    // 统一处理所有的请求
    exportAjaxAPI[method] = (url, data, config) => {
        // 返回一个Promise对象
        return new Promise((resolve, reject) => {
            axiosAPI[method](url, data, config).then(response => {
                // 处理后台返回结果
                if (!response.data) {
                    return false;
                }
                // 正常情况。Promise处理，抛出数据
                if (response.data.control.error == 0) {
                    resolve(response.data);
                } else {
                    // 其他情况给与弹层提示
                    $.capacity({
                            title: "",
                            content: response.data.control.message,
                            btnsCont: ['取消', '重新加载'],
                            height: "auto"
                        },
                        false,
                        function () {
                            window.location.reload();
                        }
                    );
                }
            }).catch(error => {
                reject(error);
            });
        })
    }
});

// Vue插件编写的流程，使用Vue.use(名字)即可使用，vue会自动的去调用install方法
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", {
            value: exportAjaxAPI
        });
    }
};
```