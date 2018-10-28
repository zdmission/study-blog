# service服务以及http
场景演示

![http1](/study/Angular/http/http1.png)

项目中又如何呢
创建一个公共服务文件共所有的组件使用 
```bash
ng g service httputil
```
```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../app/app.config';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpUtil{
  constructor(public http:Http){}
  getCourseList(){
    let url = `/api/course.json`;
    return new Promise((resolve,reject)=>{
      this.http.get(url).map(res => res.json())
        .subscribe(data => {
          resolve(data);
        },err => {
          reject(err);
        })
    })
  }
}
```

怎么去使用呢，这个文件需要在根模块中providers中引用，如果要是用http服务的话，必须引入angular的核心文件之一的HttpModule模块
![http2](/study/Angular/http/http2.png)

，然后在把 HttpUtil注入到你的组件中，那么之后你就可以使用了，其实每个组件中都有一个providers，可以引入多个服务，但大多数情况是服务文件是公共的，只需要注入到根模块中即可
![http3](/study/Angular/http/http3.png)


http是一种从后台程序获取或者更新数据的一种机制，angular2中，使用get，或者post获取的数据是json数据，我们不能对json数据进行操作，所以要把json转换成对象，中间这个转换的过程，需要使用到第三方文件rxjs，使用map方法对数据进行映射，一个Observeable对象，需要使用subscribe去订阅获取数据，

可以使用FireBase网络数据库，工开发人员使用，既然提供了angular2，整合一体，
连接firebase，进行数据库操作，授权登录
如果要使用firbase的话就先要安装相应的package
```bash
npm install -S firebase angularfire2
```

然后在根模块中引入 
```js
import { AngularFireModule } from 'angularfire2';
```
同时写在imports中，之后你就可以在你的组件中使用firebase对象了
怎么在组件中使用呢
```js{1}
declare var firbase:any
```
连接数据库，并对数据库进行操作

![http4](/study/Angular/http/http4.png)
![http5](/study/Angular/http/http5.png)



授权登录  https://github.com/angular/angularfire2/blob/master/docs/1-install-and-setup.md
af.auth  一个授权成功与否的凭证