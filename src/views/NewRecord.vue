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
                <v-text-field
                  v-model="violation"
                  label="Нарушение"
                  outlined
                  color="#27f"
                  clearable
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
                <v-text-field
                  v-model="department"
                  label="Ведомство"
                  outlined
                  color="#27f"
                  clearable
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="offense_code"
                  label="Код нарушения"
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
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        name: '',
        surname: '',
        age: '',
        violation: '',
        term: '',
        date: '',
        department: '',
        offense_code: '',
        description: '',
      }
    },
    methods: {
      submitRecord () {
        let self = this
        axios.post('http://194.87.144.130:3000/api/lspd_criminalrecord', {
          name: self.name,
          surname: self.surname,
          age: self.age,
          violation: self.violation,
          term: self.term,
          date: self.date,
          department: self.department,
          offense_code: self.offense_code,
          descr: self.description,
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
  }
</script>
