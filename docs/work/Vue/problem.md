# 做需求过程中的问题集合

## 1.vue中使用异步组件问题，通过一种自动引入组件并注册是不能实现异步的
![yibu](/work/Vue/problem/problem1-2.png)
上图中不能把组件模块单独抽离出来，只有使用原始的方法才行，如下图
```js
import rollTxt from './roll-txt.vue'
```
![yibu](/work/Vue/problem/problem1-1.png)

## 2.组件多，图片转成base64也多，导致业务js文件大
分离出这样的含有图片多的组件，把该组件当成异步组件处理，打包的时候会被分割，与业务js分离

## 3.微信禁止复制，禁止刷新
```js
wx.hideMenuItems({
    menuList: ['menuItem:copyUrl','menuItem:openWithSafari','menuItem:openWithQQBrowser'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
})
```

## 4.ie版本判断
```js
// 判断IE的版本
checkIEVersion: function (version) {
    var b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + version + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1
}

// 返回值的布尔值，使用checkIEVersion(9)
```

## 5.合并对象的函数
```js
export default function (target) {
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

## 6.iscroll滑动加载更多，多次请求问题
如果用户短时间内多次滑动，会出现pageNo一直增加，导致请求数据是最后一次的，所以在要对该情况做请求限制，在第一次请求没有完成，不允许发送第二次请求

## 7.华为meta7，android版本是4.4.2，滑动不加载数据
监听touchstart，touchmove，touchend三个事件，如果是滑动的话，只会触发touchstart，touchmove，如果只点击的，会触发touchstart，touchend，很尴尬没有像其他手机一样，有滑动一下子触发三个事件，为了排查问题，引入腾讯的vconsole.js文件，触发滚动请求加载数据就出错，但是在其他手机上不会，删除vconsole.js，也不要touchend事件，就只要touchstart，touchmove，但是如果不做限制的话，滑动很多次，会触发很多次的请求，浪费资源，做一个请求限制，数据没有回来之前不去下一次请求，最后代码如下：
```js
var startY, offsetY, maxScrollY;
    $("body").on('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    $("body").on('touchmove', function (e) {
        offsetY = e.touches[0].clientY - startY;
        maxScrollY = $(this).height() - window.innerHeight;
        if ((window.scrollY + 2) > maxScrollY && offsetY < 0) {
            if (_this.loading) {
                return false;
            }
            //判断是否需要分页加载
            _this.setLoadTxtDown(true, false, false);
            setTimeout(function () {
                if (_this.loading) {
                    _this.pageNo++;
                    _this.ajaxFn(_this.url, {
                        userId: _this.userId,
                        token: _this.token,
                        pageNo: _this.pageNo,
                        pageSize: _this.pageSize
                    }, function (oData) {
                        var result = oData;
                        _this.setLoadTxtDown(false, true, false);
                        _this.contentList = _this.contentList.concat(result.lotteryRecordList);
                        if (!result.lotteryRecordList.length) {
                            _this.setLoadTxtDown(false, false, true);
                            // 如果没有数据了就撤销touch事件
                            $("body").off();
                        }
                    });
                }
            }, 1500);
        }
    });
```

## 8.ios 微信浏览器中，图片作为背景，会产生一条白色的底边
解决方法

html布局

![vue](/work/Vue/vue4.png)

css样式如下：

![vue](/work/Vue/vue5.png)

给背景层的div加上如下的css样式
```css
margin-bottom: -1px;
```

## 9.ios中keyup事件有时候监听没有效果
最后改用原生js的input事件，解决问题

## 10.手机中低版本的系统不支持css3的一些属性，比如calc动态计算
计算没有成功，导致滚动加载外框和内容的高度是一样，这样不会触发滚动条件，改用document.body.clientHeight获取手机的实际高度

## 11.魅蓝note5上边，滚动加载，发现问题 window.scrollY 始终比 maxScrollY 小2px
```js
// 导致了 window.scrollY >= maxScrollY && offsetY < 0 该条件不成立，不会滚动加载
$("body").on('touchmove', function (e) {
    // console.log(2);
    offsetY = e.touches[0].clientY - startY;
    maxScrollY = $(this).height() - window.innerHeight;
});

// 解决方式：
( window.scrollY+2) >= maxScrollY && offsetY < 0
```
