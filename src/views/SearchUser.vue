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
        :timeout="900000"
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

  export default {
    data () {
      return {
        foundedUsers: {
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
              text: 'Фамилия',
              value: 'surname',
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
              text: 'Номер ТС',
              value: 'vehicle',
            },
            {
              sortable: false,
              text: 'Собственность',
              value: 'property',
            },
            {
              sortable: false,
              text: 'Профессия',
              value: 'profession',
            },
            {
              sortable: false,
              text: 'Статус',
              value: 'status',
            },
          ],
          users: [
            // {
            //   id: 1,
            //   name: 'Ugly',
            //   surname: 'Mazafaker',
            //   age: 45,
            //   phone: 9379992,
            //   vehicle: 'BAGUVIX',
            //   property: 'ASD QWE',
            //   profession: 'Unemployed',
            //   status: 'Не в розыске',
            // },
          ],
        },
        searchByName: {
          name: '',
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
      findByName () {
        let self = this
        let target = this.searchByName
        let name = target.name
        let surname = target.surname
        let match = []
        axios.get('http://194.87.144.130:3000/api/users')
          .then(function (response) {
            let responseData = response
            let names = responseData.data.filter(item => {
              if (name) {
                return item.firstname === name
              }
              if (surname) {
                return item.lastname === surname
              }
            })

            names.forEach((item, index) => {
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let id = index + 1

              let suspect = {
                id,
                name,
                surname,
                age,
                phone,
                status,
              }

              match.push(suspect)
            })
            self.$store.commit('SET_USER', match)
            if (match.length > 0) {
              self.foundedUsers.users = self.$store.getters.USER
            } else {
              self.snack('top', 'error')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      findByPhone () {
        let self = this
        let target = this.searchByPhone
        let phone = target.phone
        let match = []
        axios.get('http://194.87.144.130:3000/api/users')
          .then(function (response) {
            let responseData = response
            let phones = responseData.data.filter(item => {
              if (phone) {
                return item.phone_number === phone
              }
            })
            phones.forEach((item, index) => {
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let id = index + 1

              let suspect = {
                id,
                name,
                surname,
                age,
                phone,
                status,
              }

              match.push(suspect)
            })
            self.$store.commit('SET_USER', match)
            if (match.length > 0) {
              self.foundedUsers.users = self.$store.getters.USER
            } else {
              self.snack('top', 'error')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
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
    },
  }
</script>
