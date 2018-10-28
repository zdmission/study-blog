# Pipe管道

管道的作用的传输，像水一般，把数据流通过管道之后就会新的筛选的数据

管道操作符
比如 person.name | uppercase   这个管道的作用会使得字符变成大写

angular2内置管道 world | slice:1:3   这个结果是or，为什么会是这样呢，slice切分，从索引1开始，包含1，到索引3结束（但是不包含3）

还有就是自定义管道，对某些特殊的数据进行筛选

创建管道  ng g pipe 管道名（也可以这样写 path/管道名)
比如
![pipe1](/study/Angular/pipe/pipe1.png)

使用

![pipe2](/study/Angular/pipe/pipe2.png)

