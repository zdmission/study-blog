# 纯CSS实现switch开关切换

利用 label 标签的for属性，可以做到click点击的效果

html
```html
<input type="checkbox" id="chk" style="display: none;" />
<label for="chk"></label>
```

css样式代码：
```css
label {
			display: inline-block;
			width: 200px;
			height: 100px;
			background: grey;
			border-radius: 50px;
			transition: 1s;
			position: relative;
		}
		input[type=checkbox]:checked + label {
			background: green;
		}
		input[type=checkbox] + label:after {
			content: "";
			display: block;
			position: absolute;
			width: 100px;
			height: 100px;
			border-radius: 50px;
			transition: 1s;
			left:0;
			top: 0;
			background: black;
		}
		input[type=checkbox]:checked + label:after {
			left:100px;
			background: red;
		}

```

下过如下图

![switch](/study/CSS/css-switch.gif)
