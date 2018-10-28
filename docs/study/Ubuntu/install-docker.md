# 在阿里云Ubuntu14.04上安装docker，使用阿里云的镜像

## step 1: 安装必要的一些系统工具
```bash
sudo apt-get update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
```
## step 2: 安装GPG证书
```bash
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```
## Step 3: 写入软件源信息
```bash
sudo add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable"
```
## Step 4: 更新并安装 Docker-CE
```bash
sudo apt-get -y update
sudo apt-get -y install docker-ce
```

### Step 1: 查找Docker-CE的版本:
```bash
apt-cache madison docker-ce
docker-ce | 17.03.1~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
docker-ce | 17.03.0~ce-0~ubuntu-xenial | http://mirrors.aliyun.com/docker-ce/linux/ubuntu xenial/stable amd64 Packages
```
### Step 2: 安装指定版本的Docker-CE: (VERSION 例如上面的 17.03.1~ce-0~ubuntu-xenial)
```bash
sudo apt-get -y install docker-ce=[VERSION]
```

## 安装校验
```bash
sudo docker version
```

```bash
Client:
 Version:      18.03.1-ce
 API version:  1.37
 Go version:   go1.9.5
 Git commit:   9ee9f40
 Built:        Thu Apr 26 07:18:46 2018
 OS/Arch:      linux/amd64
 Experimental: false
 Orchestrator: swarm

Server:
 Engine:
  Version:      18.03.1-ce
  API version:  1.37 (minimum version 1.12)
  Go version:   go1.9.5
  Git commit:   9ee9f40
  Built:        Thu Apr 26 07:16:59 2018
  OS/Arch:      linux/amd64
  Experimental: false

```

## 在docker中安装shadowsocks
```
docker pull oddrationale/docker-shadowsocks
```

## 运行设置shadowsocks
```
docker run -d -p 9527:9527 oddrationale/docker-shadowsocks -s 0.0.0.0 -p 9527 -k paaassswwword -m aes-256-cfb
// 9527是服务器端口 
// Zd19980808是密码 
// aes-256-cfb是加密方式

docker ps // 列出所有在运行的容器信息
```
