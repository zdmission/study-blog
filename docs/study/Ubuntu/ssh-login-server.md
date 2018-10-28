# ssh登录远程服务器

1. 买了阿里云的服务器，操作系统是Ubuntu 14.04 64位，很多东西都已默认配置完毕

使用ssh登录该服务器，需要修改/etc/ssh/sshd_config配置文件

命令vi /etc/ssh/sshd_config，添加 PermitRootLogin yes，保存重启远程主机

打开本地的git bash，命令行输入 ssh root@ip 密码 即可登录到远程服务器
![ssh](/study/Ubuntu/ssh-login.png)

