# 局部刷新

```js
// 局部刷新
$scope.$on('$ionicView.beforeEnter',function(){})
//刷新请求数据
  .factory("Util",function($http,$ionicLoading,URL){
    return{
      refresh:function(sessionId){
        var data = {act: 'act_reflash'}
        return $http.post(URL + 'person.php?token='+sessionId, {"data": JSON.stringify(data)},{headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }}).success(function (response) {
              return response;
        }).error(function (err) {
          $ionicLoading.show({template: '网络异常！', noBackdrop: true, duration: 1200});
        })
      }
    }
  })

//controller中调用
Util.refresh(storage.getItem("loginSessionId")).then(function(result){
        if(result.data.err==0){
          $scope.type = result.data.r.type;
          $scope.status = result.data.r.statue
        }
    })

```