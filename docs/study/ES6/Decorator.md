## Decorator修饰器是一个函数，用来修改类的行为
* 修饰器是一个函数
* 修改行为，扩展类的功能
* 修改类的行为，只在类的范围中有用
* 需要安装一个plugin，npm i babel-plugin-transform-decorators-legacy -D
* 修改babelrc文件{"plugins":["transform-decorators-legacy"]}
* 
------

```js
{
    // 定义某个属性是只读的,
    // 修改类本身target，修改了类什么属性name，该属性的描述对象descriptor
    let readonly = function(target,name,descriptor){
       descriptor.writable = false;
       return descriptor;
    }
    class Test{
        @readonly
        time(){
            return '2017-11-24';
        }
    }
    
    let test=new Test();
    console.log(test.time());// 2017-11-24
    
    //修改 time 的值
    test.time=function(){
        console.log('reset time');
    };
    // 直接报错，Uncaught TypeError: Cannot assign to read only property 'time' of object '#<Test>'
    // 意思不会允许一个只读属性的方法去重新被赋值,不加修饰器的话，是可以修改的
  console.log(test.time());
}

{
    //在类的里面进行操作是可以的，那可不可以在类的外边操作呢，答案是可以的，但是一定是在class的前面，否则就报错
    let typename = function(target,name,descriptor){
        // myname其实类的静态属性
       target.myname = 'hello';
    }
    
    @typename
    class Test{
        
    }
    console.log('类修饰符',Test.myname);//类修饰符 hello 
  // 第三方库修饰器的js库，很多常规的修饰器都有：
  // core-decorators; npm install core-decorators
}

{
    // 埋点
    let log=(type)=>{
    return function(target,name,descriptor){
      let src_method=descriptor.value;
      descriptor.value=(...arg)=>{
        src_method.apply(target,arg);
        console.info(`log ${type}`);// 埋点后执行
      }
    }
  }

  class AD{
    @log('show')
    show(){
      console.info('ad is show')
    }
    @log('click')
    click(){
      console.info('ad is click');
    }
  }

  let ad=new AD();
  ad.show();
  // ad is show
  // log show
  
  ad.click();
  // ad is click
  // log click

  // 这样写把埋点都抽离出来，成为一个可复用的模块，以后埋点的接口变了，只需要修改log里面就可以了，另一个则是，业务代码的简洁性可维护性就很高了
  // 利用修饰器把代码写的更简洁，高复用
}
```
