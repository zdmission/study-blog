# IScroll使用

使用iscroll的条件，只有一个子元素，并且可视窗口的高度比滚动的高度要小，这两个条件缺一不可
IScroll实现区域滚动，横向，纵向都是可以的，一个页面可以加多个iscroll，不会产生冲突

## 1.IScroll使用，自主编写上拉加载下拉刷新

布局方式：
```html
<div class="m-index">
    <div id="header"></div>
    <section id="index-scroll">
        <div>
            <div class="yo-modal">
                <div class="cont">
                    <div class="yo-loading"><i class="yo-ico"></i>
                        <div class="text">加载中...</div>
                    </div>
                </div>
            </div>
            <script id="indexList" type="text/html">
              <div class="head">
                <img src="./images/arrow.png" />
                <span>下拉刷新...</span>
              </div>
                <nav>
                    <h1>10秒钟定制职位</h1>
                    <div>去登录</div>
                </nav>
                <ul>
                    {{each result}}
                    <li>
                        <div><img src="//www.lgstatic.com/{{$value.companyLogo}}"></div>
                        <div>
                            <h2>{{$value.companyName}}</h2>
                            <p>{{$value.positionName}}</p>
                            <span>{{$value.createTime}}</span>
                        </div>
                        <div>{{$value.salary}}</div>
                    </li>
                    {{/each}}
                </ul>
                <div class="foot">
                    <img src="./images/arrow.png"/>
                    <span>上拉加载更多...</span>
                </div>
            </script>
        </div>
    </section>
    <div id="footer"></div>
</div>
```

逻辑代码：
```js
// 添加iscroll
var myScroll = new IScroll(opt.scrollId, {
    probeType: 3,
    mouseWheel: true
});
myScroll.scrollBy(0, -40);
var head = $('.head img'),
    foot = $('.foot img')
myScroll.on('scroll', function () {
  var y = this.y,
      maxY = this.maxScrollY - y;
  if (y >= 0) {
    head = $('.head img');
    var topImgHasClass = head.hasClass('up');
    !topImgHasClass && head.addClass('up');
    return '';
  }
  if (maxY >= 0) {
    foot = $('.foot img');
    var bottomImgHasClass = head.hasClass('down');
    !bottomImgHasClass && foot.addClass('down');
    return '';
  }
});

myScroll.on('scrollEnd', function () {
  // 下拉刷新
  if (this.y >= -40 && this.y < 0) {
    myScroll.scrollTo(0, -40);
    head.removeClass('up');
  } else if (this.y >= 0) {
      head.attr('src', './images/ajax-loader.gif');
      //ajax下拉刷新数据
      ajaxUtil.ajax({
        url: opt.urlRefresh,
        data: {
          pageNo: 1,
          pageSize: 3
        },
        callback: function (res) {
          myScroll.scrollTo(0, -40);
          head.removeClass('up');
          head.attr('src', './images/arrow.png');
          var page = res.content.data.page;
          page.result = page.result.concat(list)
          var html = template(opt.tplId, page)
          opt.tplContainer.html(html)
          list = page.result
      }
    })
  }

  // 上拉加载更多
  var maxY = this.maxScrollY - this.y;
  var self = this
  if (maxY > -100 && maxY < 0) {
      myScroll.scrollTo(0, self.maxScrollY + 100);
      foot.removeClass('down')
  } else if (maxY >= 0) {
    foot.attr('src', './images/ajax-loader.gif');
    // ajax上拉加载数据
    ajaxUtil.ajax({
      url: opt.urlLoadmore,
      data: {
        pageNo: 5,
        pageSize: 3
      },
      callback: function (res) {
        myScroll.scrollTo(0, self.y + 40);
        foot.removeClass('down');
        foot.attr('src', './images/arrow.png');
        var page = res.content.data.page;
        page.result = page.result.concat(list)
        var html = template(opt.tplId, page)
        opt.tplContainer.html(html)
        myScroll.refresh();
        list = page.result
     }
   })
  }
})
```

IScroll中的probeType取值含义：

值为1 滚动不繁忙的时候触发

值为2 滚动时每隔一定时间触发

值为3 每滚动一像素触发一次

## 2.IScroll中有一个infinite，当一个页面加载数据，会使用到下拉刷新上拉加载，数据跟多，页面内的dom节点很多，会造成卡顿，死锁，性能差
**解决方法：** 只显示当前页面内的数据，比较少的展示，把不在页面内的dom节点remove掉

## 3.手机端出现iscroll卡顿，就转到原生