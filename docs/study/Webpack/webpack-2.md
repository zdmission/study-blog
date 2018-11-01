# webpack学习笔记2--明令行中带的参数

- 引入文件的时候可以使用require('文件相对路劲')
- webpack不能解析css文件，所以安装css的解析器css-loader
- 打包好的css样式在页面上应用，需要用到style-loader解析器，require('style-loader!css-loader!css文件路径')，又或者可以使用命令行 webpack hello.js hello.bundle.js --module-bind 'css=style-loader!css=css-loader'


还可以在命令行的后边加一些参数，比如--watch(自动编译打包)

--progress（可以看见打包的百分比过程）

--display-modules（显示打包的模块）

--display-reasons（打包的原因）