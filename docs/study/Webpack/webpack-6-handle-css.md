# webpack学习笔记6--处理项目中的CSS

### 一、安装style-loader和css-loader
终端目标文件输入：
```bash
npm i style-loader css-loader --save-dev
```
### 二、webpack可以将任何资源视为一个模块。

### 三、这里将css引用进来，
- 1、app.js:用的是es6的import语法
- 2、webpack.config.js: module的loaders

### 四、postcss-loader
对css进行浏览器兼容性考虑时，可以用到这个loader
- 1、安装postcss-loader  [插件地址](https://www.npmjs.com/package/postcss-loader)
终端目标文件输入：
```bash
npm install postcss-loader --save-dev
```
- 2、是一个后处理器。
- 3、可以加浏览器的前缀
```js
//这边字符串的意思是先经过css-loader的处理，再经过style-loader处理，会在页面中插入style标签
loader:'style-loader!css-loader!postcss-loader',

//也可以这样写，loader都是从右边向左执行
loaders:['style-loader','css-loader','postcss-loader']
```
- 4、loader处理方式是从右到左，即从数组的最后一项往前
- 5、webpack.config.js中，
    - （1）安装autoprefixer  浏览器加前缀
    终端目标文件输入：
    ```bash
    cnpm install autoprefixer --save-dev
    ```
    ```js
        postcss:[
            require('autoprefixer')({
                broswers:['last 5 versions']  //浏览器五个版本加前缀，这个对象是autoprefixer函数的参数
            })
        ]
    ```

是说webpack2.0支持上述这种方式

css文件中引入另一个css文件，@import './flex.css';是可以插入到页面中的，经过了css-loader和style-loader的处理，但是没有经过postcss-loader的处理，

实际中我们是希望资源可以经过统一处理的，可以传参数loader:'style-loader!css-loader?importLoader=1!postcss-loader',

@import语法引入的其他模块， 或css, 这时引入的文件postcss-loader没有起作用， 解决方法:
用新的rules, use等的用法， 不用原来的loaders, loader
```js
module: {
	rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: path.resolve(__dirname, '/node_modules/'), //已经引用过的，已经打包过的文件
			include: path.resolve(__dirname, '/src/'),
			query: {
				presets: ['latest']
			}
		},
		{
			test: /\.css$/,
			use: [{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1
					}
				},
				{
					loader: 'postcss-loader'
				}
			]
		}
	]
},
```