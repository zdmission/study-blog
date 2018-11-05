# 网页调用打印机

网页上使用打印机，其实很简单

1.布局自己想要打印的页面，比如这样的
```html
<html>
<head>
    <title>dskfhkdfkd</title>
</head>
<style>
html,body{
	width:100%;
	margin:0;
	padding:0;
}
div{
	width:100%;
	text-align:center;
}
table {
	width:100%;
	text-align:center;
	border:1 solid #000;
}
table tr td{
	text-align:center;
}
</style>
<body>
<div id="box">哈哈哈哈哈</div>
<div id="div1">世界那么大我想去看看
	<table border=1>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
		</tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
			<td>5</td>
		</tr>
	</table>
</div>
<a id="test" href="javascript:void(0)" target="_self">打印</a>
<script>
$("#test").on("click",function(){
			//var bodyHTML=window.document.body.innerHTML;
  // 想要打印的局部页面，所以需要类似下边的赋值
			window.document.body.innerHTML=$("#div1").html();
			// 这个就是调用系统的打印设备
   window.print();
			//window.document.body.innerHTML=bodyHTML;
})
</script>
</body>
</html>
```

2.网页效果如下

![js](/work/JS/print1.png)

3.看看调出的打印页面吧

![js](/work/JS/print2.png)

第二种方式：使用媒体查询，加些控制，比如背景水印。
```css
<style>
@media print{
    /* 不让第一个div在打印的页面内显示 */
    #box{
        display:none;
    }
}
</style>
```

第三种方式：flash，版权维护，内容版权，不会暴露网页地址，审查元素也看不见的