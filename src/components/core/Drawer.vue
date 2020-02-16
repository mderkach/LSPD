<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    color="#27f"
    dark
    mobile-break-point="991"
    persistent
    :width="isAuthorised ? '215' : '100%'"
    height="100%"
  >
    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="../../../src/assets/LSPD.png"
          height="100%"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title
        class="title"
      >
        LSPD
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-col
      v-if="!isAuthorised"
      class="justify-center d-flex"
      cols="12"
    >
      <v-btn
        x-large
        color="success"
        dark
        @click="authorise"
      >
        Войти в систему
      </v-btn>
    </v-col>

    <v-list-item
      v-if="isAuthorised"
    >
      <v-list-item-title>
        Добро пожаловать, <br>
        {{ officer.name }} {{ officer.surname }}
      </v-list-item-title>
    </v-list-item>

    <v-divider
      v-if="isAuthorised"
      class="mx-3 my-3"
    />

    <v-list
      v-if="isAuthorised"
      nav
    >
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list nav>
        <v-list-item
          @click="closeDashboard"
        >
          <v-list-item-action>
            <v-icon>mdi-close</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-light">
            Закрыть
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState,
  } from 'vuex'
  import axios from 'axios'
  import { auth } from '@/mixins/auth'

  export default {
    mixins: [auth],
    props: {
      opened: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: 'Сводка',
        },
        {
          to: '/searchuser',
          icon: 'mdi-account',
          text: 'Поиск личности',
        },
        {
          to: '/newrecord',
          icon: 'mdi-account-card-details',
          text: 'Новое дело',
        },
        {
          to: '/archive',
          icon: 'mdi-folder-account',
          text: 'Архив',
        },
      ],
    }),

    computed: {
      ...mapState('app', ['color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        },
      },
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      closeDashboard () {
        axios.post('http://ems_dashboard/NUIClose', JSON.stringify({}))
      },
    },
  }
</script>

<style lang="scss">
#app-drawer {
  position: absolute;
}
</style>
