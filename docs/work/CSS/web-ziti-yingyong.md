# web字体应用

现在用的比较多的就是字体图标，而不是使用一张图片，前者的体积很小

![ziti](/work/CSS/ziti3.png)

字体有几张常见的格式，如下：

### 一、TureTpe(.ttf)格式：
.ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，因此他不为网站优化,支持这种字体的浏览器有【IE9+,Firefox3.5+,Chrome4+,Safari3+,Opera10+,iOS Mobile Safari4.2+】；
### 二、OpenType(.otf)格式：
.otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，所以也提供了更多的功能,支持这种字体的浏览器有【Firefox3.5+,Chrome4.0+,Safari3.1+,Opera10.0+,iOS Mobile Safari4.2+】；
### 三、Web Open Font Format(.woff)格式：
.woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离,支持这种字体的浏览器有【IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】；
### 四、Embedded Open Type(.eot)格式：
.eot字体是IE专用字体，可以从TrueType创建此格式字体,支持这种字体的浏览器有【IE4+】；
### 五、SVG(.svg)格式：
.svg字体是基于SVG字体渲染的一种格式,支持这种字体的浏览器有【Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】。

使用unicode步骤：
- 1.一般会在自己的项目下有一个font文件夹，然后我们自己从图标库下载下来图标，打开的文件内容差不多是这样的

![ziti](/work/CSS/ziti1.png)

这时我们所需要的字体文件是eto，svg，ttf，woff，取出这几个文件放在自己新建的文件中，形如

![ziti](/work/CSS/ziti2.png)

然后把iconfont文件放在你项目中font文件目录下，之后在你的css文件中开始引用
```css
@font-face {
  font-family: 'iconfont';//自定义字体的名字
  src: url('iconfont.eot');//你的eot字体文件的路径，format后边的是格式
  src: url('iconfont.eot?#iefix') format('embedded-opentype'),//IE6-IE8
  url('iconfont.woff') format('woff'),//现代浏览器
  url('iconfont.ttf') format('truetype'),//safari，android，ios
  url('iconfont.svg#iconfont') format('svg');
}

.iconfont{//iconfont类名可以自己定义
  font-family:"iconfont" !important;//font-family中的自定义字体的名字要一致
  font-size:16px;font-style:normal;//设置字体图标的样式
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

```html
<i class="iconfont">&#x33;</i> //挑选相应图标并获取字体编码，应用于页面
```
如果你的应用中不用兼容ie，windows，其实你可以只是用woff和ttf两个文件即可

在你的移动项目中你还可以这样使用
```css
@font-face {
    font-family: 'Ionicons';
    src: url('../assets/iconfonts/answer-icon/iconfont.eot');
    src: url('../assets/iconfonts/answer-icon/iconfont.eot?#iefix') format('embedded-opentype'), url('../assets/iconfonts/answer-icon/iconfont.woff') format('woff'), url('../assets/iconfonts/answer-icon/iconfont.ttf') format('truetype'), url('../assets/iconfonts/answer-icon/iconfont.svg#iconfont') format('svg');
}

.icon {
    font-family: "Ionicons" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.ion-ios-quanguo:before {
    content: '\e6ad'
}
```
在标签中使用
```html
<i class="icon ion-ios-quanguo"></i>
```