# 在Ubuntu上安装nginx，并配置相关文件

1. 查看所有的端口使用情况
```bash
netstat -apn
```

2. 查询某个端口占用，该例子是80端口使用的程序
```bash
netstat -apn | grep 80
```

3. 查询某个进程使用的情况，ps表示process
```bash
ps -aux | grep xxx
ps -aux | grep pid
```

4. 查询某个软件的进程
```bash
ps -ef | grep nginx
```
红线框是nginx的主进程
![u-nginx-1](/study/Ubuntu/u-nginx-1.png)


5. 直接杀死进程
```bash
kill -QUIT 主进程号 //（比如上一张图片中 kill -QUIT 11711）

// 暴力停止进程 
kill -9 主进程号 //（后边可以写很多个进程号，用空格分开）
```

6. nginx配置文件


7. 清屏
- 1、clear命令、这个命令将会刷新屏幕，本质上只是让终端显示页向后翻了一页，如果向上滚动屏幕还可以看到之前的操作信息。
- 2、Ctrl+l(小写的L)、这是一个清屏的快捷键，这个是笔者在工作中用得最多的一种清屏方式，清屏效果同clear命令一样。
- 3、reset命令、这个命令将完全刷新终端屏幕，之前的终端输入操作信息将都会被清空，这样虽然比较清爽，但整个命令过程速度有点慢，使用较少。
    值得一提的是reset命令在你的终端控制错乱时非常有用。如输入字符不出现在光标的位置的情况。还有当你敲击回车键时，新提示符并没有出现在新行上
    而是出现在老提示符的前面。此时reset命令就能用来修正这些问题
- 4. /usr/bin/目录下。新建一个名为cls的文件，加上执行权限（chmod 4755 cls）,目的是此程序具有root权限，写入如入内容

![u-nginx-2](/study/Ubuntu/u-nginx-2.png)

``` bash
#!/bin/bash
#
printf "\033c"
chmod 4755 cls
```

之后就可以使用cls这个命令来清屏啦，爽歪歪

8. 全局查找于nginx相关的文件
```bash
sudo find / -name nginx
```

9. 开始安装我们的nginx
```bash
sudo apt-get install nginx 
```
安装完自动启动了nginx，这个时候你就可以在你的本机浏览器中访问localhost或者127.0.0.1，又或者是你的公网IP，看是否会出现nginx的欢迎页面，如果出现，安装运行成功

当然也可以在命令窗口输入 curl 127.0.0.1 返回html的东西也是成功的

10. 问题： nginx: [emerg] unknown log format "main"

那是因为没有在nginx.conf配置文件加入log日志文件的写入样式，如下图所示
![u-nginx-3](/study/Ubuntu/u-nginx-3.png)

11. 查询某个字符串在某个文件中出现的位置
```bash
grep -r localhost /etc
```

12. 域名冲突
nginx: [warn] conflicting server name "localhost" on 0.0.0.0:80, ignored

就是在配置中出现了多次域名localhost的配置
![u-nginx-4](/study/Ubuntu/u-nginx-4.png)

图片中第二个和第三个配置文件都有localhost的配置，所以冲突了

13. 罗列出于nginx相关的软件
```bash
dpkg --get-selections|grep nginx
```
如下图所示

![u-nginx-5](/study/Ubuntu/u-nginx-5.png)

14. 删除与nginx有关的软件
```bash
sudo apt-get --purge remove nginx
sudo apt-get --purge remove nginx-common
sudo apt-get --purge remove nginx-core
```
这样就可以完全卸载掉nginx包括配置文件


15. linux下修改完profile文件的环境变量后如何立即生效
- 方法1： 让/etc/profile文件修改后立即生效 ,可以使用如下命令: # . /etc/profile 注意: . 和 /etc/profile 有空格
- 方法2： 让/etc/profile文件修改后立即生效 ,可以使用如下命令: # source /etc/profile