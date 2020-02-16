<template>
  <div class="wrapper">
    <img
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
        document.querySelector('#app').classList.add('active')
      } else {
        window.addEventListener('message', event => {
          console.log(event.data)
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
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.wrapper {
  position: relative;
  width: 96vw;
  height: 96vh;
  padding: 14px;
  border-radius: 15px;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #app {
    display: none;
    height: 100%;

    &.active {
      display: flex;
    }

    .v-application--wrap {
      min-height: 100%
    }

    main {
      height: 100%;
    }
  }
}
</style>
