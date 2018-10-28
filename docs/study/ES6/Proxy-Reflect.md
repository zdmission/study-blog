# Proxy和Reflect的用法

## Proxy的用法
```js
{
    // 供应商，原始对象，存储真实的数据
     let obj={
        time:'2017-03-11',
        name:'net',
        _r:123
    };

    // 创建一个代理商,通过Proxy新生成一个对象monitor，代理obj的读写操作，用户访问的是monitor,不是直接操作obj这个对象
    let monitor = new Proxy(obj,{
        // 拦截对象属性的读取
        get(target,key){
            //通过代理把obj中的time的值中2017替换成了2018
            return target[key].replace('2017','2018');
        },
        //拦截对象设置属性的值
        set(target,key,value){
            if(key === 'name'){
                return target[key] = value;
            }else{
                return target[key];
            }
        },
        // 拦截key in object操作，判断有什么属性
        has(target,key){
            if(key === 'name'){
                return target[key];
            }else{
                return false;
            }
        },
        // 拦截delete
        deleteProperty(target,key){
            // 删除带有下划线的属性
            if(key.indexOf('_')>-1){
                delete target[key];
                return true;
            }else{
                return target[key];
            }
        },
        //拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
        ownKeys(target){
            // key是time的就过滤掉
            return Object.keys(target).filter(item=>itme!='time');
        }
    });
    console.log('get',monitor.time);// get 2018-03-11
    
    monitor.time = '2018';
    monitor.name = 'haha';
    console.log('set',monitor.time);// set 2018-03-11
    
    console.log(monitor);// Proxy{time:'2017-03-11', name:'haha',
        _r:123}
        
    console.log('has','name' in monitor,'time' in monitor);// has true false
    // 通过代理我们欺骗了用户，time属性肯定是obj的，但是我们过滤了，只暴露了name属性
    
    //删除某些属性
    delete monitor.time;
    console.log('delete',monitor);//结果是 Proxy{time:'2017-03-11', name:'haha',
        _r:123}
    
    delete monitor._r;
    console.log('delete',monitor);
    // 结果是 Proxy{time:'2017-03-11', name:'haha'}
    
    console.log('ownKeys',monitor);
    // ["name","_r"]
}
```
------
## Reflect的用法,不用new，而是直接使用，类似于对象的调用
```js
{
    let obj={
        time:'2017-03-11',
        name:'net',
        _r:123
    };
    console.log('Reflect get',Reflect.get(obj,'time'));// 2017-03-11
    
    Reflect.set(obj,'name','找');
    console.log(obj);//结果是 Proxy{time:'2017-03-11', name:'找',
        _r:123}
    console.log('has',Reflect.has(obj,'name'));// true
}

```
--------
### 通用方式使用,利用Proxy和Reflect做一个校验器

```js
{
    // 该函数提供代理的功能
    function validator(target,validator){
        return new Proxy(target,{
            _validator:validator,
            set(target,key,value,proxy){
                if(target.hasOwnProperty(key)){
                    let va=this._validator[key];
                    if(!!va(value)){
                        // 代理把数据真实的反应到对象上
                        return Reflect.set(target,key,value,proxy)
                    }else{
                        throw Error(`不能设置${key}到${value}`)
                    }
                }else{
                    throw Error(`${key} 不存在`)
                }
            }
        })
    }
    
    
    //设置过滤选项，校验的条件
    const personValidator = {
        name(val){
            return typeof val === 'string'
        },
        age(val){
            return typeof val === 'number' && val>18
        },
        mobile(val){
        
        }
    }
    
    class Person{
        constructor(name,age){
          this.name=name;
          this.age=age;
          this.mobile='1111';
          // 返回了一个proxy对象，代理了person对象，this就是Person的实例,返回的是对this的代理，属性就不能任意的修改了
          return validator(this,personValidators)
        }
  }
  
    const person=new Person('lilei',30)
    console.info(person);// 结果是 Proxy{name:'lilei',age:30}

    //person.name = 48;
    // 会跑出一个错误 ，不能设置name到48
    
    person.name = 'Han mei mei';
    console.info(person);// 结果是 Proxy{name:'Han mei mei',age:30}
}
```
