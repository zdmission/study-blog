# MySQL 服务正在 MySQL 服务无法 系统出错。 发生系统错误 进程意外终止

问题描述：<font color=red>MySQL 服务正在 MySQL 服务无法 系统出错。 发生系统错误 进程意外终止。</font>

### 1.找到mysql的安装目录下data文件，删除下图中圈中的几个文件
![php](/study/Apache-PHP-MySql/mysql1.png)

### 2.然后在启动mysql服务即可

### 3.有时候发现安装目录下没有my.ini文件，所以就自己设置一个基本的吧，比如这样
```
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8 
[mysqld]
#设置3306端口
port = 3306 
# 设置mysql的安装目录
basedir=E:\Program Files (x86)\MySQL\MySQL Server 5.0
# 设置mysql数据库的数据的存放目录
datadir=E:\Program Files (x86)\MySQL\MySQL Server 5.0\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB 
```

其实最开始在C:\Windows该目录下配置了一个跟my.ini内容一样的文件，起的作用和mysql安装目录下my.ini一样的，可能就把mysql安装目录下的my.ini删除了，只保留了一个位置的my.ini，但是前几天配置wampserver64的时候把C:\Windows该目录下的my.ini的文件删除了，所以导致mysql一个my.ini文件都找不得到，故报错误 发生系统错误 进程意外终止。1067
