# webpack学习笔记9--图片文件处理以及其他文件

在项目中，html，css，或者是模板文件都可能会引用图片资源，那么我们去处理这些图片呢
如果我们不用loader去处理这些图片的话，打包的时候就出错
- 1、css中的背景图片。
    - （1）安装file-loader
    终端目标文件输入：
    ```bash
    npm install file-loader --save-dev
    ```
- 2、模板文件layer.tpl直接引用图片。
    - （1）绝对路径：直接写绝对路径就行。
    - （2）相对路径： 
    ```html
    <img src="${require('../../assets/bg.jpg')}"
    ```
- 3、最根部的文件index.html引用图片。
    - （1）绝对路径：直接写绝对路径就行。
    - （2）相对路径：file-loader
    给打包好的图片放在某个路径下
    ```js
    {
        test:/\.(png | jpg | gif | svg)$/i,
        loader:'file-loader',
        query:{
            name:'assets/[name]-[hash:5].[ext]'
        }
    }
    ```

- 4.安装url-loader
    url-loader和file-loader相似，但是url-loader可以指定limit参数。
    - （1）终端目标文件输入：
    ```bash
    npm install url-loader --save-dev
    ```
    url-loader可以处理文件或者图片，当文件/图片大小大于指定的limit,就会丢给filel-loader去处理，当小于设定的limit，就会转为base64编码，不再是一个url(不再是一个http请求)，
    ```js
        {
            test:/\.(png | jpg | gif | svg)$/i,
            loader:'url-loader',
            query:{
                limit:20000  //设置限制之后，当文件/图片大小大于指定的limit，实际上处理图片或文件的是					     	
                name:'assets/[name]-[hash:5].[ext]'
            }
        }
    ```
    图片会被打包进html,css,js，所以html，css，js会变大，不要觉得奇怪

    ![webpack](/study/Webpack/webpack27.png)

    图片不再是http请求，而是一个base64的编码

    - （2）两种图片引用方式：①通过http请求load进来。浏览器会有缓存，下次访问会更快，增加了缓存遍历，比较适用于重复性较高的图片。②打包成base64。任何地方要用时，都会有base64编码存在那里，会造成代码的冗余，增加代码的体积。

### 压缩图片
- 1、安装image-webpack-loader，压缩图片，最好是和file，url一起使用
终端目标文件输入：
```bash
npm install image-webpack-loader --save-dev
```

```js
{
    test:/\.(png | jpg | gif | svg)$/i,
    loaders:['url-loader?limit=20000&name:assets/[name]-[hash:5].[ext]','image-webpack-loader']
    //处理顺序是一样的从右向左，先压缩，再把文件传给url-loader，在这个loader判断
}
```
- 2、先压缩文件再传给url-loader判断。
压缩的结果是很明显的，图片和文件都变小了，image-webpack-loader对于每一种图片都有相应的优化系，针对不同的图片进行参数配置