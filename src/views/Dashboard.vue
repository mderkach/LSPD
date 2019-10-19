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
            :headers="fee.headers"
            :items="fee.items"
            hide-default-footer
          />
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
  import { mapGetters } from 'vuex'
  import { findUser } from '@/mixins/findUser'
  import { snack } from '@/mixins/snack'
  import { criminalRecord } from '@/mixins/criminalRecord'
  import { setStatus } from '@/mixins/setStatus'

  export default {
    mixins: [findUser, snack, criminalRecord, setStatus],
    data () {
      return {
        mostWanted: {
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
              text: 'Номер телефона',
              value: 'phone',
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
        fee: {
          headers: [
            {
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              sortable: false,
              text: 'Номер телефона',
              value: 'phone',
            },
            {
              sortable: false,
              text: 'Неоплаченных штрафов',
              value: 'unpayed',
            },
            {
              sortable: false,
              text: 'Общая сумма',
              value: 'total',
            },
          ],
          items: [
            {
              id: 1,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
              unpayed: '2',
              total: '10 000',
            },
            {
              id: 2,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
              unpayed: '4',
              total: '500',
            },
          ],
        },
        dialog: false,
      }
    },
    computed: {
      ...mapGetters(['USER']),
    },
    watch: {
      USER (newUser, oldUser) {
        if (newUser.length > 0) {
          this.$router.push({
            name: 'Поиск личности',
          })
        } else {
          this.snack('top', 'Ошибка! Данные не найдены', 'error')
        }
      },
    },
    mounted () {
      this.getMostWanted()
    },
    methods: {
      getMostWanted () {
        let mwlist = this.mostWanted.items
        axios.get('http://194.87.144.130:3000/api/lspd_mostwanted?_size=100')
          .then(function (response) {
            let responseData = response.data
            responseData.forEach((item, index) => {
              let id = index + 1
              let identifier = item.identifier
              let name = item.name
              let surname = item.surname
              let age = item.age
              let phone = item.phone_number
              let wanted = item.wanted

              let suspect = {
                identifier,
                id,
                name,
                surname,
                age,
                phone,
                wanted,
              }
              mwlist.push(suspect)
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
  }
</script>

<style lang="scss">
.text {
  color: #fff !important
}
</style>
