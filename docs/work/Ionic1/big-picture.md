# 点击单张图片，显示大图

点击单张图片，显示大图

在modal中可以滑动查看，解决了在modal中活动，大图id会变化，但是关闭modal之后，再次点击另一张图片或者其他图片，大图一直显示上次滑动的关闭之前的哪一张，

modal.html

```html
<ion-modal-view style="opacity: 1;background-color: #0d0d0d;"  ng-click="closeModal()" class="padding">
  <ion-content>
    <div class="list" style="vertical-align: middle;display: table-cell">
      <ion-slide-box on-slide-changed="slideHasChanged($index)" auto-play="false" does-c>
                     show-pager="false" active-slide="CurrentActiveSlide"
                     delegate-handle="delegateHandler"ng-style="slideBoxSet">
        <ion-slide ng-repeat="pd in picAllBig track by $index">
            <div style="width: 100%;height: 350px;"><img ng-src="{{pd.pic}}" on-hold="showActionSheet(pd.pic)"  style="height: 100%;width: 100%;padding-left: 5px;padding-right: 5px">
          </div>
        </ion-slide>
      </ion-slide-box>
    </div>
  </ion-content >
</ion-modal-view>
```

controller.js
```js
//动态获取屏幕的高宽
 var availWidth = parseInt(window.screen.availWidth);
    var availHeight = parseInt(window.screen.availHeight);
    console.log("height="+availHeight);
    $scope.Boxheight='350px';
    console.log("dhf"+parseInt( $scope.Boxheight));
    $scope.proSet={
      "width": (availWidth-24)/2,
      "height":((availWidth-24)/2)*1.357,
    }
   $scope.slideBoxSet={
     "height":$scope.Boxheight,
     "opacity":1,
     "margin-top":(availHeight-parseInt( $scope.Boxheight))/2,
   }
//modal窗口
//显示模态窗口
    $scope.slideHasChanged = function(index){
      console.log(index);
      $rootScope.CurrentActiveSlide = index;
    }

    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'silde-in-left',
      backdropClickToClose: true
    }).then(function (modal) {
      $scope.modal = modal;
    });
    //打开modal
    $scope.openModal = function (ID) {
      $rootScope.CurrentActiveSlide = ID;
      console.log("open CurrentActiveSlide:" + $rootScope.CurrentActiveSlide);
      //window.localStorage.setItem("currid",ID);
      $scope.modal.show();
    }
    //关闭modal
    $scope.closeModal = function () {
      //$scope.CurrentActiveSlide = window.localStorage.getItem("currid");
      console.log("close CurrentActiveSlide:" + $rootScope.CurrentActiveSlide);
      //$rootScope.CurrentActiveSlide = "";
      $scope.modal.hide();
    };
    //销毁modal
    $scope.$on('$destroy', function () {
      console.log("remove");
      $scope.modal.remove();
    });
```