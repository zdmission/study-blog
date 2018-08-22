<template>
    <transition name="loading-fade">
        <div class="scroll-top-wrap" v-show="show" @click="goToTop">
            Top
        </div>
    </transition>
</template>

<script>
export default {
  name: 'ScrollTop',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.onscroll = () => {
      // 变量dis是滚动条滚动时，距离顶部的距离
      const dis = document.documentElement.scrollTop || document.body.scrollTop
      // 当滚动到距离顶部200px时，返回顶部的锚点显示
      if (dis >= 200) {
        this.show = true
      } else {          // 恢复正常
        this.show = false
      }
    }
  },
  methods: {
    goToTop () {
      // 回到顶部加一个缓动动画
      const timer = setInterval(() => {
        let dis = document.documentElement.scrollTop || document.body.scrollTop, speed = dis / 4
        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed
        } else {
          document.documentElement.scrollTop -= speed
        }
        if (dis == 0) {
          clearInterval(timer)
        }
      }, 30)
    }
  }
}
</script>

<style lang="stylus">
@import "~@default-theme/styles/config.styl"
.scroll-top-wrap
  position fixed
  height 50px
  width 50px
  bottom 50px
  right 25px
  background-color #e5e5ee
  text-align center
  line-height 50px
  border-radius 10px
  z-index 100
.loading-fade-enter-active
.loading-fade-leave-active
  transition opacity .5s
.loading-fade-enter
.loading-fade-leave-to
  opacity 0
</style>
