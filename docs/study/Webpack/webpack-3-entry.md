# webpack学习笔记3--entry

### entry，output的意义和用法
- 1.entry为单个字符串的时候
entry:'./src/script/main.js',//单个文件入口，把文件经过处理之后写入bundle.js文件中
```js
output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist/js')
}
```

- 2.entry为数组的时候
entry:['./src/script/main.js','./src/script/a.js'],//单个文件入口，把数组中的文件合并到同一个文件中
```js
output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist/js')
}
```

- 3.entry为对象的时候
```js
//多入口文件，传入一个对象,生成文件命名方式
//name：表示传入对象的key值，在文中即（mian和a）
//hash：webpack每次打包的时候，都会生成一个hash值，这几个文件和webpack生成的hash值一样，如图：
```
![webpack](/study/Webpack/webpack2.png)

```js
//chunkhash：webpack会生成一个hash值，main和a也会生成一个不一样hash值（如果文件修改了，那么下次打包的时候hash会变化），可以理解为文件的md5值或者版本号，就是表示唯一，如图   
```
![webpack](/study/Webpack/webpack3.png)

```js
entry:{
            main:'./src/script/main.js',
            a:'./src/script/a.js'},
output:{
        filename:'[name]-[chunkhash].js',
        path:path.resolve(__dirname,'dist/js')
}
```