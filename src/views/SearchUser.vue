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
                  color="green text"
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
                  color="green text"
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
                color="green text"
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
            <template v-slot:top>
              <v-dialog
                v-model="dialog"
                max-width="20vw"
              >
                <v-card>
                  <v-container>
                    <v-row class="align-center">
                      <v-col cols="10">
                        <v-card-title class="py-0">
                          Установите статус
                        </v-card-title>
                      </v-col>
                      <v-col cols="2">
                        <v-btn
                          text
                          icon
                          @click="closeDialog"
                        >
                          <v-icon
                            small
                          >
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-card-text>
                          <v-select
                            v-model="status"
                            :items="statusItems"
                            outlined
                            @change="changeStatus"
                          />
                          <v-btn
                            block
                            color="light-blue text"
                            @click="saveStatus"
                          >
                            Установить
                          </v-btn>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    color="#D50000"
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
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    color="#F57C00"
                    v-on="on"
                    @click="setStatus(item)"
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
            <template v-slot:no-data>
              Нет данных. Осуществите поиск, используюя инструменты выше
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
  import { mdiNewBox, mdiAlert, mdiClose } from '@mdi/js'
  import { findUser } from '@/mixins/findUser'
  import { snack } from '@/mixins/snack'
  import { criminalRecord } from '@/mixins/criminalRecord'
  import { setStatus } from '@/mixins/setStatus'

  export default {
    mixins: [findUser, snack, criminalRecord, setStatus],
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
              value: 'wanted',
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
          this.foundedUsers.users = this.$store.state.user
        } else {
          this.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
        }
      },
    },
    mounted () {
      this.foundedUsers.users = this.$store.state.user
    },
  }
</script>
