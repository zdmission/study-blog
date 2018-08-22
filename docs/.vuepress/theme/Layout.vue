<template>
  <Layout ref="layout">
    <ScrollTop slot="page-bottom"/>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
import ScrollTop from '@default-theme/ScrollTop.vue'

export default {
  components: {
    Layout,
    ScrollTop,
  },

  created () {
    const EVENTS = [
      'sw-ready',
      'sw-cached',
      'sw-updated',
      'sw-offline',
      'sw-error',
    ]
    EVENTS.forEach(name => {
      this.$on(name, (...args) => this.$refs.layout.$emit(name, ...args))
    })
  }
}
</script>
