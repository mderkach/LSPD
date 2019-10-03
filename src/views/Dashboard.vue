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
          />
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
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        mostWanted: {
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
              text: 'Статус',
              value: 'status',
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
        searchByName: {
          name: '',
          surname: '',
        },
        searchByPhone: {
          phone: '',
        },
      }
    },
    mounted () {
      this.getMostWanted()
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      getMostWanted () {
        let mwlist = this.mostWanted.items
        axios.get('http://194.87.144.130:3000/api/users')
          .then(function (response) {
            let responseData = response
            responseData.data.forEach((item, index) => {
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let id = index + 1
              let status = 'Не в розыске'

              let suspect = {
                id,
                name,
                surname,
                age,
                phone,
                status,
              }

              mwlist.push(suspect)
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      findByName () {
        let target = this.searchByName
        let name = target.name
        let surname = target.surname
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
            console.log(names)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      findByPhone () {
        let target = this.searchByPhone
        let phone = target.phone
        axios.get('http://194.87.144.130:3000/api/users')
          .then(function (response) {
            let responseData = response
            let phones = responseData.data.filter(item => {
              if (phone) {
                return item.phone_number === phone
              }
            })
            console.log(phones)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
  }
</script>
