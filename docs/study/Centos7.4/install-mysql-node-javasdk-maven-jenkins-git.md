# centos7.4安装mysql5.6，node，javasdk，maven，jenkins，git，nginx

## 一、安装mysql
1. 下载yum源安装mysql
```bash
wget http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum install mysql-community-server
```

2. 启动数据库
```bash
systemctl start mysql
```

3. 查看mysql服务进程
```bash
ps -ef|grep mysql
```

3. 这样子安装的数据是没有密码的，直接登录
```bash
mysql -u root
```
如果有密码，可以通过命令查看 
```bash
grep 'temporary password' /var/log/mysqld.log
```

也可以直接打开/var/log/mysqld.log 该文件查看

创建数据库
```bash
mysql> CREATE DATABASE test;
```

显示所有的数据库
```bash
mysql> SHOW DATABASES;
```

已经有sql文件了，怎么执行这个sql文件呢
```bash
mysql> source sql文件路径
```
这样就会自动的自行sql文件中的语句了

## 二、安装node
```bash
1. curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
2. sudo yum -y install nodejs
```

## 三、安装javasdk
1. 利用yum源来安装jdk（这个方法的好处是不用设置环境变量，安装过程中自动设置）
查询yum库中的java的安装包
```bash
yum -y list java*
```
![javasdk-1](/study/Centos7.4/javasdk-1.png)

这只是其中的一部分，还有很多的包

2. 安装java1.8所有的包
```bash
yum -y install java-1.8.0-openjdk*
```
<font color=red>(安装完之后，默认的安装目录是在: /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.171-8.b10.el7_5.x86_64)</font>

3. 验证是否安装成功
输入 javac 出现如下图片说明安装成功 
![javasdk-2](/study/Centos7.4/javasdk-2.png)
或者是 java -version
![javasdk-3](/study/Centos7.4/javasdk-3.png)

## 四、安装maven
1. 配置maven源，（执行如下命令，会在/etc/yum.repos.d/epel-apache-maven.repo）
```bash
wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
```
2. 安装
```bash
yum -y install apache-maven
```
3. 验证
```bash
mvn -v
```
![maven](/study/Centos7.4/maven.png)

## 五、安装jenkins
1.配置jenkins源
```bash
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
```
2. 导入公钥验证是不是RH官方签名
```bash
rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
```
3. 安装jenkins
```bash
yum -y install jenkins
```
4. 启动jenkins
```bash
service jenkins start
```
5. 修改jenkins配置文件
```bash
vim /etc/sysconfig/jenkins
```

<font color=red>问题：</font>

自己设置的端口，始终不能通过公网IP:端口访问，不知道什么回事，但是端口22,80是可以访问的，原来是因为，系统初始化在安全组中添加了22,80,443等端口访问，而自定义的端口没有添加权限，在自己的实例中添加安全组规则即可
![new-hand](/study/Centos7.4/new-hand.png)

## 六、安装git
安装
```bash
yum -y install git
```
1. 生成SSH key，为的是免登录
```bash
ssh-keygen -t rsa -C "邮箱@xx.xx"，接下来一路回车采用默认设置
```
2. 查看生成的ssh key的内容
![install-git-1](/study/Centos7.4/install-git-1.png)

图片中画红线框的位置注意了，

ssh key的内容默认保存在 /root/.ssh/目录下，公钥保存在 /root/.ssh/id_rsa.pub中
通过命令（cat /root/.ssh/id_rsa.pub）打开该文件，复制里面的全部内容，然后把该内容复制到GitHub上，在github上 -- Personal settings -- SSH and GPG keys -- New SSH key
title你就起一个便于记住和分别的
key就是你刚才复制的公钥

3. 测试ssh key是否成功
ssh -T git@github.com
![install-git-2](/study/Centos7.4/install-git-2.png)

如果出现图片中的提示，说明成功了（名字（BendongZ）是不同的，毕竟每个人不一样）

4. 全局配置你的emial和name
git config --global user.email "邮箱@xx.xx"
git config --global user.name "your name"

5. 以上都做完之后当然是创建仓库，运行相关的git命令啦（不会的，网上教程）

## 七、安装nginx
nginx是C写的，需要用GCC编译；nginx中的rewrite module需要PCRE；nginx中的gzip module需要zlib；nginx中的HTTP SSL module需要OpenSSL。

1. 安装一些依赖库
```bash
yum -y install gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl--devel lrzsz
// 像vim wget 是Centos自带的
```
2. 安装nginx的方式有很多，一种是下载包去安装（需要配置configure ，感觉比较麻烦），一种是yum（Yellow dog Updater, Modified）直接安装（基于RPM的软件包管理器，基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装），类似前端npm包管理工具

3.安装nginx
```bash
yum install -y nginx 
// 但是没有安装成功，因为没有nginx源
```
处理方式一：
```bash
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```
安装该rpm后，我们就能在/etc/yum.repos.d/ 目录中看到一个名为nginx.repo 的文件。

处理方式二：
在/etc/yum.repos.d/目录下创建nginx.repo文件，并在里面写入
``` bash
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=0
enabled=1
```

4. 开始安装 
```bash
yum -y install nginx
```

5. 允许系统启动nginx自启动
```bash
systemctl enable nginx
```
![install-nginx](/study/Centos7.4/install-nginx.png)

6. 启动nginx服务
```bash
service nginx start
```