# ionic datePicher日期选择器的使用
```JS
//日期插件
var datePickerObj = {
    inputDate: new Date(),
    titleLabel: '选择日期',
    setLabel: '设置',
    todayLabel: '今天',
    closeLabel: '取消',
    mondayFirst: true,
    weeksList: ["日", "一", "二", "三", "四", "五", "六"],
    monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    templateType: 'popup',
    from: new Date(1900, 1, 1),
    to: new Date(2099, 12, 31),
    showTodayButton: false,
    dateFormat: 'yyyy-MM-dd',
    closeOnSelect: false,
    //disableWeekdays: []
};
```
但是在日期选择的界面上有一列或者两列是不可以选择的，因为设置了disableWeekdays: []，所以要注释掉，方括号中的值可以0，1或者其他，对应的不可获取值的列数
```JS
disabledDates: [ //Optional
    new Date(2016, 2, 16),
    new Date(2015, 3, 16),
    new Date(2015, 4, 16),
    new Date(2015, 5, 16),
    new Date('Wednesday, August 12, 2015'),
    new Date("08-16-2016"),
    new Date(1439676000000)
],
```

这个也是不可选择的设置，也需要注释掉
