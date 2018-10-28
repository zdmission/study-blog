# nginx https配置

1. nginx https配置，申请的是Symantec 免费版 SSL，按照阿里云官方提供的方式去完成证书的信息填写，最后下载（[参考](https://yundun.console.aliyun.com/?spm=5176.2020520110.all.12.274156a1kZiN3e&p=cas#/cas/download/214222569340877?regionId=)）

2. 在nginx的配置目录下增加你的443配置，<font color=red>注意443端口和其他端口分开配置</font>，别写在一起，否则的话就会报你的ssl协议错误，配置如下：
![peizhi](/study/Centos7.4/ngins-https-peizhi.png)

3. 完成这样的基本操作之后应该就可以通过https去访问你的网站了