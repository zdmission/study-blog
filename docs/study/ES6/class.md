### 类
* 基本语法
* 类的继承
* 静态方法
* 静态属性
* getter
* setter

```js
{
    // 基本定义和生成实例
    class Parent{
        constructor(name='mukewang'){
          this.name=name;
        }
    }
    let v_parent=new Parent('v');
    console.log('构造函数和实例',v_parent);
    //  Person {name:"v"}
}
{
  // 继承
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }

  class Child extends Parent{

  }

  console.log('继承',new Child());
  // _Child {name:"mukewang"}
}

{
  // 继承传递参数
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
  }

  class Child extends Parent{
    constructor(name='child'){
      super(name);
      this.type='child';
      // 定义自己的属性，this一定是在super之后
    }
  }

  console.log('继承传递参数',new Child('hello'));
  // _Child{name:"hello",type:"child"}
}

{
  // getter,setter
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
    // longName是属性，不是函数
    get longName(){
      return 'mk'+this.name
    }

    set longName(value){
      this.name=value;
    }
  }

  let v=new Parent();
  console.log('getter',v.longName); // mkmukewang
  v.longName='hello';// set 操作
  console.log('setter',v.longName);// mkhello
}

{
  // 静态方法
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }
    // static只是定义静态方法
    static tell(){
      console.log('tell');
    }
  }

  Parent.tell();

}

{
  // 静态属性
  class Parent{
    constructor(name='mukewang'){
      this.name=name;
    }

    static tell(){
      console.log('tell');
    }
  }

  //定义静态属性
  Parent.type='test';

  console.log('静态属性',Parent.type);


}

```