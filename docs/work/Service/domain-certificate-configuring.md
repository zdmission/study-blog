# 域名配置ssl证书

我是通过阿里云买的域名，要配置ssl证书，那么你必须去购买ssl证书

[购买地址：](https://common-buy.aliyun.com/?spm=5176.2020520163.cas.97.549166aaIV8tD5&commodityCode=cas#/buy)

### 步骤 
#### 一、一般我们玩的话自己买个免费的就行了

![service](/work/Service/Service8.png)

#### 二、然后去支付，成功之后就会在你的阿里云安全（云盾）功能模块里面就有你的证书啦

![service](/work/Service/Service9.png)

#### 三、这时候的证书是未完成的，你需要补全，点击补全去填写相关的信息，按照要求填写

![service](/work/Service/Service10.png)

#### 四、下一步

![service](/work/Service/Service11.png)

#### 五、下一步就是提交审核了，审核过之后，就可以下载ssl证书了

![service](/work/Service/Service12.png)

#### 六、我的服务器是nginx的，下载相应的证书即可

![service](/work/Service/Service13.png)

#### 七、
1. 证书文件214222473900877.pem，包含两段内容，请不要删除任何一段内容。
2. 如果是证书系统创建的CSR，还包含：证书私钥文件214222473900877.key。
如果申请证书时是自己创建的CSR文件，请将对应的私钥文件放到cert目录下并且命名为214222473900877.key；

把这两个文件放在nginx的安装目录下的conf文件下

![service](/work/Service/Service14.png)


然后打开nginx.conf配置文件，找到如下内容，也有可能有些不同，但是大致是一样的
```
# HTTPS server
# #server {
#   listen 443;
#   server_name localhost;
#   ssl on;
#   ssl_certificate cert.pem;
#   ssl_certificate_key cert.key;
#   ssl_session_timeout 5m;
#   ssl_protocols SSLv2 SSLv3 TLSv1;
#   ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
#   ssl_prefer_server_ciphers on;

#   location / {
#
#
#   }
#}
```

修改为如下配置
```
server {
    listen 443;
// 如果你有自己的域名的话，把localhost改成你的域名，这样你在你的浏览器访问了（前提是你的域名已经备案成功）
    server_name localhost;//比如写成www.zdmission.cn
    ssl on;
    root html;
    index index.html index.htm;
// 一定的注意证书放置的路径
    ssl_certificate   214222473900877.pem;
    ssl_certificate_key  214222473900877.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        root html;
        index index.html index.htm;
    }
}
```

配置完成之后，重启nginx就可以啦
遇到一个坑，证书放在其他目录，然后引用的时候路径是正确的，但是会报错如下错误
```
nginx: [emerg] BIO_new_file("C:\nginx/conf/cert/214222473900877.pem") failed (SS
L: error:02001003:system library:fopen:No such process:fopen('C:\nginx/conf/cert
/214222473900877.pem','r') error:2006D080:BIO routines:BIO_new_file:no such file
)
```