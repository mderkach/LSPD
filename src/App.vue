<template>
  <v-app>
    <core-drawer />
    <core-view />
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreView: () => import('@/components/core/View'),
    },
  }
</script>

<style lang="scss">
.v-btn.text {
  color: #fff !important
}
</style>
