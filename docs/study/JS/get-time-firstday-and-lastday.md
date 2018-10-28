
# 获取当前时间当月的第一天和最后一天

第一天
```js
function getMonthFirstDay(){
    var date = new Date();
    date.setDate(1);
    return date;
}
```

最后一天
```js
function getMonthLastDay(){
    var date = new Date();
    var year = date.getFullYear();
    // 当前月的下一个月
    var nextMonth = date.getMonth()+1;
    // 当前月下一个月的第一天的毫秒数或者是时间
    var time = new Date(year,nextMonth,1);
    var dayTime = 24*60*60*1000;
    // 当前月下一个月的第一天的niux时间戳减去一天的时间，当然就是上个月的最后一天啦
    return new Date(time-dayTime);
}
```