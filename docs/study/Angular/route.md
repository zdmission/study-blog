# 路由

## 1.抽离路由模块app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TvComponent} from "./tv/tv.component";
import {DetailComponent} from "./detail/detail.component";
import {AdComponent} from "./ad/ad.component";
import {DaComponent} from "./da/da.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home(ad:ad//da:da)',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ad',
    component: AdComponent,
    outlet: 'ad'
  },
  {
    path: 'da',
    component: DaComponent,
    outlet: 'da'
  },
  {
    path: 'tv',
    component: TvComponent,
    children: [
      {
        path: 'detail',
        component: DetailComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      }
    ],
    data: [
      {
        message: '电视剧节目列表'
      }
    ]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
```
最后在根模块app.module.ts中引入
![route](/study/Angular/route/route1.png)


## 2.路由的跳转
```
<a [routerLink]="['/home']" [routerLinkActive]="['active']">首页</a>
<a [routerLink]="['/tv']" [routerLinkActive]="['active']">电视剧</a>
```
当前路由标题高亮routerLinkActive

## 3.路由传参的几种方式
- （1）path:'/detail/:id'这种情况
```
[1] <a [routerLink]="['/home',1]" 这样方式获取值this.activatedRoute.snapshot.params['id']，如果每次传过来的值都是不一样的话，那么这种方式是获取不到最新值的
[2] <li [routerLink]="['/tv/detail']" [queryParams]="{id: 2}">我的前半生</li>，也可以这样写<li [routerLink]="['/tv/detail',{queryParams:{id:1}}]">我的前半生</li>
[3] this.router.navigate(['/tv/detail', 1])这种方式当然得有router对象，或者另一种形式this.router.navigate(['/tv/detail', {queryParams：{id：1}}])
[4] 还有一种就是在路由定义文件中是data属性去传，这些值的话一般不怎么改变，data是一个数组，比如这样
```

那么我们怎么去接收这个值呢？？？？？

对于data属性，可以这样使用  不过先要引入ActivatedRoute 然后this.activatedRoute.snapshot.data[0]['message']

如果使用snapshot快照的话，但是后边拿到的数据根第一次的一样，不会更新，当然我们可以使用
params来获取，必须要有ActivatedRoute和Params对象
```
this.activatedRoute.params.subscribe((params: Params)=>{
      this.id1 = params['id']//取值的时候要用数组的形式去获取对象的属性的值
    })
```

## 4.辅助路由，相当于vue中命名视图
辅助路由，说白就是可以载入多个路由插座 router-outlet，这种场景也比较多，比如一进入主页就会有广告，这个怎么实现呢？

首先广告也是组件之一吧，创建两个组件，ad和da，并且在路由中配置
![route](/study/Angular/route/route2.png)

其次在页面中也要写上路由插座，并且每个路由插座的名字name和两个组件在路由文件中outlet值一样
![route](/study/Angular/route/route3.png)

那么怎么去激活路由插座呢显示相应的组件内容呢，手动激活或者路由配置文件中设置
例如手动激活

![route](/study/Angular/route/route4.png)

前者是显示，后者是隐藏

还有就是路由文件配置

![route](/study/Angular/route/route5.png)

如果是一个路由插座的话，就写一个path:'/home(ad:ad)'，多个话就用//分开
这种情况怎么去隐藏呢
添加点击事件

![route](/study/Angular/route/route6.png)

然后在相应的组件中实现事件方法，需要引入Router对象

![route](/study/Angular/route/route7.png)


获取地址栏中的信息
```
import { NavigationEnd, Router } from '@angular/router';
import "rxjs/add/operator/filter";
constructor(public router:Router) {
  this.router.events
    .filter((event =>event instanceof NavigationEnd))
    .subscribe((event:NavigationEnd)=>{
    switch (event.url){
      case '/home':
        this.title = '首页'
        this.subtitle = '';
        break;
      case '/course-list':
        this.title = '课程管理'
        this.subtitle = '课程信息列表'
        ;break;
    }
    })
}
```