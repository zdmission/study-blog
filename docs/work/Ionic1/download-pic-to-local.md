# 下载图片至本地，可以在手机的图库中显示

1.安装插件
```bash
cordova plugin add https://github.com/devgeeks/Canvas2ImagePlugin.git
```

2.代码实现
```js
$scope.downPhoto = function (photoPath) {
    var pictrueUrl = encodeURI(photoPath);
    function saveImageToPhone(url, success, error) {
    var canvas, context, imageDataUrl, imageData;
    var img = new Image();
    img.function() {
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        c canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        try {
            imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
            imageData = imageDataUrl.replace(/data:image\/jpeg;base64,/, '');
            cordova.exec(
                success,
                error,
                'Canvas2ImagePlugin',
                'saveImageDataToLibrary',
                [imageData]
            );
        }
        catch(e) {
            error(e.message);
        }
    };
    try {
        img.src = url;
    }
    catch(e) {
        error(e.message);
    }
    }
    var success = function(msg){
        alert("保存成功")
    };
    var error = function(err){
        alert("保存失败")
    };
    saveImageToPhone(photoPath, success, error);
```