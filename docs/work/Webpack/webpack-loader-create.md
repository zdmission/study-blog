# webpack loader编写

loader的 module.exports = function (source) 

该source是string类型，最后返回的时候不要使用JSON.stringify(source)去包裹，否则解析插件会报解析错误的log

```js
// 针对于webpack DLLPlugin html script文件的引入
const loaderUtils = require("loader-utils");
const fs = require('fs')
module.exports = function (source) {
    // 获取loader中的options对象
    const options = loaderUtils.getOptions(this);
    // 获取公共 publicPath
    let publicPath = options.publicPath || '/static/js/'
    // 获取dllplugin生成js文件，内容形如这样的{"threePartylibraries":{"js":"threePartylibraries.dll.js?682064c563e843b0"},"common":{"js":"common.dll.js?c3d681cf4b971ea5"}}
    let json = options.manifestArr;
    //定义一些值存储中间值
    let single = '', resultstr = '', cssStr = '', jsStr = ''
    // 根据路径读取css文件的内容
    cssStr = options.cssStr ? fs.readFileSync(options.cssStr, 'utf-8') : ''
    // 根据路径读取js文件的内容
    jsStr = options.jsStr ? fs.readFileSync(options.jsStr, 'utf-8') : ''
    globalPath = options.globalPath ? fs.readFileSync(options.globalPath, 'utf-8') : ''

    // 页面中需要dll的提取的库文件
    if(source.indexOf('data-nodll')<0) {
        let htmlarr = source.split(`</body>`);
        for (const key in json) {
            single = single + `<script type=\"text/javascript\" src=\"${publicPath}${json[key]['js']}\"></script>\r\n`
		}
		// 只需要上报数据埋点，不需要vue，axios等文件
		if(source.indexOf('data-reported')>=0) {
			single = `<script type=\"text/javascript\" src=\"${publicPath}${json['common']['js']}\"></script>\r\n`
		}
		// 只需要vue
		if(source.indexOf('data-vue')>=0) {
			single = `<script type=\"text/javascript\" src=\"${publicPath}${json['vendorVue']['js']}\"></script>\r\n`
        }
        //需要上报数据埋点和vue文件
        if(source.indexOf('data-vue')>=0&&source.indexOf('data-reported')>=0) {
            single = `<script type=\"text/javascript\" src=\"${publicPath}${json['vendorVue']['js']}\"></script>\r\n
            <script type=\"text/javascript\" src=\"${publicPath}${json['common']['js']}\"></script>\r\n
            `
        }
        resultstr = `${htmlarr[0]}${single}</body>\r\n${htmlarr[htmlarr.length-1]}`
        let splitHead = resultstr.split(`</head>`)
        // 默认情况是移动端，需要meta.js文件
        if(source.indexOf('data-pc')<0){
            resultstr = `${splitHead[0]}<style type="text/css">${cssStr}</style><script type="text/javascript">${jsStr}${globalPath}</script></head>${splitHead[splitHead.length-1]}`
        }else { // pc端不需要meta.js文件
            resultstr = `${splitHead[0]}<style type="text/css">${cssStr}</style><script type="text/javascript">${globalPath}</script></head>${splitHead[splitHead.length-1]}`
        }
    }else { // 页面中不需要dll的提取的库文件
        let splitHead = source.split(`</head>`)
        // 默认情况是移动端，需要meta.js文件
        if(source.indexOf('data-pc')<0){
            resultstr = `${splitHead[0]}<style type="text/css">${cssStr}</style><script type="text/javascript">${jsStr}${globalPath}</script></head>${splitHead[splitHead.length-1]}`
        }else {
            resultstr = `${splitHead[0]}<style type="text/css">${cssStr}</style><script type="text/javascript">${globalPath}</script></head>${splitHead[splitHead.length-1]}`
        }
    }
    // console.log(resultstr)
    return resultstr
};

```