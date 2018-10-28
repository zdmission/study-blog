# pm2使用

1.安装
```bash
npm install -g pm2
```

2.使用
```bash
// 开启服务
pm2 start 你需要运行的js文件

// 显示你的启动的js的详情
pm2 show <id|name>

// 打印log日志
pm2 logs dispatch [--lines 1000]

// js的内存使用情况
pm2 monit
```
