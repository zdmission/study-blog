# ion-sticky某个内容的悬停

ion-sticky某个内容的悬停

内容的第一行悬停在某个位置，不随其他内容上滑儿滑动，比如搜索框的位置安排，

安装
```bash
bower install ion-sticky --save
```

需要注入到angular的一个模块中
```js
angular.module('ion-sticky-demo', ['ion-sticky']);
```

应用
```html
<ion-content ion-sticky>
    <ion-list>
        <ion-item class="item-divider"> A </ion-item>
        <ion-item> A1 </ion-item>
        <ion-item> A2 </ion-item>
        ...
        <ion-item class="item-divider"> B </ion-item>
        ....
    </ion-list>
</ion-content>
```

还需要在index.html中引入
```js
<script src="lib/ion-sticky/ion-sticky.js"></script>
```