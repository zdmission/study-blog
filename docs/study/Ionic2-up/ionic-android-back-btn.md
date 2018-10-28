# ionic2安卓 硬件返回按钮

1.app.html,添加#myNav,在app.component.ts文件通过@ViewChild('myNav')获取
```html
<ion-nav #myNav [root]="rootPage"></ion-nav>
```
2.app.component.ts
```ts
import {Component, ViewChild} from '@angular/core';
import {Platform, ToastController, Nav, IonicApp} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
rootPage = TabsPage;
backButtonPressed: boolean = false;  //用于判断返回键是否触发
@ViewChild('myNav') nav: Nav;

constructor(public ionicApp: IonicApp, public platform: Platform, public toastCtrl: ToastController) {
    platform.ready().then(() => {
    StatusBar.styleDefault();
    Splashscreen.hide();
    this.registerBackButtonAction();//注册返回按键事件
    });
}

registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
    //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
    // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
    let activePortal = this.ionicApp._modalPortal.getActive();
    if (activePortal) {
        activePortal.dismiss().catch(() => {});
        activePortal.onDidDismiss(() => {});
        return;
    }
    let activeVC = this.nav.getActive();
    let tabs = activeVC.instance.tabs;
    let activeNav = tabs.getSelected();
    return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
}

//双击退出提示框
showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
        this.platform.exitApp();
    } else {
        this.toastCtrl.create({
            message: '再按一次退出应用',
            duration: 2000,
            position: 'top'
        }).present();
        this.backButtonPressed = true;
        setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
}
}
```

3.tabs.html,添加#mainTabs,在tabs.ts文件通过@ViewChild('mainTabs') tabs:Tabs;获取
```html
<ion-tabs #mainTabs>
    <ion-tab [root]="tab1Root" tabTitle="Home" tabIc />  
    <ion-tab [root]="tab2Root" tabTitle="About" tabIc />  
    <ion-tab [root]="tab3Root" tabTitle="Contact" tabIc /> 
</ion-tabs>
```

4.tabs.ts
```ts
import {Component, ViewChild} from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {Tabs} from "ionic-angular";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('mainTabs') tabs:Tabs;
    tab1Root: any = HomePage;
    tab2Root: any = AboutPage;
    tab3Root: any = ContactPage;
    constructor() {
    }
}
```