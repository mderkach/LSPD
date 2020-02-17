<template>
  <div class="wrapper">
    <img
      class="monitor"
      src="./assets/monitor.png"
      alt=""
    >
    <v-app>
      <core-drawer />
      <core-view />
    </v-app>
  </div>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreView: () => import('@/components/core/View'),
    },
    mounted () {
      if (process.env.NODE_ENV !== 'production') {
        console.log('development mode')
        document.querySelector('body').classList.add('active')
      } else {
        console.log('mounted dashboard')
        window.addEventListener('message', event => {
          console.log(event.data)
          if (event.data.show_dashboard === 1) {
            document.querySelector('body').classList.add('active')
          }
          if (event.data.show_dashboard === 0) {
            document.querySelector('body').classList.remove('active')
          }
        })
      }
    },
  }
</script>

<style lang="scss">
.v-btn.text {
  color: #fff !important
}
html {
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}

body {
  display: none;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  &.active {
    display: flex;
  }
}

.wrapper {
  position: relative;
  width: 96vw;
  height: 96vh;
  padding: 14px;
  border-radius: 15px;
  overflow: hidden;

  .monitor {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #app {
    height: 100%;

    .v-application--wrap {
      min-height: 100%
    }

    main {
      height: 100%;
    }
  }
}
</style>
