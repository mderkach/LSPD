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
          :title="criminalRecordUserData.editMode ? 'Обновить запись' : 'Новая запись'"
          flat
          full-width
        >
          <v-form>
            <v-row>
              <v-col
                lg="4"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.name"
                  label="Имя"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                lg="4"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.surname"
                  label="Фамилия"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                lg="4"
                cols="12"
              >
                <v-select
                  v-model="criminalRecordUserData.sex"
                  :value="criminalRecordUserData.sex"
                  :items="sex_types"
                  label="Пол"
                  outlined
                  color="#27f"
                />
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.age"
                  label="Возраст"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-select
                  v-model="criminalRecordUserData.violation"
                  :vale="criminalRecordUserData.violation"
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
                lg="6"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.term"
                  :label="term_placeholder"
                  outlined
                  color="#27f"
                  clearable
                  hint="Впишите срок, в зависимости от подсказки по суммарным минимальным и максимальным срокам за совершенные нарушения"
                  persistent-hint
                />
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.date"
                  label="Дата"
                  outlined
                  color="#27f"
                  clearable
                  hint="Формат: дд.мм.ггг"
                  persistent-hint
                >
                  <template v-slot:append-outer>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="blue"
                          v-on="on"
                          @click="getDate"
                        >
                          <v-icon
                            color="white"
                            small
                          >
                            mdi-calendar-clock
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Установить сегодняшнюю дату</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-select
                  v-model="criminalRecordUserData.department"
                  :items="departments"
                  label="Ведомство"
                  color="#27f"
                  outlined
                  hint="Выберите ведомство, в котором оформляется нарушение (Лос-Сантос или Шерифский департамент)"
                  persistent-hint
                />
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-text-field
                  v-model="criminalRecordUserData.fine_amount"
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
                  v-model="criminalRecordUserData.descr"
                  label="Описание нарушения"
                  outlined
                  clearable
                  full-width
                  auto-grow
                  color="#27f"
                />
              </v-col>
            </v-row>
            <v-row v-if="!criminalRecordUserData.editMode">
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
            <v-row v-else>
              <v-col
                lg="6"
                cols="12"
              >
                <v-btn
                  block
                  color="light-blue text"
                  @click="cancelRecord"
                >
                  Отменить
                </v-btn>
              </v-col>
              <v-col
                lg="6"
                cols="12"
              >
                <v-btn
                  block
                  color="light-blue text"
                  @click="updateRecord"
                >
                  Сохранить изменения
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
  import { criminalRecord } from '@/mixins/criminalRecord'
  import { mapMutations, mapGetters, mapState } from 'vuex'
  // eslint-disable-next-line
  import { mdiCalendarClock } from '@mdi/js'

  export default {
    mixins: [snack, criminalRecord],
    data () {
      return {
        violation_types: [],
        violation_fine_amounts: [],
        term_placeholder: 'Срок',
        departments: ['LSPD', 'SSPD'],
        sex_types: ['Мужчина', 'Женщина', 'Неизвестно'],
      }
    },
    computed: {
      ...mapState(['criminalRecordUserData', 'officer']),
      ...mapGetters([
        'CRIMINALRECORD_EDIT',
        'CRIMINALRECORD_NAME',
        'CRIMINALRECORD_SURNAME',
        'CRIMINALRECORD_AGE',
        'CRIMINALRECORD_VIOLATION',
        'CRIMINALRECORD_TERM',
        'CRIMINALRECORD_DEPARTMENT',
        'CRIMINALRECORD_FINE_AMOUNT',
        'CRIMINALRECORD_DESCR',
        'CRIMINALRECORD_DATE',
      ]),
      ...mapMutations([
        'SET_CRIMINALRECORD_NAME',
        'SET_CRIMINALRECORD_SURNAME',
        'SET_CRIMINALRECORD_AGE',
        'SET_CRIMINALRECORD_VIOLATION',
        'SET_CRIMINALRECORD_TERM',
        'SET_CRIMINALRECORD_DEPARTMENT',
        'SET_CRIMINALRECORD_FINE_AMOUNT',
        'SET_CRIMINALRECORD_DESCR',
        'SET_CRIMINALRECORD_DATE',
      ]),
    },
    mounted () {
      this.getFineTypes()
    },
    methods: {
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
        this.criminalRecordUserData.date = formattedDate
      },
    },
  }
</script>
