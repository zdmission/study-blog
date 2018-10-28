# 随机生成某列*某行的不同颜色的表格

如图所示

![js](/study/JS/table.png)

js代码
```js
onload = function () {
        var btn = document.getElementById("shengcheng");
        btn.onclick = function () {
            var row = document.getElementById("row").value;
            var col = document.getElementById("col").value;
            var table = document.createElement("table");
            table.style.border = "solid 1px black";
            document.body.appendChild(table);
            for (var i = 0; i < Number(row); i++) {
                  var tr = document.createElement("tr");
                  for (var j = 0; j < Number(col); j++) {
                        var td = document.createElement("td");
                        td.innerHTML = Math.round(Math.random() * 100);
                        td.style.background = randomColor();
                        td.style.border = "solid 1px black";
                        td.onclick = function () {
                              //                                this.parentNode.remove();
                              this.parentNode.parentNode.removeChild(this.parentNode)
                        }
                        tr.appendChild(td);
                  }
                  table.appendChild(tr);
            }
        }

        function randomColor() {
            var R = Math.floor(Math.random() * 256).toString(16);
            var G = Math.floor(Math.random() * 256).toString(16);
            var B = Math.floor(Math.random() * 256).toString(16);
            return "#" + (R.length < 2 ? "0" + R : R) + (G.length < 2 ? "0" + G : G) + (B.length < 2 ? "0" + B : B);
        }
}
```