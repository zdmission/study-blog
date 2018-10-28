### Map与Array的对比
```js
{
    // 数据结构横向对比：增、查、改、删
    let map = new Map();
    let array = [];
    
    // 增
    map.set('t',1);
    array.push({t:1});
    
    // 查
    let map_exist=map.has('t');
    let array_exist=array.find(item=>item.t);
    console.info('map-array',map_exist,array_exist);// true Object{t:1}
    
    // 改
    map.set('t',2);
    // 如果存在才去修改
    array.forEach(item=>item.t?item.t=2:'');
    console.info('map-array-modify',map,array);
    // Map(1){t:2} [Object{t:2}]
    
    // 删
    map.delete('t');
    let index=array.findIndex(item=>item.t);
    array.splice(index,1);
    console.info('map-array-empty',map,array);
    // Map() {}      []
    
    // 总之Map操作数据很容易，数组虽然可以实现，但是比较麻烦
}
```
-------
### Set与Array的对比
```js
{
  // set和array的对比
  let set=new Set();
  let array=[];

  // 增
  set.add({t:1});
  array.push({t:1});

  console.info('set-array',set,array);

  // 查
  let set_exist=set.has({t:1});
  //对象意味着是引用，这样的查的话，永远都是 false，如果想返回true，那么这个对象是要被保存过，然后has那个引用即可，let s = {t:1} set.has(s)
  let array_exist=array.find(item=>item.t);
  console.info('set-array',set_exist,array_exist);

  // 改,这样跟数组是一样的，如果add的话，就会是一个新的对象，
  set.forEach(item=>item.t?item.t=2:'');
  array.forEach(item=>item.t?item.t=2:'');
  console.info('set-array-modify',set,array);

  // 删
  set.forEach(item=>item.t?set.delete(item):'');
  let index=array.findIndex(item=>item.t);
  array.splice(index,1);
  console.info('set-array-empty',set,array);
  
  // Set和数组操作都差不多的麻烦
}


```

### Map、Set和Object的对比
```js
{
  // map,set,object对比
  let item={t:1};
  let map=new Map();
  let set=new Set();
  let obj={};

  // 增
  map.set('t',1);
  set.add(item);
  obj['t']=1;

  console.info('map-set-obj',obj,map,set);

  // 查 map、set语义化好些
  console.info({
    map_exist:map.has('t'),
    set_exist:set.has(item),
    obj_exist:'t' in obj
  })

  // 改
  map.set('t',2);
  item.t=2; // set存的是引用
  obj['t']=2;
  console.info('map-set-obj-modify',obj,map,set);

  // 删除 delete方式删除，map、set的语义化好些，map的使用成本最低，set如果没有对数据进行引用的话，删除数据就要用循环的方式删除
  map.delete('t');
  set.delete(item); // 删除引用即可
  delete obj['t'];
  console.info('map-set-obj-empty',obj,map,set);// Object{}   Map(0){}   Set(0){}
  

}

```
### 建议：对于复杂的数据结构，优先使用Map，Set，如果对数据要求比较高，考虑唯一性，使用Set，放弃使用Object，数组