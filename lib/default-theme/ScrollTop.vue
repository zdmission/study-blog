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
      window.scrollTo(0, 0)
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
  right 50px
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
