# JS中的重绘与回流，借鉴他人

### 一、Reflow(渲染)

对于DOM结构中的各个元素都有自己的盒模型，浏览器根据各种样式（浏览器的、开发人员定义的等）来计算，并根据计算结果将元素放到它该出现的位置，这个过程称之为reflow。

reflow会影响到dom的结构渲染，同时会触发repaint，他会改变他本身与所有父辈元素(祖先)，这种开销是非常昂贵的，导致性能下降是必然的，页面元素越多效果越明显。

Repaint(重绘)：当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，浏览器于是便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，这个过程称之为repaint。repaint发生更改时，元素的外观被改变，且在没有改变布局的情况下发生，如改变outline,visibility,background color，不会影响到dom结构渲染。

Reflow 的成本比 Repaint 的成本高得多的多。但Reflow是不可避免的，只能将Reflow对性能的影响减到最小。

#### 什么情况下会触发浏览器的repaint/reflow?

- 1. DOM元素的添加、修改（内容）、删除( Reflow + Repaint) 
- 2. 仅修改DOM元素的字体颜色（只有Repaint，因为不需要调整布局） 
- 3. 应用新的样式或者修改任何影响元素外观的属性 
- 4. Resize浏览器窗口、滚动页面 
- 5. 读取元素的某些属性（offsetLeft、offsetTop、offsetHeight、offsetWidth、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、 getComputedStyle()、currentStyle(in IE))
- 6.改变字体大小
- 7.添加、删除样式表
- 8.内容的改变，如用户在输入框中写字
- 9.激活伪类
- 10.设置style属性

#### 如何避免repaint/reflow?
- 1. 先将元素从document中删除，完成修改后再把元素放回原来的位置 
- 2. 将元素的display设置为”none”，完成修改后再把display修改为原来的值 
- 3. 如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document 
```js
var fragment = document.createDocumentFragment();
fragment.appendChild(document.createTextNode('keenboy test 111'));
fragment.appendChild(document.createElement('br'));
fragment.appendChild(document.createTextNode('keenboy test 222'));
document.body.appendChild(fragment); 
```
- 4. 集中修改样式
    - （1）尽可能少的修改元素style上的属性
    - （2）尽量通过修改className来修改样式
    - （3）通过cssText属性来设置样式值
    ```js
    element.style.width=”80px”; //reflow
    element.style.height=”90px”; //reflow
    element.style.border=”solid 1px red”; //reflow
    // 以上就产生多次reflow，调用的越多产生就越多
    element.style.cssText=”width:80px;height:80px;border:solid 1px red;”; //reflow
    ```
    - （4）缓存Layout属性值
    ```js
    var left=elem.offsetLeft; 多次使用left也就产生一次reflow
    ```
    - （5）设置元素的position为absolute或fixed
    元素脱离标准流，也从DOM树结构中脱离出来，在需要reflow时只需要reflow自身与下级元素 

    - （6）尽量不要用table布局
    table元素一旦触发reflow就会导致table里所有的其它元素 reflow。在适合用table的场合，可以设置table-layout为auto或fixed，这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围
    - （7）避免使用expression,他会每次调用都会重新计算一遍(包括加载页面)
