# cnpm私有化服务器搭建，包管理

## 一、服务器环境搭建

- 1.环境依赖
```bash
node  >= 4.2.3
git
mysql
```
本机操作系统是centos7.4

注：操作目录/private-package，该目录包含了cnpmjs的源码和Components组件，下文中所说的IP都是指服务器的外网IP地址

- 2.克隆cnpmjs代码
```bash
git clone https://github.com/cnpm/cnpmjs.org.git
cd cnpmjs.org
npm install
```

- 3.创建mysql数据库
    - [参考此篇文章《2018.9.20 centos7.4安装mysql5.6，node》](http://note.youdao.com/noteshare?id=a9020742dd669f75da9bf2d7fb0c2020&sub=7D422DDB06C74C55A076E782E901DD2A)
    - [2018.06.09 - CentOS 7 安装mysql 5.6](https://blog.csdn.net/ba__lu/article/details/80631582)


- 4.修改配置文件（cnpmjs.org/config/index.js）
    - a.数据库设置
    ![cnpm1](/work/JS/cnpm/cnpm1.jpeg)

    - 注释掉bindingHost这一行，以供外网访问
    ![cnpm1](/work/JS/cnpm/cnpm2.jpeg)

    - 修改registryHost字段的值，改成服务器的外网IP，这样便于下载包的时候走的是这个镜像地址
    ![cnpm1](/work/JS/cnpm/cnpm3.jpeg)

    - 配置操作私有组件的管理员
    ![cnpm1](/work/JS/cnpm/cnpm4.jpeg)

- 5.配置完毕，启动我们的服务
```bash
cd cnpmjs.org
node dispatch.js
```
或者使用pm2来管理我们的进程
```bash
npm i -g pm2   // 安装pm2
pm2 start dispatch.js   // 启动服务
```
![cnpm1](/work/JS/cnpm/cnpm5.jpeg)

在浏览器中打开刚才配置的IP:7002就可以访问我们搭建的私有库了
![cnpm1](/work/JS/cnpm/cnpm6.jpeg)

## 二、怎么上传私有包到库中呢？

- 1.首先见cnpm的registry修改成我们的私有注册地址
```bash
cnpm set registry http://IP:7001
```

- 2.登录cnpm，就是在config/index.js文件中配置的管理员
```bash
 cnpm login
 Username: myname
 Password: ***
 Email: (this IS public) test@test.com
```

- 3.上传到私有仓库
    - a.新建项目
    ```bash
    cd 某个目录
    创建目录  mkdir helloworld
    切入目录cd helloworld
    创建package.json且初始化名称版本 cnpm initname: (helloworld) @my-company-name/helloworldversion: (1.0.0)
    package.json如下：
    {  "name": "@my-company-name/helloworld",  "version": "1.0.0",  "description": "my first scoped package",  "main": "index.js",  "scripts": {    "test": "echo \"Error: no test specified\" && exit 1"  },  "author": "",  "license": "ISC"}
    ```

    - b.上传包到私有库\
    ```bash
    cnpm publish+ @my-company-name/helloworld@1.0.0
    ```

    - c.卸载包
    ```bash
    cnpm unpublish [name]   也可卸载具体版本
    ```

- 4.预览我们上传的包
![cnpm1](/work/JS/cnpm/cnpm7.jpeg)



## 三、参考文章
- [搭建CNPM私有库](https://www.cnblogs.com/JimmyLuo/p/7079634.html——小蛇君)
- [CNPM搭建私有的NPM服务]( http://blog.fens.me/nodejs-cnpm-npm/——粉丝日志)
- [cnpm官方github五分钟搭建私有化仓库]( https://github.com/cnpm/cnpmjs.org/wiki/Deploy-a-private-npm-registry-in-5-minutes)
- [在5分钟内搭建企业内部私有npm仓库](https://github.com/jaywcjlove/handbook/blob/master/CentOS/%E5%9C%A85%E5%88%86%E9%92%9F%E5%86%85%E6%90%AD%E5%BB%BA%E4%BC%81%E4%B8%9A%E5%86%85%E9%83%A8%E7%A7%81%E6%9C%89npm%E4%BB%93%E5%BA%93.md)

