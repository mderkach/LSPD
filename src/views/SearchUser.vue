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
                label="Номер ТС"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn color="secondary">
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
        <div>Ошибка! Данные не найдены</div>
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
  // eslint-disable-next-line
  import { mdiNewBox, mdiAlert } from '@mdi/js'

  export default {
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
        searchByName: {
          name: '',
          surname: '',
        },
        criminalUser: {
          name: '',
          age: '',
          surname: '',
        },
        searchByPhone: {
          phone: '',
        },
        color: null,
        colors: [
          'purple',
          'info',
          'success',
          'warning',
          'error',
        ],
        top: true,
        bottom: false,
        left: false,
        right: false,
        snackbar: false,
      }
    },
    mounted () {
      this.foundedUsers.users = this.$store.getters.USER
    },
    methods: {
      getUsers () {
        return axios.get('http://194.87.144.130:3000/api/users?_size=64')
      },
      getVehicles () {
        return axios.get('http://194.87.144.130:3000/api/owned_vehicles')
      },
      getProperties () {
        return axios.get('http://194.87.144.130:3000/api/owned_properties')
      },
      findByName () {
        let self = this
        let target = this.searchByName
        let name = target.name
        let surname = target.surname
        let match = []

        axios.all([self.getUsers(), self.getVehicles(), self.getProperties()])
          .then(axios.spread(function (users, vehicles, properties) {
            let usersData = users.data
            let vehiclesData = vehicles.data
            let propertiesData = properties.data

            let names = usersData.filter(item => {
              if (name) {
                return item.firstname === name
              }
              if (surname) {
                return item.lastname === surname
              }
            })

            names.forEach((item, index) => {
              let steamID = item.identifier
              let id = index + 1
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let vehicles = vehiclesData.filter(item => {
                if (item.owner === steamID) {
                  return item
                }
              })
              let vehiclePlates = []
              let vehicle = ''
              vehicles.forEach(item => {
                vehiclePlates.push(item.plate)
                vehicle = vehiclePlates.toString()
              })

              if (vehicles.length === 0) {
                vehicle = 'Нет данных'
              }

              let profession = item.job
              let properties = propertiesData.filter(item => {
                if (item.owner === steamID) {
                  return item
                }
              })
              let propertyAdresses = []
              let property = ''
              properties.forEach(item => {
                propertyAdresses.push(item.name)
                property = propertyAdresses.toString()
              })

              let suspect = {
                steamID,
                id,
                name,
                surname,
                age,
                phone,
                vehicle,
                profession,
                property,
              }

              match.push(suspect)
            })

            self.$store.commit('SET_USER', match)
            if (match.length > 0) {
              self.foundedUsers.users = self.$store.getters.USER
            } else {
              self.snack('top', 'error')
            }
          }
          )
          )
      },
      findByPhone () {
        let self = this
        let target = this.searchByPhone
        let phone = target.phone
        let match = []

        axios.all([self.getUsers(), self.getVehicles(), self.getProperties()])
          .then(axios.spread(function (users, vehicles, properties) {
            let usersData = users.data
            let vehiclesData = vehicles.data
            let propertiesData = properties.data

            let phones = usersData.filter(item => {
              if (phone) {
                return item.phone_number === phone
              }
            })

            phones.forEach((item, index) => {
              let steamID = item.identifier
              let id = index + 1
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let vehicles = vehiclesData.filter(item => {
                if (item.owner === steamID) {
                  return item
                }
              })
              let vehiclePlates = []
              let vehicle = ''
              vehicles.forEach(item => {
                vehiclePlates.push(item.plate)
                vehicle = vehiclePlates.toString()
              })

              if (vehicles.length === 0) {
                vehicle = 'Нет данных'
              }

              let profession = item.job
              let properties = propertiesData.filter(item => {
                if (item.owner === steamID) {
                  return item
                }
              })
              let propertyAdresses = []
              let property = ''
              properties.forEach(item => {
                propertyAdresses.push(item.name)
                property = propertyAdresses.toString()
              })

              let suspect = {
                steamID,
                id,
                name,
                surname,
                age,
                phone,
                vehicle,
                profession,
                property,
              }

              match.push(suspect)
            })

            self.$store.commit('SET_USER', match)
            if (match.length > 0) {
              self.foundedUsers.users = self.$store.getters.USER
            } else {
              self.snack('top', 'error')
            }
          }
          )
          )
      },
      snack (...args) {
        console.log(args)
        this.top = false
        this.bottom = false
        this.left = false
        this.right = false

        for (const loc of args) {
          this[loc] = true
        }

        this.color = args[args.length - 1]

        this.snackbar = true
      },
      criminalRecord (item) {
        this.criminalUser = Object.assign({}, [item.name, item.surname, item.age])

        this.$store.commit('SET_CRIMINALRECORD', this.criminalUser)
        if (Object.keys(this.criminalUser).length) {
          this.$router.push({
            name: 'Новая запись',
          })
        } else {
          this.snack('top', 'error')
        }
      },
    },
  }
</script>
