# 浏览器存储

- 1.cookie会话跟踪技术，可以辨别身份，进行session跟踪而存储在用户本地终端上的数据，访问服务器的时候需要带上cookie，但不要使用过量，这样会增加请求包的体积
    - （1）访问限制性：如果把顶级域名设置成cookie访问域名，那么可以实现多个子域名共享cookie的效果，也可以给cookie加域名限制，如用户唯一标识信息，加上httponly，那么客户端就是只读，无法写入加入标识的cookie字段
    - （2）存储时长：可以手动设置有效期，过了有效期浏览器自动清除，如果没有设定，那么cookie就是session级别的，在未关闭浏览器之前，所有tab级的页面刷新或者新开，均属于一个session，只有退出浏览器，cookie就会失效
    - （3）一般不在cookie里面存储数据，如果必须要存的话，存储一些访问页面必须要携带到服务器端的信息总之越少越好

- 2.短暂的sessionStorage
    webstorage的一种，存储键值对的数据，
    - （1）访问限制性
    不同于cookie，限制性更高，在本窗口刷新可以访问sessionStorage，在新开的tab下，或者关闭本TAB再打开后(也是www.qq.com)，也是无法访问到之前种的sessionStorage的
    - （2）议存储一些当前页面刷新需要存储，且不需要在tab关闭时候留下的信息。刚刚说了，只有页面刷新才不会清除掉sessionStorage。剩下的均会清理掉sessionStorage

- 3.localStorage
localStorage与sessionStorage虽然相似，但是访问限制却不尽相同，localStorage的访问域默认设定为设置localStorage的当前域，其他域名不可以取。这点与sessionStorage相同，但是与sessionStorage不同的是，localStorage设定后，新开tab是可以访问到的

存储时长如果用户不自动清除的话，是永久存储，大小一般在4M左右，一般用来存储一些用户信息

- 4.websql（关系型数据库）和indexeddb（nosql）
websql官方不在维护，转向indexeddb，但是websql的兼容性很好吗，indexeddb的兼容性却不是很好，android4.4之前以及ios7以前都无法使用
indexeddb和websql在这一点上与localStorage一致，均是在创建数据库的域名下才能访问。而且不能指定访问域名。除非用户清除，那么就是永久，大小一般是不限制的，超过50M浏览器会提示

性能也是蛮快的，做离线应用，需要在本地存储用户皮肤，大量数据信息，或者驾校的考试题等等