# 对于解压免安装的mysql文件包

对于解压免安装的mysql文件包.note命令行启动mysql时提示服务名无效，说明还没有注册mysql服务，所以需要先安装服务，进入到C:\Program Files\MySQL\mysql-5.7.13-winx64\bin 该目录下，执行mysql install，很多时候为了简便会把bin目录的路径配置到环境变量path中，

问题：<font color=red>本地计算机上的mysql服务启动停止后,某些服务在未由其他服务或程序使用时将自动停止</font>

1.先把原来的服务删除
```
mysqld --remove mysql(mysql是你的服务名称，自己定义的)
```
2.如果在bin所在的根目录下没有data文件，那么我们需要创建空的data文件，若果有了，那么我们要清空data文件中内容，然后再执行
```
mysqld --initialize-insecure --user=mysql
```
接着运行，这是在注册服务，如果成功，会出现service successfully installed
```
mysqld --install mysql --defaults-file=C:\Program Files\MySQL\mysql-5.7.13-winx64\my.ini
```

3.然后以管理员的权限启动mysql服务
```
net start mysql
```
4.在根目录data文件下有和后缀名为.err的文件，里面有我们的登录名密码，如下
```
2017-05-16T06:43:45.815369Z 1 [Warning] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
```
5.登录(开始的时候密码为空)
```
mysql -u root -p
```
如果有密码就要这样写
```
mysql -u root -proot test  (密码必须挨着不能有空格，test为数据库)
```

如果在文件的根目录下没有my.ini文件，那么我们需要出创建一个my.ini文件，并附上内容
```
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8 
[mysqld]
#设置3306端口
port = 3306 
# 设置mysql的安装目录
basedir=C:\Program Files\MySQL\mysql-5.7.13-winx64
# 设置mysql数据库的数据的存放目录
datadir=C:\Program Files\MySQL\mysql-5.7.13-winx64\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB 
```

