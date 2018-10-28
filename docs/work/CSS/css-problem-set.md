# CSS布局和应用中遇到的问题集合

## 1.div布局在屏幕的最下边，一行显示不完，省略号表示
``` css
//div布局在屏幕的最下边，一行显示不完，省略号表示
<div style="position: absolute; bottom: 0px; width: 100%">
        <div style="text-align: center">
          <p>Bottom</p>
        </div>
    </div>
// 给段落元素p加上.ellipsis类名
.ellipsis {
    width: 350px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

## 2.洗一个三角形
```css
.test:before{
	content: '';
	position: absolute;
	display: block;
	top: -9px;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #e4e4e4 #E4E4E4 #fff;
	height: 0;
	width: 0;
	font-size: 0;
}
```

## 3.rem布局
```js {8,10,11}
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" id="vp" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<script type="text/javascript">
	    var dpr = window.devicePixelRatio;
	    //document.getElementById("vp").content = document.getElementById("vp").content.replace(/1.0/g, 1/dpr);
		var fontSize = document.documentElement.clientWidth / 7.5;
		document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px";
	</script>
	<style type="text/css">
		html, body {
			padding: 0;
			margin: 0;
			height: 100%;
		}
		#d1 {
			width: 7.5rem;
			height: 2rem;
			background: red;
		}
	</style>
</head>
<body>
<div id="d1"></div>
</body>
</html>
```