# 如何把域名绑定到github的某一个项目上，访问域名便可以进入你的项目

1.首先你肯定得有自己的域名（我的当然是从阿里云上边买的，其实途径有很多，自主选择即可），然后便是去添加解析规则了，如下图，这个记录值便是你的github的IP，你可以通过 ping bendongz.github.io 获取，其中bendongz是我的github的用户名

![git](/study/Git/git6.png)

![git](/study/Git/git7.png)

解析设置完成之后，接下来在你的项目做文章了

2.在github上打开你的项目

![git](/study/Git/git8.png)

创建一个类似于文本文档，名字是CNAME，内容为（例如：zdmission.cn），也就是你的域名，这样就可以了，然后保存即可