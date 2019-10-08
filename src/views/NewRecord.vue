<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="10"
      >
        <material-card
          color="#27f"
          title="Новая запись"
          flat
          full-width
        >
          <v-form>
            <v-row>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="name"
                  :value="name"
                  label="Имя"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="surname"
                  label="Фамилия"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="age"
                  label="Возраст"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-select
                  v-model="violation"
                  :items="violation_types"
                  label="Нарушение"
                  multiple
                  outlined
                  color="#27f"
                  chips
                  small-chips
                  hint="Выберите одно или несколько"
                  persistent-hint
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="term"
                  label="Срок"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="date"
                  label="Дата"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-select
                  v-model="department"
                  :items="departments"
                  label="Ведомство"
                  color="#27f"
                  outlined
                  hint="Выберите ведомство, в котором оформляется нарушение (Лос-Сантос или Шерифский департамент)"
                  persistent-hint
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="fine_amount"
                  label="Размер взыскания"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                  v-model="description"
                  label="Описание нарушения"
                  outlined
                  clearable
                  full-width
                  auto-grow
                  color="#27f"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-btn
                  block
                  color="#27f"
                  dark
                  @click="submitRecord"
                >
                  Добавить
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
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

  export default {
    data () {
      return {
        violation: [],
        violation_types: [],
        violation_fine_amounts: [],
        term: '',
        date: '',
        department: '',
        fine_amount: 0,
        description: '',
        color: null,
        colors: [
          'purple',
          'info',
          'success',
          'warning',
          'error',
        ],
        departments: ['LSPD', 'SSPD'],
        top: true,
        bottom: false,
        left: false,
        right: false,
        snackbar: false,
        message: false,
      }
    },
    computed: {
      name: {
        get () {
          return this.$store.state.criminalRecordUserData[0]
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_NAME', value)
        },
      },
      surname: {
        get () {
          return this.$store.state.criminalRecordUserData[1]
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_SURNAME', value)
        },
      },
      age: {
        get () {
          return this.$store.state.criminalRecordUserData[2]
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_AGE', value)
        },
      },
    },
    mounted () {
      this.getFineTypes()
    },
    methods: {
      submitRecord () {
        let self = this
        console.log(self.violation)
        axios.post('http://194.87.144.130:3000/api/lspd_criminalrecord', {
          name: self.name,
          surname: self.surname,
          age: self.age,
          violation: self.violation.toString(),
          term: self.term,
          date: self.date,
          department: self.department,
          fine_amount: self.fine_amount,
          descr: self.description,
        })
          .then(response => {
            self.snack('top', 'Запись успешно сохранена!', 'success')
          })
          .catch(error => {
            self.snack('top', 'Ошибка! Данные не найдены', 'error')
          })
      },
      getFineTypes () {
        let self = this
        axios.get('http://194.87.144.130:3000/api/fine_types?_size=100')
          .then(response => {
            let fineData = response.data
            fineData.forEach(item => {
              let amountData = {
                id: item.id,
                label: item.label,
                amount: item.amount,
              }
              self.violation_types.push(item.label)
              self.violation_fine_amounts.push(amountData)
            })
          })
      },
      snack (...args) {
        this.top = false
        this.bottom = false
        this.left = false
        this.right = false
        this.message = false
        for (const loc of args) {
          this[loc] = true
        }

        this.color = args[args.length - 1]
        this.message = args[args.length - 2]
        this.snackbar = true
      },
    },
  }
</script>
