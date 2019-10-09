<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск по имени"
          flat
          full-width
        >
          <v-form>
            <v-row>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="searchByName.name"
                  label="Имя"
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="searchByName.surname"
                  label="Фамилия"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-btn
                  color="secondary"
                  @click="findByName"
                >
                  Найти
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск по номеру телефона"
          flat
          full-width
        >
          <v-form>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="searchByPhone.phone"
                  label="Номер телефона"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
                <v-btn
                  color="secondary"
                  @click="findByPhone"
                >
                  Найти
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск ТС"
          flat
          full-width
        >
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="searchByVehicle.vehicle"
                label="Номер ТС"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn
                color="secondary"
                @click="findByVehicle"
              >
                Найти
              </v-btn>
            </v-col>
          </v-row>
        </material-card>
      </v-col>
      <v-col>
        <material-card
          color="green lighten-1"
          title="Результаты поиска"
          flat
          full-width
        >
          <v-data-table
            :headers="foundedUsers.headers"
            :items="foundedUsers.users"
            hide-default-footer
          >
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="set-criminalrecord"
                    color="error"
                    dark
                    v-on="on"
                    @click="criminalRecord(item)"
                  >
                    <v-icon
                      small
                    >
                      mdi-new-box
                    </v-icon>
                  </v-btn>
                </template>
                <span>Новая запись</span>
              </v-tooltip>
              <v-divider />
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="set-status"
                    color="warning"
                    dark
                    v-on="on"
                  >
                    <v-icon
                      small
                    >
                      mdi-alert
                    </v-icon>
                  </v-btn>
                </template>
                <span>Установить статус</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </material-card>
      </v-col>

      <v-snackbar
        v-model="snackbar"
        :bottom="bottom"
        :color="color"
        :left="left"
        :right="right"
        :top="top"
        :timeout="4000"
        dark
      >
        <v-icon
          color="white"
          class="mr-3"
        >
          mdi-bell-plus
        </v-icon>
        <div>{{ message }}</div>
        <v-btn
          icon
          @click="snackbar = false"
        >
          <v-icon>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  // eslint-disable-next-line
  import { mdiNewBox, mdiAlert } from '@mdi/js'
  import { findUser } from '@/mixins/findUser'
  import { snack } from '@/mixins/snack'
  import { criminalRecord } from '@/mixins/criminalRecord'

  export default {
    mixins: [findUser, snack, criminalRecord],
    data () {
      return {
        foundedUsers: {
          headers: [
            {
              align: 'center',
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Фамилия',
              value: 'surname',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Номер телефона',
              value: 'phone',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Номер ТС',
              value: 'vehicle',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Собственность',
              value: 'property',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Профессия',
              value: 'profession',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Статус',
              value: 'status',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Действия',
              value: 'action',
            },
          ],
          users: [],
        },
      }
    },
    computed: {
      ...mapGetters(['USER']),
    },
    watch: {
      USER (newUser, oldUser) {
        if (newUser.length > 0) {
          this.foundedUsers.users = this.$store.getters.USER
        } else {
          this.snack('top', 'Ошибка! Данные не найдены', 'error')
        }
      },
    },
    mounted () {
      this.foundedUsers.users = this.$store.getters.USER
    },
  }
</script>
