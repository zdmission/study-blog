# webpack3.x中html-webpack-plugin插件处理模板html手动引入script加版本号问题

这个需求呢是我为了防止浏览器缓存我们的js，css文件，所以需要在引入的js最后加上版本号，以便文件改变之后可以重新下载，
处理方式：
需要对插件html-webpack-plugin进行拦截封装，代码如下

```js
var config = require('../config'),
    md5 = require('md5'),
    glob = require('glob'),
    path = require('path'),
    fs = require('fs')


// globPath  比如："../release/static/js/libs/**/*.js" 意思是读取该路径下的所有js文件
// 返回值是一个json对象 类似于{ 'static/js/libs/axios/axios.min.js': 'static/js/libs/axios/axios.min.js?279e63262790dc6457b60db2b9b6c1eb',
//   'static/js/libs/meta/meta.js': 'static/js/libs/meta/meta.js?3b0873df1bac2aae5f0fc9e0d3734b4e',
//   'static/js/libs/vue/vue.min.js': 'static/js/libs/vue/vue.min.js?07b2df13d2459234b86ae48a2571ce97',
//   'static/js/libs/zepto/fx.js': 'static/js/libs/zepto/fx.js?01bab604900377119718a0b0bbdf6918',
//   'static/js/libs/zepto/zepto.js': 'static/js/libs/zepto/zepto.js?e8e177218b50197e04135c1780ead0a1',
//   'static/js/libs/zepto/zepto.min.js': 'static/js/libs/zepto/zepto.min.js?f8ba791e88cb12532a59393f9e4298b0' }这样

function getStaticFile(globPath) {
    let entries = {}
    /**
     * 读取某个目录,并进行路径裁剪
     */
    glob.sync(globPath).forEach(function (entry) {
        let pathSplit = entry.split('/')
        for (let i = 0; i < pathSplit.length; i++) {
            if ("static" === pathSplit[i]) {
                let md5HashFile, pathKey = pathSplit.splice(i).join("/").replace(/static\//g, '')
                entries[pathKey] = pathKey + "?" + md5(fs.readFileSync(entry))
            }
        }
    });
    return entries;
}

// 对象合并函数
function Merge(target) {
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

function resolve(str) {
    return path.resolve(__dirname, str)
}

function DefineResolvePlugin(options) {
    // Configure your plugin with options...
    this.options = options.options
}
let fileObj = Merge({}, getStaticFile(resolve("../release/static/js/lib/**/*.js")), getStaticFile(resolve("../release/static/js/modules-v2/**/*.js")), getStaticFile(resolve("../release/static/css/**/*.css")))

DefineResolvePlugin.prototype.apply = function (compiler) {
    const htmlNotes = this.options.htmlNotes
    compiler.plugin('emit', function (compilation, callback) {
        for (let filename in compilation.assets) {
            (function (filename) {
                let tem = compilation.assets[filename].source();
                // if (!/\.(png|jpe?g|gif|svg|ico|woff2?|eot|ttf|otf)(\?.*)?$/.test(tem)) {
                if (/\.(js|html)(\?.*)?$/.test(tem)) {
                    // console.log(tem)
                    compilation.assets[filename] = {
                        source: function () {
                            if (fileObj) {
                                for (let key in fileObj) {
                                    let element = fileObj[key]
                                    let reg = new RegExp(key.replace(/\./g, '\.'), "gim")
                                    if (reg.test(tem)) {
                                        tem = tem.replace(/(\.\.\/)+/g, config.build.assetsPublicPath).replace(reg, element)
                                    }
                                }
                            }
                            return tem.replace(/static\//gm, '');
                        },
                        size: function () {
                            return 1;
                        }
                    };
                }
            })(filename)
        }
        callback();
    });
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {
            // 增加头部注释专用
            htmlPluginData.html = htmlNotes + htmlPluginData.html.toString()
            callback(null, htmlPluginData);
        });
    });
}


module.exports = DefineResolvePlugin;
```

console.log(htmlPluginData)的数据如下

![webpack](/work/Webpack/version1.png)

对其中的key为html拿到他的value值进行处理之后才传入callback回调函数处理，这样便可以如期替换相对路径成绝对地址并且加上版本号

处理之后的结果

![webpack](/work/Webpack/version2.png)

