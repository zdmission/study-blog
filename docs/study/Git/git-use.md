# Git使用

## 1.首先的配置全局的ssh，公钥私钥，步骤如下

配置查看当前的用户名和邮箱，有的话，说明已经配置过了

![git](/study/Git/git9.png)

如果查出来没有，则需要配置，如下，邮箱也是如此

![git](/study/Git/git10.png)

## 2.生成公钥私钥
```bash
ssh-keygen -t rsa -C zd1051444638@outlook.com
```
成功生成界面

![git](/study/Git/git11.png)

一般保存在如图所示的目录下，一个是私钥，一个是公钥，

![git](/study/Git/git12.png)

公钥需要配置在Github上你的个人中心的，点击新建，然后复制粘贴保存即可

![git](/study/Git/git13.png)


## 3.pwd是查看当前目录 ()

![git](/study/Git/git14.png)

 cd是进入某个目录，可以是一级 (cd kede)，两级（cd kede/index），路径(cd ~/Desktop)，或者说回退到上一级（cd ..），上两级（cd ../../）

既然你已经有github的账号，公钥，配置好了全局的账户，那么你现在就可以利用ssh的方式从远程的仓库中克隆项目了
```
git clone git@github.com:BendongZ/kede.git
```
![git](/study/Git/git15.png)

成功克隆了远程的项目

## 4.实际应用

查看文件
![git](/study/Git/git16.png)

ls -la  列出全部的文件，连同隐藏文件（开头为.的文件）一起列出来（常用）

文件中的.git文件是版本管理工具为你项目配置的一些信息，一般不去修改，如果要创建分支的话，你可以利用命令行的方式为远端创建一个分支，你也可以直接在.git文件夹中的config文件修改

![git](/study/Git/git17.png)

图中矩形框的部分便是你手动创建的分支，你push的时候便会为你创建远程分支

为你的命令配置别名 
```
git config --global alias.st status // 以后你便可以使用st来代替status
// 执行git status和git st的效果是一样的
```
![git](/study/Git/git18.png)

这图说明你在maste主干上r没有做任何的修改，不需要commit

刚才我修改了index.html文件，再执行git status，结果如下

![git](/study/Git/git19.png)

追踪到了你修改的文件，然后执行git add（后边可以是一个文件，也可以是多个文件，或者说是一个  .  代表着全部）去添加修改的文件，然后git commit -am（这个括号内知识说明，-am表示增加并写备注） “本次做了什么修改，说明一下” 提交修改的文件到你本地的仓库中

![git](/study/Git/git20.png)

之后执行git push提交到远端的仓库

![git](/study/Git/git21.png)


如果某个文件在项目里面是没有的，我们创建一个，在执行git add，然后执行git status查看，出现新文件 new file

![git](/study/Git/git22.png)

如果文件存在，做修改并git add，并git status，结果是

![git](/study/Git/git23.png)


然后提交到本地的仓库中

![git](/study/Git/git24.png)


执行git status，结果如下图，说明你的项目分支是最新的

![git](/study/Git/git25.png)

 

下边使用的git br其实是经过别名处理的，
```bash
git config --global alias.br branch
```
查看分支

![git](/study/Git/git26.png)


目前只有一个之分支，master，前边的*，表示切换到当前分支

启动webserver服务出现如下错误说明端口被占用了

![git](/study/Git/git27.png)


git pull远程项目到本地工作空间的时候，出现如下情况

![git](/study/Git/git28.png)

说明你的当前工作空间内有修改你需要先提交到本地的仓库，在pull

文件冲突了

![git](/study/Git/git29.png)

git br -a 查看所有的分支，包括本地和远程的

![git](/study/Git/git30.png)

git fetch --all 把远端所有的分支拉取到本地的仓库，
然后在git co 分支名   就可以切换到那个分支，
