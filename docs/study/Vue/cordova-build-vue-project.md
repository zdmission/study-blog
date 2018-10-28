# vue利用cordova实现原生调用相机拍照

做这个功能的前提是你已经弄好了vue结合cordova的项目，[上一步，cordova打包vue实践](/study/Vue/cordova-build-vue-practice.md)

某则就免谈了 ，vue使用scss语法来写样式，只需要安装node-sass sass-loader就可以了，然后在style中写上lang="scss"就可以识别了，不用做其他的配置

布局：
```html
<div class="imgDiv">
    <img :src="imgSrc" alt="shibai" title="这是一张图片">
</div>
<div>
    <button @click="takephoto">拍照</button>
</div>
```

js代码：
```js
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgSrc: require("../assets/logo.png")
    }
  },
  methods:{
      takephoto() {
          alert("进入")
        let self = this;
        let options = {
          // Some common settings are 20, 50, and 100
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
        }
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
          self.imgSrc = imageUri;
          alert(self.imgSrc)
        }, function cameraError(error) {
            alert(error)
        }, options);
      }
  }
}
```

注意点:

图片地址的动态引用，在data是初始化的时候，必须要使用require，否则webpack打包的时候只会把地址当成字符串解析，即是你认为的地址是对的，但还是找不到图片，
```js
imgSrc: require("../assets/logo.png")
```