# nginx配置location中root指向目录问题

发送一个请求，nginx中location会拦截请求的地址，做相应的判断处理

1.一般的我们的项目文件放在nginx安装目录下边的，location中的root路径大概是这样的
```
location / {  
            root   html;  // 这个html文件目录是指定的当请求是http://ip/是如此的访问的目录
            index  index.html index.htm index.jsp;  
    }
```

如果在html 文件中有你的项目文件，你大概可以这样写
```
location / {  
            root   html/你的项目名;  
            index  index.html index.htm index.jsp;  
    }  
```

2.如果你不想把你的项目放在nginx的安装目录下的某个文件中，其实就是放在磁盘的某一个盘中
```
location /abc/ {
			alias J:/PPT/; 实际访问http://ip/abc的时候，访问的是J盘PPT目录下的index.html文件
			index  index.html index.htm index.jsp; 
}
```
![service](/work/Service/Service22.png)



alias 和 root 的区别
- alias 指定的目录是准确的，给location指定一个目录。
- root 指定目录的上级目录，并且该上级目录要含有locatoin指定名称的同名目录

例如
```
location /img/ {
	alias /var/www/image/;
} /img/如果后边加了 / 的话，那么 /var/www/image/ 后边必须加 /
# 或者
location /img {
	alias /var/www/image;
}  /img 如果后边没有加 / 的话，那么 /var/www/image/ 后边加斜线和不加斜线是一样的
```
若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去/var/www/image/目录找文件
```
location /img/ {
	root /var/www/image;
}
```
若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件

如果想和上边 alias的结果是一样的话，只有这样写了，没有其他套路
```
location /image/ {
	root /var/www;
}
```
ningx会自动去/var/www/image/目录找文件

注意： 
- 1.使用alias时，目录名后面一定要加”/“。
- 2.使用alias标签的目录块中不能使用rewrite的break。
- 3.alias在使用正则匹配时，必须捕捉要匹配的内容并在指定的内容处使用。
- 4.alias只能位于location块中


[本地文件目录映射，参考文章](http://www.cnblogs.com/freeweb/p/5446632.html)
