# Iterator基本用法
### 什么是Iterator接口

### Iterator基本用法
```js
{
  let arr=['hello','world'];
  //数组直接调用了Symbol.iterator这个接口，数组内部已经帮我们实现了这个接口，所以我们直接调用，返回了一个对象，这个对象有一个方法是next
  let map=arr[Symbol.iterator]();
  console.log(map.next());
  // Object {value:"hello",done:false},done为false说明还有下一步操作，为true的话，说明循环就结束了
  console.log(map.next());
  // Object {value:"hello",done:false}
  console.log(map.next());
  // Object {value:undefined,done:true}
}

{
    // 自定义Iterator接口，对象是没有Iterator接口的，
    let obj={
    start:[1,3,2],
    end:[7,9,8],
    [Symbol.iterator](){
      let self=this;
      let index=0;
      let arr=self.start.concat(self.end);
      let len=arr.length;
      return {
        next(){
          if(index<len){
            return {
              value:arr[index++],
              done:false
            }
          }else{
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
  }
  for(let key of obj){
    console.log(key);
  }
}

// 或者
{
    //定义一个的Object对象,把一个不可遍历的Object对象，变成可遍历的对象。
    let obj = {
        0:"我是0",
        1:"我是1",
        2:"我是2",
        length:3,
        //添加[Symbol.iterator]方法
        [Symbol.iterator] : function() {
            let _this = this;
            let index = 0;
            return {
                next:() => {
                    let value = _this[index];
                    let done = (index >= _this.length);
                    index++;
                    return {value,done}
                }
            }
        }
    };

    //咱们来for...of一下
    for(let v of obj){
        console.log(v);
    }
    //结果："我是0"
    //      "我是1"
    //      "我是2"
}
```

### for...of循环的过程就是不断调用Iterator接口来达到这种形式
```js
{
  let arr=['hello','world'];
  for(let value of arr){
    console.log('value',value);
  }
}
```

### for...of，我们可以使用它来遍历数组，字符串，Set和Map结构，但是有没有发现，我们并没有说它可以遍历Object对象
```js
{
     //定义一个的Object对象
    let obj = {"name":"前端君"};

    //咱们来for...of一下
    for(let v of obj){
        console.log(v);
    }
    //结果：报错
    //错误提示：obj[Symbol.iterator]不是一个function
    // for...of根本不支持遍历普通的Object对象
    
     //数组
    Array.prototype[Symbol.iterator];
    //结果：function values(){...}

    //字符串
    String.prototype[Symbol.iterator];
    //结果：function [Symbol.iterator](){...}

    //Set结构
    Set.prototype[Symbol.iterator];
    //结果：function values(){...}

    //Map结构
    Map.prototype[Symbol.iterator];
    //结果：function entries(){...}

    //Object对象
    Object.prototype[Symbol.iterator];
    //结果：undefined
}
```