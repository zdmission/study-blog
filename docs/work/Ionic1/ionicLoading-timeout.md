# ionicLoading 以及网络超时写法

app.js 中，先注册 rootScope 的广播

```JS
.run(function ($ionicPlatform, $ionicLoading, ToastService, $rootScope) {
            $rootScope.$on('loading:show', function () {
                  $ionicLoading.show({
                        template: '努力为您加载中...'
                  })
            })
            $rootScope.$on('loading:hide', function () {
                  $ionicLoading.hide()
            })
            .config(function ($httpProvider) {
                  $httpProvider.defaults.timeout = 5000; //默认超时为5秒 $httpProvider.interceptors.push(function ($rootScope) { 
                  return {
                        request: function (config) {
                              $rootScope.$broadcast('loading:show') return config
                        },
                        response: function (response) {
                              $rootScope.$broadcast('loading:hide') return response
                        },
                        responseError: function (response) {
                              $rootScope.$broadcast('loading:hide') return response
                        },
                        requestError: function (config) {
                              $rootScope.$broadcast('loading:hide') return config
                        }
                  }
            })
      })
```
