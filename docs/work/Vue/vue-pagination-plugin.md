# vue，分页插件编写

```js
/*
 * @Author: zhaobendong 
 * @Date: 2017-11-29 10:40:08 
 * @Last Modified by: zhaobendong
 * @Last Modified time: 2018-10-31 10:43:45
 * @Describetion 分页插件 
 * 参数：newsTotal（总的数据，比如150） newsIndex（当前索引） pageSize（每页的条数）callback（事件，便于子组件向父组件传值）
 */
// 这种方式是全局注册插件
// Vue.component('v-pagination',{
// 这种方式是扩展一个插件，并给与一个变脸保存，在其他组件中引用
var pagination = Vue.extend({
    template: '<style>.fenye,.fenye li{position:relative}.box{display:-webkit-box;display:-moz-box;display:-ms-box;display:-o-box;display:box}.box-flex{-webkit-box-flex:1;-moz-box-flex:1;-ms-box-flex:1;box-flex:1}.box-align-center{-webkit-box-align:center;-moz-box-align:center;-ms-box-align:center;box-align:center}.box-pack-center{-webkit-box-pack:center;-moz-box-pack:center;-ms-box-pack:center;box-pack:center}.box-sizing{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.fenye-wrap{width:100%;padding-bottom:80px}.fenye li{cursor:pointer;width:40px;height:40px;margin-right:6px;text-align:center;line-height:40px;color:#9e9e9e;font-size:14px;border:1px solid #2f3444;border-radius:5px;background:#21273b}.fenye .li-lh{line-height:32px}.fenye .cur{background:#0c5d9c;color:#fffefe;border:none}.fenye .li-common::after{content:"";position:absolute;top:13.5px;left:16.5px;height:13px;width:7px;background:url(./images/prev.png) center center no-repeat}.fenye .li-prev::after{background-image:url(./images/prev.png)}.fenye .li-next::after{background-image:url(./images/next.png)}.fenye .disabled-buttom{cursor:not-allowed}</style>\
    <div v-if="dataSum" class="fenye-wrap">\
    <ul v-if="totalPageFlag" class="fenye box box-pack-center">\
      <li class="li-common li-prev box-sizing" :class="\{disabled-buttom:newsIndex===1}" @click="newsFenye(prev)"></li>\
      <li v-for="item in totalPage10" trackby="$index" class="box-sizing" :class="{cur:$index+1===newsIndex}" @click="newsFenye($index+1)">{{$index+1}}</li>\
      <li class="li-common li-next box-sizing" :class="{disabled-buttom:newsIndex===totalPage10}" @click="newsFenye(next)"></li>\
    </ul>\
    <ul v-else class="fenye box box-pack-center">\
      <li class="li-common li-prev box-sizing" :class="{disabled-buttom:newsIndex===1}" @click="newsFenye(prev)"></li>\
      <li class="box-sizing" :class="{cur:1===newsIndex}" @click="newsFenye(1)">1</li>\
      <li class="box-sizing li-lh" v-if="newsIndex>6">...</li>\
      <li v-for="item in saveNews" trackby="$index" class="box-sizing" :class="{cur:item===newsIndex}" @click="newsFenye(item)">{{item}}</li>\
      <li class="box-sizing li-lh" v-if="newsIndex<totalPage10-5">...</li>\
      <li class="box-sizing" :class="{cur:totalPage10===newsIndex}" @click="newsFenye(totalPage10)">{{totalPage10}}</li>\
      <li class="li-common li-next box-sizing" :class="{disabled-buttom:newsIndex===totalPage10}" @click="newsFenye(next)"></li>\
    </ul>\
  </div>',
    data: function () {
        return {
            prev: 'prev',
            next: 'next',
            saveNews: [2, 3, 4, 5, 6, 7, 8],
            newsTotal: 0,
            newsIndex: 1,
            pageSize: 6
        }
    },
    props: {
        newsTotal: {
            type: Number,
            required: true,
            default: 0
        },
        newsIndex: {
            type: Number,
            required: true,
            default: 1
        },
        pageSize: {
            type: Number,
            required: true,
            default: 6
        }
    },
    ready: function () {
        // this.newsFenye(this.newsIndex);
        this.controlSaveNews();
    },
    methods: {
        newsFenye: function (value) {
            console.log(this.newsTotal, this.newsIndex, this.pageSize)
            var _this = this;
            switch (value) {
                case 'prev':
                    this.newsIndex === 1 ? "" : (function () {
                        _this.newsIndex--;
                        _this.controlSaveNews();
                        _this.getNewsIndex(_this.newsIndex);
                    })();
                    break;
                case 'next':
                    _this.newsIndex === _this.totalPage10 ? "" : (function () {
                        _this.newsIndex++;
                        _this.controlSaveNews();
                        _this.getNewsIndex(_this.newsIndex);
                    })();
                    break;
                default:
                    _this.newsIndex = value;
                    _this.controlSaveNews();
                    console.log(_this.newsIndex);
                    _this.getNewsIndex(_this.newsIndex);
                    break;
            }
        },
        controlSaveNews: function () {
            this.saveNews = [];
            if (this.flagIndex) {
                var start = this.newsIndex - 3,
                    end = this.newsIndex + 4;
                for (var i = start; i < end; i++) {
                    this.saveNews.push(i);
                }
                console.log(1111111111);
            } else {
                if (this.newsIndex < 7) {
                    for (var i = 2; i <= 8; i++) {
                        this.saveNews.push(i);
                    }
                    console.log(22222);
                }
                if (this.newsIndex > this.totalPage10 - 6 && this.totalPage10 > 8) {
                    for (var i = this.totalPage10 - 7; i < this.totalPage10; i++) {
                        this.saveNews.push(i);
                    }
                    console.log(3333);
                }
            }
        },
        getNewsIndex: function (index) {
            this.$emit('callback', index)
        }
    },
    components: {

    },
    computed: {
        flagIndex: function () {
            return this.newsIndex >= 7 && (this.newsIndex + 6) <= this.totalPage10;
        },
        // 向下取整
        flagIndexFloor: function () {
            return Math.floor(this.newsIndex / 2);
        },
        // 向上取整
        flagIndexCeil: function () {
            return Math.floor(this.newsIndex / 2);
        },
        // 判断总页数是否小于10
        totalPageFlag: function () {
            return this.newsTotal / this.pageSize <= 10;
        },
        // 计算总页数
        totalPage10: function () {
            return this.newsTotal % this.pageSize === 0 ? this.newsTotal / this.pageSize : parseInt(this.newsTotal / this.pageSize) + 1;
        },
        // 数据总数大于6条
        dataSum: function () {
            return this.newsTotal >= this.pageSize;
        }
    }
})
```