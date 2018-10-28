# wampserver64中mysql与本地的安装mysql冲突

问题：
<font color=red>
启动 wampserver64 ，mysql服务不能启动，原因是wampserver64 运行过程，本来会开启自带的mysql服务，但是他先要去环境变量中去寻找mysql的路径，刚好我们安装的本地mysql配置了全局路局，这是他会直接使用这个路径，导致自带的mysql不能启动</font>

解决办法：

把本地mysql配置的全局路径删除，即在path路径中清除，之后再重启wampserver64 就可以了

麻烦事：

本地安装的mysql启动服务的话，要么去安装目录下启动，要么就是win+r输入service.msc，找到MySQL服务并启动

![php](/study/Apache-PHP-MySql/wampserver64.png)

