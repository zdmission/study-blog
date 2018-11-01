# 移动端适配，按照750的设计稿为标准

适配大部分的手机，android、ios，分辨率大和分辨率小，DPR不同的手机，进行了缩放，保证每个手机网页的宽度是750px左右，有相差正常，但是在合理的范围之内

```js
function setMeta(isWrite) {
    var eleMate = isWrite && document.getElementById('metaViewport'),
        width = window.meta && window.meta.uiWidth || 750, //设计稿宽，默认750px,//设计稿宽度
        pw = parseInt(window.screen.width),
        scale = pw / width,
        u = navigator.userAgent,
        contentValue = '';

    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        var version = parseFloat(u.slice(u.indexOf("Android") + 8)),
            dpr = window.devicePixelRatio < 1.4 ? '330' : window.devicePixelRatio <= 2 ? '400' : 'device-dpi';
        contentValue = version > 2.3 ? 'width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',target-densitydpi=' + dpr + ',user-scalable=no' : 'width=' + width + ',target-densitydpi=device-dpi,user-scalable=no';
    } else {
        //适配iphone底部1px白边
        scale = Math.floor(scale * 100) / 100
        contentValue = 'width=' + width + ',minimum-scale=' + scale + ',maximum-scale=' + scale + ',target-densitydpi=device-dpi,user-scalable=no';
    }

    if (!isWrite) {
        document.write('<meta id="metaViewport" name="viewport" content="' + contentValue + '">');
    } else {
        eleMate.setAttribute('content', contentValue);
    }
}

setMeta(false);
// 窗口变化，重新计算缩放比率
window.onresize = function () {
    setMeta(true);
}
```