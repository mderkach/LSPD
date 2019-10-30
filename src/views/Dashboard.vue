<template>
  <v-container fluid>
    <v-row>
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
                cols="12"
                lg="6"
              >
                <v-text-field
                  v-model="searchByName.name"
                  label="Имя"
                />
              </v-col>
              <v-col
                cols="12"
                lg="6"
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
      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="red darken-3"
          title="В розыске"
          text="Опасные преступники и пропавшие"
          flat
          full-width
        >
          <v-data-table
            :headers="mostWanted.headers"
            :items="mostWanted.items"
            :items-per-page="5"
            :loading="mostWanted.loading"
            loading-text="Загрузка списка..."
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
              <v-container>
                <v-row
                  class="flex-nowrap"
                  justify="center"
                >
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
                </v-row>
              </v-container>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="green text"
                @click="getMostWanted"
              >
                Загрузить данные
              </v-btn>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="brown darken-1"
          title="Штрафы"
          text="Неоплаченные штрафы"
          flat
          full-width
        >
          <v-data-table
            :headers="debt.headers"
            :items="debt.items"
            :items-per-page="5"
            :loading="debt.loading"
            loading-text="Загрузка списка..."
          >
            <template v-slot:no-data>
              <v-btn
                color="green text"
                @click="getDebt"
              >
                Загрузить данные
              </v-btn>
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
  import axios from 'axios'
  import { mapGetters, mapState } from 'vuex'
  import { findUser } from '@/mixins/findUser'
  import { snack } from '@/mixins/snack'
  import { criminalRecord } from '@/mixins/criminalRecord'
  import { setStatus } from '@/mixins/setStatus'

  export default {
    mixins: [findUser, snack, criminalRecord, setStatus],
    data () {
      return {
        mostWanted: {
          loading: false,
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
              align: 'center',
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Пол',
              value: 'sex',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Номер телефона',
              value: 'phone_number',
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
          items: [],
        },
        debt: {
          loading: false,
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
              text: 'Возраст',
              value: 'age',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Номер телефона',
              value: 'phone_number',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Неоплаченных штрафов',
              value: 'debt_counter',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Общая сумма',
              value: 'amount',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Дата штрафа',
              value: 'date',
            },
          ],
          items: [],
        },
        dialog: false,
      }
    },
    computed: {
      ...mapGetters(['USER']),
      ...mapState(['officer']),
    },
    watch: {
      USER (newUser, oldUser) {
        if (newUser.length > 0) {
          this.$router.push({
            name: 'Поиск личности',
          })
        } else {
          this.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
        }
      },
    },
    mounted () {
      let self = this
      let sid = self.$route.query.sessionid
      axios.get('http://194.87.144.130:3000/api/user_sessionid/' + sid)
        .then(response => {
          let officer = response.data[0].identifier
          self.getOfficer(officer)
        })
    },
    methods: {
      getMostWanted () {
        let self = this
        let mwlist = self.mostWanted.items
        self.mostWanted.loading = true
        axios.get('http://194.87.144.130:3000/api/lspd_mostwanted?_size=100')
          .then(function (response) {
            if (response.data.length !== 0) {
              self.mostWanted.loading = false
              console.log(response.data)
              response.data.forEach((item, index) => {
                item.id = index + 1
                switch (item.sex) {
                  case 'm': {
                    item.sex = 'Мужчина'
                    break
                  }
                  case 'f': {
                    item.sex = 'Женщина'
                    break
                  }
                  default: {
                    item.sex = 'Неизвестно'
                    break
                  }
                }
                mwlist.push(item)
              })
            } else {
              self.mostWanted.loading = false
              self.snack('top', 'Нет актуальных данных', '#FF9800')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getDebt () {
        let self = this
        let debts = this.debt.items
        self.debt.loading = true
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "SELECT u.identifier, u.firstname AS name, u.lastname AS surname, u.phone_number, u.dateofbirth AS age, min(b.`timestamp`) AS tm, DATE_FORMAT(min(b.timestamp),'%d-%m-%Y') as date,(SELECT sum(`amount`) FROM billing WHERE u.identifier = billing.identifier AND target = 'society_police') as amount, (SELECT COUNT(identifier) FROM billing WHERE u.identifier = billing.identifier AND target = 'society_police') as debt_counter FROM users u JOIN billing b on u.identifier = b.identifier WHERE target = 'society_police' GROUP BY u.identifier HAVING tm < DATE_SUB(NOW(), INTERVAL 3 DAY)",
          })
          .then(response => {
            if (response.data.length !== 0) {
              self.debt.loading = false
              response.data.forEach((item, index) => {
                item.name = item.name + ' ' + item.surname
                item.id = index + 1
                debts.push(item)
              })
            } else {
              self.debt.loading = false
              self.snack('top', 'Нет актуальных данных', '#FF9800')
            }
          })
      },
      getOfficer (id) {
        let self = this
        axios.post('http://194.87.144.130:3000/dynamic', {
          query:
            "SELECT job, firstname, lastname FROM users Where identifier = '" + id + "'",
        })
          .then(response => {
            if (response.data[0].job === 'police') {
              console.log(response.data[0])
              self.$store.commit('SET_OFFICER_NAME', response.data[0].firstname)
              self.$store.commit('SET_OFFICER_SURNAME', response.data[0].lastname)
            } else {
              alert('error')
            }
          })
      },
    },
  }
</script>
