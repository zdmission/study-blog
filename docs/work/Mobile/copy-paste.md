# 复制粘贴功能

**背景：**

更换银行卡功能，由于IOS新包未提审通过，固改用让用户自己下载简理财企业版的包，IOS线上包没有复制功能的字段，所以，前端进行复制，提示用户自行到浏览器中进行下载。

**实现：**

通过查询资料，目前实现较好的一个方法库，clipboard.js，[官网网址](https://clipboardjs.com/)，同时可以通过npm进行安装，下载到本地使用，官网有详细的介绍使用情况。

以下为目前实现逻辑，主要测试范围为IOS，因为IOS版本支持性不太好(安卓同理)，实现的最终思路为，如果支持此方法复制，则完成复制；如果不支持，则用户完成手动复制。


```html
<div class="copy" data-clipboard-text="https://www.pgyer.com/xOMH " id="copy">点击复制</div>
<div id="aa">https://www.pgyer.com/xOMH</div>
<div id="copySuccess"></div>
<script src="../../js/lib/zepto/zepto.min.js "></script>
<script src="../../js/lib/clipboard/clipboard.min.js "></script>
<script>
    //不支持的情况下，选择此文案进行改变背景，让用户明白需要手动复制的内容。
    $("#aa").select(function () {
        $(this).css('background', '#ccc');
    });
    
    //点击进行复制
    $('.copy').click(function (e) {
        e.preventDefault();
        
        //设置此属性值，避免第一次复制不成功
        $(this).attr('data-clipboard-text', 'https://www.pgyer.com/xOMH')
        
        //实例ClipboardJS
        var clipboard = new ClipboardJS('.copy');
        clipboard.on('success', function (e) {
            //IOS>=10复制成功(IOS大于10包括10以上的系统支持)
            $('#copySuccess').html('复制成功');
            //清除选中内容
            e.clearSelection();
            //清除实例
            clipboard.destroy();
            //1秒后，提示消失
            setTimeout(function () {
                $('#copySuccess').html('');
            }, 1000)
            
        });
        clipboard.on('error', function (e) {
            //IOS<10复制失败
            $('#copy').html('复制失败，请将以下链接进行手动复制到浏览器中打开。');
            //改变需要手动选择的内容，提示用户复制此内容
            $('#aa').select();
            //清除实例
            clipboard.destroy();
        });
    });
</script>
```

## 在vue组件中实现

布局
```html
<div class="get-ltc" @click="copyInviteFun" ref="copyInviteText" :data-clipboard-text="selfInfo.invite_code">复制邀请码
    <p class="copy-succ-tips" v-show="copySucc1">复制成功</p>
</div>
```

js代码
```html
<script>
import Clipboard from "clipboard"
export default {
    data() {
        return {
            copySucc1: false, // 复制成功提示窗
            clipboardInvite: null, // 复制框对象
            selfInfo: {}, // 用户个人信息
            timer1: null, // 复制成功倒计时，自动消失
        }
    },
    mounted() {
        // 需要初始化一次复制的函数
        this.copyInviteFun()
    },
    methods: {
        // 复制邀请码
        copyInviteFun() {
            this.clipboardInvite = new Clipboard(this.$refs.copyInviteText)
            this.clipboardInvite.on('success', e => {
                // 释放内存
                this.clipboardInvite.destroy()
                if(e.text == this.selfInfo.invite_code) {
                    this.copySucc1 = true
                }
                clearTimeout(this.timer1)
                this.timer1 = setTimeout(() => {
                    this.copySucc1 = false
                }, 1500)
            })
            this.clipboardInvite.on('error', e => {
                // 释放内存
                this.clipboardInvite.destroy()
                // 不支持复制
                alert('浏览器不支持自动复制，请手动复制微信号')
            })
        }
    }
}
</script>
```
