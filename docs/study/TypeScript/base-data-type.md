# TypeScript基本数据类型

## Boolean 布尔
```ts
//var isBoon:boolean;
//var isBoon:boolean = false;
var isBoon:boolean=true;
function tell(){
    alert(isBoon);
}
tell();//如果没有赋初值，那么结果是undefined，反之，则会弹出相应的值
```

## Number
```ts
var num:number=10;
function tell(){
    num++;
    alert(num);
}
tell();//结果是10
```

## String 字符串
```ts
var str:string='zhaodong';
function tell(){
    str='hello '+str;
    alert(str);
}
tell();//结果是hello zhaodong
```

## Array 数组
```ts
var list:number[] = [1,2,3];
// var list:Array<string> = ['nihao','shijie','xy'];
function tell(){
   for(var i=0;i<list.length;i++)
   alert(list[i]);//分别弹出nihao，shijie，xy
}
tell();
```
## Enum 枚举
```ts
//enum Color {red,green,blue};
//var colorName:string = Color[0];//索引从0开始，故这个值应该是red
//var colorName:string = Color[1];//索引从0开始，故这个值应该是green
//var colorName:string = Color[2];//索引从0开始，故这个值应该是blue
enum Color {red=5,green=10,blue=20};
var colorName:string = Color[20];//故这个值应该是blue
function tell(){
    alert(colorName);
}
tell();

//获取下标
enum Color {red,green,blue};
var c:Color = Color.green;//故这个值应该是blue
function tell(){
    alert(c);
}
tell();//结果是1，green所在的位置下表是1
```

## Any
```ts
var notSure:any = 10;
//notSure = 'hello';
//notSure = false;
var list:any[] = [1,'hello',false];
function tell(){
    //alert(notSure);
    alert(list[2]);//false
}
tell();
Void
function tell():string{
    return 'hello';
}
function say():number{
    return 10;
}
//void是不需要返回值得，js不会报错
function tell1():void{}
```