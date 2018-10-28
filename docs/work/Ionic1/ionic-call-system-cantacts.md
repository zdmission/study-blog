# ionic调用系统通讯录功能实现

ionic调用系统通讯录功能实现
安装插件
```bash
ionic plugin add cordova-plugin-contacts
// 里面有几个方法，其中之一便是调用手机自带的通讯录，
```

应用
```js
navigator.contacts.pickContact(function (contacts) {
    var tel = contacts.phoneNumbers[0].value
}, function (err) {
    $cordovaDialogs.confirm('请设置读取联系人权限为允许', '友情提示', ['确定'])
    .then(function (buttonIndex) {
        if (butt 1) {

        }
    });
});
```
有些手机可以调出系统的通讯录，但是选择相应的号码之后回调失败，大多是权限不够，需要把该应用读取通讯录的权限设置为允许即可，还有一种情况选择号码之后app直接闪退，是app的目标版本比较高，把android:targetSdkVersion="21"调低一点即可
