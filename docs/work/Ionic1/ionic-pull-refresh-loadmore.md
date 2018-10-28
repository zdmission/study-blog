# 下拉刷新和上拉加载更多

下拉刷新和上拉加载更多

```js
// 公共变量
var run = false;
    $scope.PageIndex = 0;
    $scope.PageSize = 10;
    $scope.materialImg = [];
    $scope.picAllBig = [];
```

下拉刷新
```html
<ion-refresher
    pulling-text="下拉刷新"
    on-refresh="rePic()">
</ion-refresher>
```

下拉实现方法
```js
$scope.rePic = function () {
    $timeout(function () {
    var obj_data = {act: 'act_get_pics', type: '1', page: 0, pagesize: 10};
    promotionMaterialService.getMaterialAddr(obj_data).success(function (data) {
        if (data.err == 0) {
        $scope.materialImg = data.r;
        $scope.picAllBig = data.r;
        $scope.PageIndex = 0;
        $scope.domore = false;
        $scope.$broadcast('scroll.refreshComplete');
        } else {
        $ionicLoading.show({template: response.err_des, noBackdrop: true, duration: 2000});
        }
    }).error(function (err) {
        $ionicLoading.show({template: '网络异常', noBackdrop: true, duration: 2000});
    })
    }, 1500);
};
```

上拉加载html布局
```html
<ion-infinite-scroll
    ng-if="!domore"
    on-infinite="loadMorePic()"
    immediate－check="false"
    distance="10%">
</ion-infinite-scroll>
```

上拉实现函数
```js
$scope.loadMorePic = function () {
    var timer = null;
    $timeout(function () {
    if (!run) {
        run = true;
        $scope.PageIndex++;
        var data = {act: 'act_get_pics', type: '1', page: $scope.PageIndex, pagesize: $scope.PageSize}
        promotionMaterialService.getMaterialAddr(data).success(function (data) {  // 调用承诺API获取数据 .resolve
        run = false;
        if (data.err == 0) {
            if (data.r) {
            if (data.r.length != 0) {
                $scope.materialImg = $scope.materialImg.concat(data.r);
                $scope.picAllBig = $scope.picAllBig.concat(data.r);
            }
            if (data.r.length == 0) {
                $scope.domore = true;
                $ionicLoading.show({template: '没有更多的图片了！', noBackdrop: true, duration: 1000});
            }
            timer = $timeout(function () {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 2000);
            } else {
            $scope.domore = true;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        } else {
            $ionicLoading.show({template: data.err_des, noBackdrop: true, duration: 2000});
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (data) {  // 处理错误 .reject
        $timeout.cancel(timer);
        });
        $scope.$on("$destroy", function () {
        //clearTimeout(timer.$$timeoutId);
        $timeout.cancel(timer);
        //清除配置,不然scroll会重复请求
        });
    }
    }, 2000);
}
```

