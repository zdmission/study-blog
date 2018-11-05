# 对浏览器userAgent的封装

```js
/**
 * 
 * 对用户代理userAgent进行了简单的封装
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.userAgent = factory();
})(this, function () {
    var tips = "特殊版本，您可以拿到本对象中的_userAgent特殊处理";
    /**
     * 
     * 
     * @param {any} name 
     * @param {any} version 
     * @returns 
     */
    function _fzOSAndVersion(name, version) {
        return { "name": name || "", "version": version || "" };
    }

    function UA() { };
    // 获取系统的userAgent，以便后续处理
    UA.prototype._userAgent = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase();
    /**
     * @returns {boolean} 判断是否在微信浏览器
     */
    UA.prototype.getIsWX = function () {
        return /micromessenger/.test(this._userAgent);
    }

    /**
     * @returns {boolean} 判断是否是 android ，是返回true
     */
    UA.prototype.getIsAndroid = function () {
        return /(android | adr)/.test(this._userAgent);
    }

    /**
     * @returns {boolean} 不含Android字眼，但是是安卓的系统，比如黑莓，洛基亚,如果是*                    这样的情况返回true
     */
    UA.prototype.getSpecialAndroid = function () {
        return !/(android|adr|iphone|ipad|ipod)/.test(this._userAgent) && /mobile/.test(this._userAgent);
    }

    /**
     * @returns {boolean} 判断是否是 IPhone ，是返回true
     */
    UA.prototype.getIsIPhone = function () {
        return /iphone/.test(this._userAgent);
    }
    /**
     * @returns {boolean} 判断是否是 IPhone X ，是返回true
     */
    UA.prototype.getIsIPhoneX = function () {
        return /iphone/.test(this._userAgent)&&window.screen.height===812;
    }

    /**
     * @returns {boolean} 判断是否是 Ipad ，是返回true
     */
    UA.prototype.getIsIpad = function () {
        return /ipad/.test(this._userAgent);
    }

    /**
     * @returns {boolean} 是否含有 android-webview,ios-webview,即判断是否在APP内  *                    部，是返回true
     */
    UA.prototype.getIsAppWebView = function () {
        return /(android-webview)|(ios-webview)/.test(this._userAgent);
    }
    /**
     * @returns {number} 是否含有 android-webview,ios-webview,即判断是否在APP内  *                    部，并且返回追加的字符，比如 Mozilla/5.0 (Linux; Android 6.0.1; SM-G9200 Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36|Android-WebView|com.laijin.simplefinance|3.8.0  中的 3.8.0 ,最后返回数字类型380
     */
    UA.prototype.getAppVersion = function () {
        return /(android-webview)|(ios-webview)/.test(this._userAgent) ? parseInt(this._userAgent.substr(-5).replace(/\./g,"")) : null;
    }

    // 获取手机系统以及版本
    /**
     * @returns {object} 获取手机系统以及版本{name:"",version:""},如果不是大众机型就返回提示语，然后由开发者处理
     */
    UA.prototype.getOSAndVersion = function () {
        var reg = "";
        if (this.getIsAndroid()) {
            // Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) 下边的操作是为了得到 Android 5.0
            reg = /(android);?[\s\/]+([\d.]+)?/;
            return _fzOSAndVersion("Android", this._userAgent.match(reg)[2]);
        } else if (this.getIsIPhone()) {
            // Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X)下边的操作是为了得到 iOS 9.1
            reg = /(os)['like']?[\s\/]+([\d_]+)?/;
            return _fzOSAndVersion("iOS", this._userAgent.match(reg)[2].replace(/_/g, '.'));
        } else {
            return tips;
        }
    }
    /**
     * @returns {string} 获取机型，比如 sm-n900t ,注意是小写字母
     */
    UA.prototype.getPhoneType = function () {
        var phoneType = "",
            // Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) 下边的正则是为了得到 SM-G900P
            reg = /;\s([-,\w,\s]+)\sbuild/g;
        // android 有各大生产商，比如小米，华为等等
        if (this.getIsAndroid()) {
            phoneType = reg.exec(this._userAgent)[1];
        }
        // iPhone 的机型 userAgent 里面没有版本，只有 iPhone 的字眼
        else if (this.getIsIPhone()) {
            phoneType = "iPhone";
        } else {
            phoneType = tips;
        }
        return phoneType;
    }
    var ua = new UA();
    return {
        _userAgent: ua._userAgent,
        isWX: ua.getIsWX(),
        isAndroid: ua.getIsAndroid(),
        specialAndroid: ua.getSpecialAndroid(),
        isIPhone: ua.getIsIPhone(),
        isIPhoneX: ua.getIsIPhoneX(),
        isIpad: ua.getIsIpad(),
        isAppWebView: ua.getIsAppWebView(),
        appVersion: ua.getAppVersion(),
        OSAndVersion: ua.getOSAndVersion(),
        phoneType: ua.getPhoneType()
    }
})
```

### 使用示例
```js
// 页面中直接script标签引用，全局就会有一个userAgent的变量并且是个对象
// 例如判断是否是微信环境
userAgent.isWX // 返回值true是，反之不是

// es6
import UA from '../../userAgent.js'
// UA导出的是一个对象，直接使用UA.xxx调用即可

// 1.获取浏览器userAgent信息
UA._userAgent

// 2.判断是否是微信环境
UA.isWX // 返回值true是，反之不是

// 3.判断是否是安卓系统
UA.isAndroid // 返回值true是，反之不是

// 4.不含Android字眼，但是是安卓的系统，比如黑莓，洛基亚,如果是*
UA.specialAndroid // 返回值true是，反之不是

// 5.判断是否是iphone
UA.isIPhone // 返回值true是，反之不是

// 6.判断是否是iphonex
UA.isIPhoneX // 返回值true是，反之不是

// 7.判断是否是ipad
UA.isIpad // 返回值true是，反之不是

// 8.判断是否含有 android-webview,ios-webview,即判断是否在APP内  *  
UA.isAppWebView // 返回值true是，反之不是

// 9.判断是否含有 android-webview,ios-webview,即判断是否在APP内  *  并且含有app应用的版本号，比如Android-WebView|com.laijin.simplefinance|3.8.0
UA.appVersion // 返回值是数字类型，比如版本号3.8.0，返回结果是380

// 10.获取手机系统以及版本，获取手机系统以及版本{name:"",version:""},如果不是大众机型就返回提示语，然后由开发者处理
UA.OSAndVersion

// 11.获取机型，比如 sm-n900t ,注意是小写字母
UA.phoneType
```