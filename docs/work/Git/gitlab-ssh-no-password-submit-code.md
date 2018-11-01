# gitlab ssh免密提交代码

1. 创建ssh key
```bash
ssh-keygen -t rsa -C "email@ex.com" 
# 可以是任何用户名，注册了gitlab的那个登录名
```

2. 找到我们的几个文件C:\Users\T\.ssh该路径下

![git](/work/Git/git1.png)

config文件（无后缀名）是配置多个ssh key的，默认情况是id_rsa

![git](/work/Git/git2.png)

3. 绑定
```bash
ssh-agent bash   
# 或者	
ssh-agent bash --login -i
```

4. 添加我们的公钥 
```bash
ssh-add /c/Users/BJ0158/.ssh/id_rsa
```

5. 访问我们项目所在服务器，记住这个域名不是gitlab.com
```bash
ssh -T git@gitlab.jianlc.tp
```

[参考gitlab文件](http://gitlab.jianlc.tp/help/ssh/README)

如果要使用免密码登录，得使用ssh，配置公钥是必须的，clone的时候也要使用ssh的方式去克隆代码，如果使用的http的方式去克隆代码，即使你配置了ssh的公钥，提交代码的时候还是会要求你输入用户名和密码的，切记