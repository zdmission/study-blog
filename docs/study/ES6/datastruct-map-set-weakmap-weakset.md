#### Set 用法
```js
// 可以当做数组去使用，数组本身也算是集合，但是Set集合中的元素是不重复的
{
  let list = new Set();
  list.add(5);
  list.add(7);

  console.log('size',list.size);// 2
}

{
    // Set对数组进行了转换，成为了Set集合
  let arr = [1,2,3,4,5];
  let list = new Set(arr);

  console.log('size',list.size); // 5
}

{
//Set数据是唯一的，添加重复元素不会报错，但是不会生效
  let list = new Set();
  list.add(1);
  list.add(2);
  list.add(1);

  console.log('list',list);// Set类型的1,2

//利用Set的特性，可以数组去重
// 不会做数据类型的转换
  let arr=[1,2,3,1,'2'];
  let list2=new Set(arr);

  console.log('unique',list2); // Set{1,2,3,"2"}
}

{
    let arr=['add','delete','clear','has'];
    let list=new Set(arr);
    
    // 判断有某个元素
    console.log('has',list.has('add'));// true
    
    // 删除某个元素
    console.log('delete',list.delete('add'),list);// Set{'delete','clear','has'}
    
    //清空元素
    list.clear();
    console.log('list',list);//Set{}
}

{
    let arr=['add','delete','clear','has'];
    let list=new Set(arr);
    
    // Set中key，value的值是一样的
    
    for(let key of list.keys()){
        console.log('keys',key);
        // keys add
         // keys delete
          // keys clear
           // keys has
    }
    
    // 默认显示的是value的值
    for(let value of list){
        console.log('value',value);
        // value add
         // value delete
          // value clear
           // value has
    }
    
    for(let value of list.values()){
        console.log('value',value);
        // value add
         // value delete
          // value clear
           // value has
    }
    
    for(let [key,value] of list.entries()){
        console.log('entries',key,value);
        // entries add add
        // entries delete delete
        // entries clear clear
        // entries has has
    }
    
    list.forEach(function(item){console.log(item);})// add delete clear has
}
```
------

#### WeakSet用法,支持的数据类型只能是对象，不能是其他的，严格来说是：具有 iterable 接口的对象，对象是弱引用，它不会检测这个对象有没有在其他地方使用过，意味着不会与垃圾回收机制挂钩上
```js
{
    let weakList=new WeakSet();
    
    let arg={};
    
    weakList.add(arg);
    
    // weakList.add(2); //不允许其他的数据类型，除了对象
    否则报错Invalid value sued in weak set
    
    console.log('weakList',weakList);
    //WeakSet结构不可遍历，因为成员变量都是对象的弱引用，随时被垃圾回收机制回收，所以WeakSet 结构不会有keys( )，values( )，entries( )，forEach( )等方法和size属性，不能使用clear
    
    // 其他的几个方法和Set是一样的
}
```
------

#### Map用法---遍历和Set是一样的，map中set是可以级联操作的
```js
// key 值可以是任意数据类型
{
    // 第一种定义方式
    let map = new Map();
    let arr=['123'];
    
    // 用数组作为key
    map.set(arr,456);
    
    console.log('map',map,map.get(arr));
    // map Map{["123"]=>456} 456
}

{
    // 第二种定义方式和格式
    let map = new Map([['a',123],['b',456]]);
    console.log('map args',map);
    // 结果 map args  Map{"a"=>123,"b"=>456}
    
    console.log('size',map.size);// 2
    
    console.log('delete',map.delete('a'),map);
    // 结果是 Map{"b"=>456}
    
    console.log('clear',map.clear(),map);// Map{}
    
}
```
------

#### WeakMap用法
##### WeakMap结构和Map结构很类似，不同点在于WeakMap结构的键名只支持引用类型的数据，比如数组、对象、函数

##### 跟Map一样，WeakMap也拥有get、has、delete方法，用法和用途都一样。不同地方在于，WeakMap不支持clear方法，不支持遍历，也就没有了keys、values、entries、forEach这4个方法，也没有属性size。
##### 理由跟WeakSet结构一样：键名中的引用类型是弱引用，你永远不知道这个引用对象什么时候会被垃圾回收机制回收了，如果这个引用类型的值被垃圾机制回收了，WeakMap实例中的对应键值对也会消失
```js

{
  let weakmap=new WeakMap();

  let o={};
  weakmap.set(o,123);
  console.log(weakmap.get(o)); // 123
}

{
    let wm = new WeakMap();

    //数组类型的键名
    wm.set([1],2);

    //对象类型的键名
    wm.set({'name':'Zhangsan'},2);

    //函数类型的键名
    function fn(){};
    wm.set(fn,2);

    console.log(wm);
    //打印：WeakMap {
            [1] => 2, 
            Object {name: "Zhangsan"} => 2, 
            function => 2
            }
}
```
------