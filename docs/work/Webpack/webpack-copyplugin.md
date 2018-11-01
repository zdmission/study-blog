# webpack拷贝插件copyWebpackPlugin

使用该插件注意context上下文，复制时要找对路径，否则会复制不成功的

```js
new copyWebpackPlugin([{
    context: path.resolve(__dirname, '../src/assets/js/lib'),
    from: '**/*',
    to: 'static/js/lib'
}, {
    context: path.resolve(__dirname, '../src/assets/css'),
    from: '**/*',
    to: 'static/css',
}], {
    ignore: ['meta.js', 'base.scss', 'main.scss', 'common.scss'],
    copyUnmodified: true,
    // debug: 'debug',
})
```

