# 对全局git config做了配置，会在c盘的某个目录下有个gitconfig文件

windows系统目下 C:\Users\你的电脑名\.gitconfig

文件内容如下

![git](/study/Git/git1.png)

```
user 全局配置的用户信息
alias 别名设置
credential 是为了sourceTree可视化git管理工具实现ssh免密设置所需要的
```

如果是使用sourceTree的话，配置ssh免密登录步骤如下：

1. 如图

![git](/study/Git/git2.png)

2. 点击创建或导入SSH密钥，得到如下界面，然后点击Generate开始生成我们的SSH密钥

![git](/study/Git/git3.png)

3. 把生成的密钥复制粘贴到gitlab的相关项中

4. 记住重要的一步，在sourceTree的工具栏中有个仓库选项（一切操作都是建立在当前的分支下），打开仓库/仓库设置，得到如下界面

![git](/study/Git/git4.png)
如果我们是通过ssh克隆下来的项目，那么上图的中地址可能就是git@gitlab.xxxxx.xx:fe/xxxxxx-h5.git，如果我们此时提交代码，就会报错

![git](/study/Git/git5.png)

所以我们需要把远程仓库路径修改为 http的方式 http://gitlab.xxxx.xx/fe/xxxxxx-h5.git 这样的方式提交或者拉取代码就可以了