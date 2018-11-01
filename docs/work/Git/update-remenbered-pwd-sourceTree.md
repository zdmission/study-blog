# sourceTree提交代码时密码或者用户名输错，更改以保存的git用户名和密码

sourceTree提交代码时密码或者用户名输错了，但是你不知道，并且勾选了记住密码的选项，然后提交代码，以后是不会出现输入用户名和密码的弹窗，怎么去修改这个用户名和密码呢，以便能重新提交代码。

解决方式：

如果你的sourceTree是默认路径安装的话，打开这个路径

1. C:\Users\BJ0158\AppData\Local
2. 在该目录下找到 Atlassian\SourceTree\passwd（可以查看下文件内容），码图展示：

![git](/work/Git/git.png)

3. 找打你对应的git地址和密码删除即可，提交代码时输入框又弹出来啦
4. 如果你的github或者gitLab的用户名修改了的话，这时你需要去删除旧的用户名，目录Atlassian\SourceTree\userhosts，打开删除旧的用户名