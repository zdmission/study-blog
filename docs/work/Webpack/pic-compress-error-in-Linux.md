# webpack4中图片压缩插件报错在Linux系统中

问题：<font color=red>error while loading shared libraries: libpng16.so.16: cannot open shared object file: No such file or directory</font>

一直找不到libpng16.so.16这个库，所以呢需要安装
[下载地址：](https://sourceforge.net/projects/libpng/files/libpng16/older-releases/1.6.16/)

下载如图红框的包

我把所有的包都下载到了服务器新建目录/software下，如图

![webpack](/work/Webpack/webpack1.png)

**安装libpng1.6.16**
```bash
tar xvfz libpng-1.6.16.tar.gz
cd libpng-1.6.16
./configure --prefix=/usr/local/libpng/  --enable-shared
make check && make && make install
```

配置我们的动态链接库,查看 
```bash 
cat /etc/ld.so.conf
```
![webpack](/work/Webpack/webpack2.png)


写入字符串到/etc/ld.so.conf该文件中，当然也可以打开该文件直接写入 
```bash
echo "/usr/local/libpng" >> /etc/ld.so.conf
```
使得配置生效 
```bash
ldconfig
```

或者设置环境变量 在该文件/etc/profile中添加
```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/libpng:/usr/local/lib:/usr/local/libpng/lib
```
记住是libpng下的lib，因为在这个目录下才有libpng16.so.16，如图

![webpack](/work/Webpack/webpack3.png)

下载zlib包，[下载地址](http://www.zlib.net/fossils/) 各种版本的都有

安装zlib-1.2.11之前先删除zlib.so,查找出所有zlib.so，命令 find / -name "libz.so"
```bash
# 安装zlib-1.2.11
tar xvfz zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure
make && make install
```