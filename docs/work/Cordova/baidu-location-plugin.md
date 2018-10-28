# cordova基于android的百度定位插件，不知道是什么原因一直报162错误，找寻答案无果，最后换一个高德定位，cordova自带的定位插件在android

cordova基于android的百度定位插件，不知道是什么原因一直报162错误，找寻答案无果，最后换一个高德定位，cordova自带的定位插件在android系统上定位是不精确的，差别比较大，

1.首先在index.html引入
```html
<!--高德地图--> <script type="text/javascript" src="http://cache.amap.com/lbs/static/es5.min.js"></script> <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=ec5a240d5b269c181d4573cb5da1b792&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch"></script>
```

2.正式定位代码和解析地址
```js
// 下文中的$rootScope是angularJS中的全局变量，可以比拟为window一样，$scope是局部变量
$rootScope.mapObj = new AMap.Map("mainposition", {
      resizeEnable: true,
      zoom: 18,
      doubleClickZoom: false
}); //高德定位
$rootScope.mapObj.plugin('AMap.Geolocation', function () {
      $rootScope.geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true 
            timeout: 10000, //超过10秒后停止定位，默认：无穷大 
            maximumAge: 0, //定位结果缓存0毫秒，默认：0 
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true 
            showButton: true, //显示定位按钮，默认：true 
            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角 
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20) 
            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true 
            showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true 
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true 
            zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false 
      });
      $rootScope.mapObj.addControl($rootScope.geolocation);
      $rootScope.geolocation.getCurrentPosition(); //持续监听 
      $scope.geolocation.watchPosition();
      $ionicLoading.show({
            template: '定位中...'
      }).then(function () {
            console.log("The loading indicator is now displayed");
      }); //返回定位信息 
      AMap.event.addListener($rootScope.geolocation, 'complete', function (e) {
            console.log(JSON.stringify(e));
            var lnglatXY = [e.position.lng, e.position.lat];
            var geocoder = new AMap.Geocoder({
                  radius: 1000,
                  extensions: "all"
            }); //得到坐标信息 
            geocoder.getAddress(lnglatXY, function (status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                        $rootScope.address = result.regeocode.formattedAddress;
                        $scope.address = result.regeocode.pois.name; //返回地址描述 
                        console.log($rootScope.address); 
                        $rootScope.$apply();
                  } else {}
            });
      }); //返回定位出错信息 
      AMap.event.addListener($rootScope.geolocation, 'error', function (e) {
            $cordovaToast.showShortBottom('定位失败');
      });
});
```