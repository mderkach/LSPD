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
                cols="4"
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
                cols="4"
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
                cols="4"
              >
                <v-select
                  v-model="sex"
                  :value="sex"
                  :items="sex_types"
                  label="Пол"
                  outlined
                  color="#27f"
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
                  @change="sumFineTypesAndTems"
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="term"
                  :label="term_placeholder"
                  outlined
                  color="#27f"
                  clearable
                  hint="Впишите срок, в зависимости от подсказки по суммарным минимальным и максимальным срокам за совершенные нарушения"
                  persistent-hint
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
                  hint="Формат: дд.мм.ггг"
                  persistent-hint
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
                  color="light-blue text"
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
  import { snack } from '@/mixins/snack'

  export default {
    mixins: [snack],
    data () {
      return {
        editMode: false,
        violation: [],
        violation_types: [],
        violation_fine_amounts: [],
        term: '',
        term_placeholder: 'Срок',
        date: '',
        department: '',
        fine_amount: 0,
        description: '',
        departments: ['LSPD', 'SSPD'],
        sex_types: ['Мужчина', 'Женщина', 'Неизвестно'],
      }
    },
    computed: {
      name: {
        get () {
          return this.$store.state.criminalRecordUserData.name
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_NAME', value)
        },
      },
      surname: {
        get () {
          return this.$store.state.criminalRecordUserData.surname
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_SURNAME', value)
        },
      },
      age: {
        get () {
          return this.$store.state.criminalRecordUserData.age
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_AGE', value)
        },
      },
      sex: {
        get () {
          return this.$store.state.criminalRecordUserData.sex
        },
        set (value) {
          this.$store.commit('SET_CRIMINALRECORD_SEX', value)
        },
      },
    },
    mounted () {
      this.getFineTypes()
      this.getDate()
    },
    methods: {
      submitRecord () {
        let self = this
        console.log(self.violation)
        if (self.sex === 'Мужчина') {
          self.sex_to_submit = 'm'
        } else if (self.sex === 'Женщина') {
          self.sex_to_submit = 'f'
        } else {
          self.sex_to_submit = 'Неизвестно'
        }
        axios.post('http://194.87.144.130:3000/api/lspd_criminalrecord', {
          name: self.name,
          surname: self.surname,
          age: self.age,
          sex: self.sex_to_submit,
          violation: self.violation.toString(),
          term: self.term,
          date: self.date,
          department: self.department,
          fine_amount: self.fine_amount,
          descr: self.description,
        })
          .then(response => {
            self.snack('top', 'Запись успешно сохранена!', '#5cb860')
          })
          .catch(error => {
            console.log(error)
            self.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
          })
      },
      getFineTypes () {
        let self = this
        axios.get('http://194.87.144.130:3000/api/fine_types?_size=100')
          .then(response => {
            let fineData = response.data
            fineData.forEach(item => {
              self.violation_types.push(item.label)
              self.violation_fine_amounts.push(item)
            })
          })
      },
      sumFineTypesAndTems (item) {
        let currentVioaltion = item
        let amounts = []
        let minTerms = []
        let maxTerms = []
        currentVioaltion.forEach(item => {
          let matchedViolations = this.violation_fine_amounts.filter(violation => {
            if (violation.label === item) {
              return violation
            }
          })
          matchedViolations.forEach(item => {
            amounts.push(item.amount)
            minTerms.push(item.detention_min)
            maxTerms.push(item.detention_max)
          })
        })
        this.fine_amount = amounts.reduce((a, b) => a + b, 0)
        if (minTerms.length !== 0 && maxTerms.length !== 0) {
          this.term_placeholder = 'Срок от ' + minTerms.reduce((a, b) => a + b, 0) + ' до ' + maxTerms.reduce((a, b) => a + b)
        } else {
          this.term_placeholder = 'Срок'
        }
      },
      getDate () {
        var currentDate = new Date().toJSON()
        var formattedDate = currentDate.slice(8, 10) + '.' + currentDate.slice(5, 7) + '.' + currentDate.slice(0, 4)
        this.date = formattedDate
      },
    },
  }
</script>
