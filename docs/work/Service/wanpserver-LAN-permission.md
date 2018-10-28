# wampserver安装好之后，开启，在同一个局域网内访问，有权限问题


出现如下问题

![service](/work/Service/Service6.png)

原因是在wampserver安装目录下的www文件夹，你没有权限访问，默认配置是允许本地访问Require local

但是这并不是我们想要的，所以需要自主设置，找到wampserver目录下的apache，寻找配置文件httpd.conf，一般目录是C:\wamp64\bin\apache\apache2.4.17\conf\httpd.conf，

![service](/work/Service/Service7.png)

注意几种常用格式，自己可以灵活配置：
```
Require local 仅允许本地访问；
Require all denied 拒绝所有访问；
Require all granted 允许所有访问；
Require ip 192.168.0.1 仅允许IP：192.168.0.1 访问；
Require not ip 192.168.0.1 仅禁止IP：192.168.0.1访问；
```

修改完成保存，重启即可