# 元素拖拽效果插件

```js

//draggable({target: ele, x:true, y:true});

function draggable(options){
	var target = options.target;
	var range = options.range || document.documentElement;
	var absPos = offsetPagePosition(target);
	target.style.position = "absolute";
	target.style.left = absPos.x + "px";
	target.style.top = absPos.y + "px";
	var move = null;
	target.addEventListener("mousedown", function(e){
		var e = e || event;
		var posDown = {x:e.offsetX, y:e.offsetY};
		move = function(e){
			var e = e || event;
			var parentRange = offsetPagePosition(range);
			if(options.x){
				target.style.left = Math.max(parentRange.x, Math.min(e.clientX - posDown.x, parentRange.x+range.offsetWidth-target.offsetWidth) ) + "px";
			}
			if(options.y){
				target.style.top = Math.max(parentRange.y, Math.min(e.clientY - posDown.y, parentRange.y+range.offsetHeight-target.offsetHeight) )  + "px";
			}
		}
		document.addEventListener("mousemove", move);
	});
	document.addEventListener("mouseup", function(e){
		document.removeEventListener("mousemove", move);
	})
}

/** 计算元素在页面上的绝对位置 */
function offsetPagePosition(ele){
	var _left = ele.offsetLeft;
	var _top = ele.offsetTop;
	while(ele.offsetParent){
		_left += ele.offsetParent.offsetLeft;
		_top += ele.offsetParent.offsetTop;
		ele = ele.offsetParent;
	}
	return { "x":_left, "y":_top };
}
```
