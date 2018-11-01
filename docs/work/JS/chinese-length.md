# 汉字长度

输入框中中文长度至少5位
```js
// 中文地址验证
function chineseVerify(value) {
    // 验证中文的正则表达式
    var han = /[\u4e00-\u9fa5]/;
    if (value == '') {
        return false;
    };
    // 判断中文的长度至少大于5位,split按照中文的分割字符串成数组，数组长度减一就是字符串的长度
    if (value.split(/[\u4e00-\u9fa5]/).length - 1 < 5)
        return false;
    return true;
}
```