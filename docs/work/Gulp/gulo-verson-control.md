# gulp版本号控制，相对老套

需要给引用的js，css，img等资源末尾添加版本好，达到类似的效果
```
"/css/style.css" => "/dist/css/style.css?v=1d87bebe"
"/js/script1.js" => "/dist/script1.js?v=61e0be79"
"cdn/image.gif" => "//cdn8.example.dot/img/image.gif?v=35c3af8134"
```

那么需要对一些包的源文件进行修改
- 1.node_modules/gulp-rev/index.js找到该函数，43行
```js
function transformFilename(file) {
	// save the old path for later
	file.revOrigPath = file.path;
	file.revOrigBase = file.base;
	file.revHash = revHash(file.contents);
	file.path = modifyFilename(file.path, function (filename, extension) {
		/* var extIndex = filename.indexOf('.');
		filename = extIndex === -1 ?
			revPath(filename, file.revHash) :
			revPath(filename.slice(0, extIndex), file.revHash) + filename.slice(extIndex); */
		return filename + extension;
	});
}
```
注释掉/*......*/这些，该文件找到144行，
```js
// 修改 
manifest[originalFile] = revisionedFile; 
// 为 
manifest[originalFile] = originalFile + '?v=' + file.revHash;
```

- 2.node_modules/gulp-rev-collector/index.js 这个文件版本有基于es5，es6写的，所以修改的时候要注意相对应的修改方式
基于es5-------> 31行 
```js
// 将第一句
if ( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !== path.basename(key) ) {
// 更新为:如下 
if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
```

基于 es6 --------> 找到40行，修改 
```js
let cleanReplacement =  path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' )  为 let cleanReplacement =  path.basename(json[key]).split('?')[0];
```

然后找到164行左右，因插件在不段更新，有些许的写法不一样不足为奇，
```js
// 修改
regexp: new RegExp( prefixDelim + pattern, 'g' ),
// 为
regexp: new RegExp( prefixDelim + pattern+'(\\?v=\\w*[\.?\\w]*)?', 'g' ),
```

- 3. node_modules/gulp-asset-rev/index.js  版本有区别，文件内容会有些许的不同 
找到78行 ，
```js
// 把 
var verStr = (options.verConnecter || "-") + md5;src = src.replace(verStr, '').replace(/(\.[^\.]+)$/, verStr + "$1"); 
// 修改为 
var verStr = (options.verConnecter || "") + md5;
    if(src.indexOf('?')){
        src = src.split('?')[0] + "?v=" + verStr;
    }else{
        src = src + "?v=" + verStr;
    }
```

- 4. node_modules/rev-path/index.js 
找到10行 
```js
// 将
return filename + '-' + hash + ext; 
// 修改为 
return filename + ext; 
```
基本上完成了配置，该文件可以不修改，貌似没有用，看情况吧，

在项目中一直纠结为什么没有生成版本号文件，话说看了gulpfile配置文件，只有当你的js，css，image有所变化才会生成相应的版本号文件，我是一直在改html文件，根本就没有相应的任务去监听






