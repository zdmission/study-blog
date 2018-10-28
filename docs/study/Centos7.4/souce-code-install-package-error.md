# centos系统上源码安装包报错

错误如下：<font color=red>no acceptable C compiler found in $PATH</font>

### 解决方式：

由于本机缺少gcc编译环境

1、通过yum安装gcc编译环境：yum install -y gcc

2、本机没有安装yum功能，可下载gcc安装包：https://gcc.gnu.org/