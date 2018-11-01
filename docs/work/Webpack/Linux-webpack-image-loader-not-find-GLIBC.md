# linux下webpack中图片压缩的loader依赖文件找不到GLIBC以及happypack多线程加速构建不能使用

<font color=red>Linux/Centos下/lib64/libc.so.6: version `GLIBC_2.14' not found</font>

使用命令
```bash
// 查看 GLIBC在linux系统中的版本，如下图
strings /lib64/libc.so.6 | grep GLIBC
```

![webpack](/work/Webpack/webpack6.png)

最高是2.12的，但是报错中说glibc_2.14 not found，所以需要升级一下我们glibc，操作方式如下

### CentOS 6.x 如何升级 glibc 2.17
```bash
ldd --version
rpm -qa | grep glibc
```

### 查看glibc的版本
```bash
strings /lib64/libc.so.6 |grep GLIBC_
```

**安装一些基本库**
```bash
sudo yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
```

### update glibc to 2.17 for CentOS 6
```bash
# update glibc to 2.17 for CentOS 6
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-utils-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-static-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-common-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-devel-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/glibc-headers-2.17-55.el6.x86_64.rpm &
wget http://copr-be.cloud.fedoraproject.org/results/mosquito/myrepo-el6/epel-6-x86_64/glibc-2.17-55.fc20/nscd-2.17-55.el6.x86_64.rpm &

sudo rpm -e --nodeps --justdb glibc-2.*.i686 --allmatches
sudo rpm -Uvh *-2.17-55.el6.x86_64.rpm
#或者：
sudo rpm -Uvh *-2.17-55.el6.x86_64.rpm --force --nodeps
```


### update glibc to 2.15 for CentOS 6
```bash
# update glibc to 2.15 for CentOS 6
wget -c http://ftp.redsleeve.org/pub/steam/glibc-utils-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-headers-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-static-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-common-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-common-2.15-60.el6.i686.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/glibc-devel-2.15-60.el6.x86_64.rpm &
wget -c http://ftp.redsleeve.org/pub/steam/nscd-2.15-60.el6.x86_64.rpm &

sudo rpm -e --nodeps --justdb glibc-2.*.i686 --allmatches
rpm -Uvh *-2.15-60.el6.x86_64.rpm
rpm -Uvh glibc-2.15-60.el6.i686.rpm
ldconfig

# -e, --erase                       erase (uninstall) package
# -U, --upgrade=<packagefile>+      upgrade package(s)
# -v, --verbose                     provide more detailed output
# -h, --hash                        print hash marks as package installs (good with -v)
# --nodeps                          忽略软件包的依赖关系强行安装
```


### 源码安装
```bash
wget https://mirrors.tuna.tsinghua.edu.cn/gnu/glibc/glibc-2.17.tar.gz
tar -zxvf glibc-2.17.tar.gz
cd glibc-2.17
mkdir build && cd $_
sudo ../configure --prefix=/usr/glibc-2.17 --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin  
make && make install
```

几种方式都行

升级glibc完成，重新构建我们的代码，图片压缩成功，happypack能正常使用