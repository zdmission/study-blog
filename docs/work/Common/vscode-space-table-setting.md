# vscode编辑器中设置的空格或者制表符，但是格式化时并没有生效
[参考 csdn](http://blog.csdn.net/young_Emily/article/details/78662420)

由于共同开发时，需要格式化代码，方便别人阅读。 
我们规定统一使用 4个空格的缩进 
然而发现当我想将vscode缩进设置为4个空格，发现它已经默认是4个空格了，但是并没有在所有文件内都生效

![common](/work/Common/common1.png)

解决：文件 ——> 首选项 

1. 因为vscode默认启用了根据文件类型自动设置tabsize的选项，在设置中添加：
```json
"editor.detectIndentation": false
```
![common](/work/Common/common2.png)

2. 编辑器配置： 
在项目文件中新建.editorconfig 文件 

为特定类型文件指定缩进大小、缩进类型（空格，或tab），是否自动插入末行等等。
```
root = true

[*]
charset = utf-8
indent_style = tab //使用制表符
indent_size = 4 //4个空格为一个缩进
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```
![common](/work/Common/common3.png)

3. 安装vscode 格式化代码插件： 
Beautify file 

使用指南： 

F1 ——> Beautify file ——> 选择你要格式的代码类型

![common](/work/Common/common5.png)
![common](/work/Common/common4.png)


