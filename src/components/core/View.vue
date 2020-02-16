<template>
  <v-content class="grey darken-4">
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    name: 'CoreView',
    metaInfo: () => ({
      title: 'LSPD ChillOut Project',
    }),
  }
</script>
