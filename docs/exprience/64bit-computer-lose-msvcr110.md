# 64位电脑上启动程序出现丢失MSVCR110.dll的解决办法

启动程序报错如下：

<font color=red>无法启动此程序，因为计算机中丢失MSVCR110.dll。尝试重新安装该程序以解决此问题。</font>

应该很容易就搜索到，缺少这样的dll文件，是没有安装Visual C++ Redistributable for Visual Studio 2012的缘故，但是在安装了Visual C++ Redistributable for Visual Studio 2012 X64版本后，运行程序依旧报错这个dll文件丢失，问题就在于，64位电脑中，可以运行32位和64位的程序，因而，如果运行的32位的程序，需要32位的Visual C++ Redistributable for Visual Studio 2012 X86版本的支持，否则会出现上述的错误，因为软件查找的是X86版本的dll文件，而我安装的X64的，当然会发生丢失

解决方案：如果你是64位的机器，建议安装下列地址上提供的X86和X64版本，两个版本都安装

[安装地址](http://www.microsoft.com/zh-CN/download/details.aspx?id=30679)