# 安装php5及以上的版本，一般情况下，mysql模块都是默认安装的的

[可参考的网址](http://blog.csdn.net/liehuo123/article/details/20044883)
安装php5及以上的版本，一般情况下，mysql模块都是默认安装的的。

最新的连接mysql的方式，改为了mysqli

老的扩展方法都基本废弃了，经过测试，网上的多数教程是无法使用的
```
<?php 
     phpinfo();  //可以查看mysqli的安装情况
?>
```

然后我们要更改php.ini配置文件，730行左右
```
extension_dir = "ext"
```

将这句话前面的;去掉， 分号表示注释
![php](/study/Apache-PHP-MySql/php1.png)

然后再找到900行左右
```
extension=php_mysqli.dll
```

将这句话前面的注释去掉

另外，还要找到apache的配置文件 httpd.conf， 找到LoadModule ，添加php模块的地方

下面加入一行,这是我的PHP路径
```
LoadModule php5_module D:\php-5.6.29-Win32-VC11-x64\php5apache2_4.dll
PHPIniDir "D:\php-5.6.29-Win32-VC11-x64"
```

然后重启服务器，就可以连接数据库了，前提是你要确保数据库服务已经启动并能够访问到

还需要复制 libmysql.dll 和 php_mysqli.dll 复制一份到c盘windows/system32/目录下

示例代码：
```
<?php

    $mysql_server_name='localhost'; //改成自己的mysql数据库服务器
    $mysql_username='root'; //改成自己的mysql数据库用户名
    $mysql_password='root'; //改成自己的mysql数据库密码
    $mysql_database='test'; //改成自己的mysql数据库名

    //创建连接对象
    $conn = new mysqli($mysql_server_name, $mysql_username, $mysql_password, $mysql_database);

    //调用conn对象的query方法获得结果集
    $result = $conn->query("select * from category");

    print "<ul class='menulist'>";

    // 调用mysqli_fetch_assoc方法， 循环取出每一行记录
    while($row=mysqli_fetch_assoc($result)) {
        $menuname = $row['name']; //name是字段名称
        print "<li>".$menuname."</li>";
    }
    print "</ul>" ;
?>
```




















