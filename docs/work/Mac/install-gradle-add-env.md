# mac安装gradle，配置环境变量
我是直接下载的gradle的压缩包，免安装，然后直接解压拷贝到/usr/local/opt/gradle/gradle-4.0该目录下，然后就是配置环境变量了

如果你可以看见mac中的隐藏文件的话，你可以直接找到.bash_profile这个文件，文本编辑，把export PATH=${PATH}:/usr/local/opt/gradle/gradle-4.0/bin写进去

如图所示

![mac](/work/Mac/mac2.png)

或者使用命令行打开
```bash
vim  ~/.bash_profile
```

使得环境变量配置立即生效
```bash
source ~/.bash_profile
```

然后在执行gradle -v查看，出现如下界面说明成功了
![mac](/work/Mac/mac3.png)

