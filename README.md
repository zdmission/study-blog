# study-blog

## 开发

```bash
npm run dev
```

## 构建代码并上传到服务器

```bash
npm run build
```

## 注意事项

* 项目中加入了上传文件到服务器，使用的gulp-sftp，配置可参考，在根目录下边创建gulpfile.js文件，文件内容如下，填写相关服务器的信息

```js
const gulp = require('gulp')
const ftp = require('gulp-sftp')
const option = { //部署到测试服务器上
    remotePath: '/root/', // 仅仅是结尾多了一个”/“，部署到服务器的路径
    host: '*.*.*.*', //ip地址
    user: '', //帐号
    pass: "", //密码
    port: 22 //端口
}
gulp.task('upload', function (callback) {
    console.log('## 正在部署到服务器上')
    gulp.src('./blog-dest/**')
        .pipe(ftp(Object.assign(option, {callback})))
})

```

* package.json文件中增加了命令，会在build之后自动执行上传代码，如果不需要删除即可
