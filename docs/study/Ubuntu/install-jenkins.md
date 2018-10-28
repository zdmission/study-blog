# Ubuntu14.04上安装jenkins

jenkins依赖于java，所以需要安装javasdk
1. JDK安装
```bash
sudo add-apt-repository ppa:webupd8team/java 
sudo apt-get update 
sudo apt-get install oracle-java8-installer 
sudo update-java-alternatives -s java-8-oracle 
//测试：
java -version
```

2. maven安装
```bash
sudo apt-get install maven
// 测试：
mvn -version
```

3. git安装
```bash
sudo apt-get install git
```

4. 安装jenkins
```bash
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add - 
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list' 
sudo apt-get update 
sudo apt-get install jenkins
```