# Generator函数
### Generator函数解决异步编程的方案
* 回调是异步编程的早期解决方式
* Promise也是解决异步编程的
* Generator函数显得更高级一些，next，yield*是Generator函数的一部分，遇到yield就会有停止，如果要进行下一步的话要调用next
* 
-------
```js
{
  // genertaor基本定义 ,genertaor返回的就是一个Iterator接口
  let tell=function* (){
    yield 'a';
    yield 'b';
    return 'c'
  };

  let k=tell();

  console.log(k.next());
  // {"value":"a","done":false}
  console.log(k.next());
  // {"value":"b","done":false}
  console.log(k.next());
  // {"value":"c","done":true}
  console.log(k.next());
  // {"value":undefined,"done":true}
}

{
    // Generator函数和Iterator接口的关系
    // 任意一个对象的Generator函数都是部署在Symbol.iterator这个属性上，从而这个对象有了Iterator接口
    // Generator函数就是一个遍历器生成函数，使用Generator也可以作为遍历器的返回值
    let obj = {};
    obj[Symbol.iterator] = function* (){
        yield 1;
        yield 2;
        yield 3;
    }
    for(let value of obj){
        console.log('value',value);
        // value 1
        // value 2
        // value 3
    }
}

{
    //什么时候Generator函数有他最大的好处呢，那就是状态机，js编程中比较高级的用法
    let state=function* (){
        while(1){
          yield 'A';
          yield 'B';
          yield 'C';
        }
    }
    let status=state();
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    console.log(status.next());
    
    //结果
    {"value":"A","done":false}
    {"value":"B","done":false}
    {"value":"C","done":false}
    {"value":"A","done":false}
    {"value":"B","done":false}
}
```

### ES7中asyns，await，是Generator的语法糖
```js
 {
   let state=async function (){
     while(1){
       await 'A';
       await 'B';
       await 'C';
     }
   }
   let status=state();
   console.log(status.next());
   console.log(status.next());
   console.log(status.next());
   console.log(status.next());
   console.log(status.next());
 }
```

### 实例
```js
{
  // 抽奖的逻辑和次数的分离开的，
  let draw=function(count){
    //具体抽奖逻辑
    console.info(`剩余${count}次`)
  }

  let residue=function* (count){
    while (count>0) {
      count--;
      yield draw(count);
    }
  }

  // 次数是从后端传过来的，不是一个全部变量
  let star=residue(5);
  let btn=document.createElement('button');
  btn.id='start';
  btn.textContent='抽奖';
  document.body.appendChild(btn);
  document.getElementById('start').addEventListener('click',function(){
    star.next();
  },false)
}

{
  // 长轮询
  let ajax=function* (){
    yield new Promise(function(resolve,reject){
      setTimeout(function () {
        resolve({code:0})
      }, 200);
    })
  }

  let pull=function(){
    let genertaor=ajax();
    let step=genertaor.next();
    // 这个value就是Promise实例
    step.value.then(function(d){
      if(d.code!=0){
        setTimeout(function () {
          console.info('wait');
          pull()
        }, 1000);
      }else{
        console.info(d);
      }
    })
  }

  pull();
  
  // 如果服务端返回的code不是0，那么就会一直去轮训，
}
```