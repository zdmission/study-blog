# 物理返回按钮控制&双击退出应用

```js
 //物理返回按钮控制&双击退出应用
    $ionicPlatform.registerBackButtonAction(function (e) {
    e.preventDefault();
    function showConfirm() {
        navigator.notification.confirm(
        '你真的要狠心退出吗？',
        function (e) {
            if (e === 1)
            ionic.Platform.exitApp();
        },
        '退出应用',
        ['狠心退出', '点错了']
        );
    }
    //判断处于哪个页面时双击退出
    if ($location.path() == '/tab/home' || $location.path() == '/tab/account'|| $location.path() == '/tab/appointmentCoach') {
        showConfirm();
    }else if ($rootScope.$ionicHistory.backView()) {
        if ($cordovaKeyboard.isVisible()) {
        $cordovaKeyboard.close();
        } else {
        $ionicHistory.goBack();
        }
    }
    else {
        showConfirm();
    }
    return false;
    }, 101);
```