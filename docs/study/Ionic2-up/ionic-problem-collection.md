# ionic2+小问题集合

## 1.ionic2键盘上推
> <preference name="android-windowSoftInputMode" value="adjustPan"/>

## 2.ionic2解决object unsubscribed的方法
![ionic](/study/Ionic2+/ionic2+14.png)

解决方式：
```bash
npm install ionic-angular@nightly --save --save-exact 
```

## 3.如果ionic2项目中www目录下缺少build等一些文件
在本项目下，执行ionic serve，会自动编译src目录下的文件，把编译好的文件写到www目录下

如果要生成page类型的文件，执行sudo ionic generate page 名称
