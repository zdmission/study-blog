<template>
    <!-- <canvas id="canvas" class="canvas" :width="canvasWidth" :height="canvasHeight"></canvas> -->
    <canvas id="canvas" class="canvas"></canvas>
</template>

<script>
export default {
  name: 'RaysLine',
  mounted () {
            import('./canvasline')
  },
  watch: {
    $route (to, from) {
      console.log(to.path)
                import('./canvasline')
    }
  },
  computed: {
    // canvasWidth () {
    //   return !!window && (window.document.documentElement.clientWidth || window.document.body.clientWidth)
    // },
    // canvasHeight () {
    //   return !!window && (window.document.body.scrollHeight || window.document.documentElement.scrollHeight)
    // }
  }
}
</script>

<style lang="stylus">
.canvas
  position absolute
  top 0
  left 0
  z-index -1
</style>
