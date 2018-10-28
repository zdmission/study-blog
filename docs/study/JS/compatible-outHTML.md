# 兼容outHTML

css
```css
div {
    background: #0000FF;
    width: 100px;
    height: 100px;
}

span {
    background: #00FF00;
    width: 100px;
    height: 100px;
}

p {
    background: #FF0000;
    width: 100px;
    height: 100px;
}
```

html
```html
<body>
    <!--<div id="d1"></div>-->
    <div id="a"><span>SPAN</span>DIV</div>
    <span>SPAN</span>
    <p>P</p>
</body>
```

js代码
```js
function getOuterHTML(id) {
    var el = document.getElementById(id);
    var newNode = document.createElement("div");
    document.body.appendChild(newNode);
    var clone = el.cloneNode(true);
    newNode.appendChild(clone);
    document.body.removeChild(newNode);
    return newNode.innerHTML;
}
window.onload = function () { getOuterHTML("a"); }
```