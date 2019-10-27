import axios from 'axios'

export const criminalRecord = {
  data () {
    return {
      criminalUser: {
        editMode: false,
        name: '',
        surname: '',
        age: 0,
        sex: 'Неизвестно',
        sex_to_submit: '',
        department: '',
        date: '',
        fine_amount: 0,
        violation: '',
        descr: '',
        term: 0,
      },
    }
  },
  methods: {
    criminalRecord (item) {
      this.criminalUser.name = item.name
      this.criminalUser.surname = item.surname
      this.criminalUser.age = item.age
      this.criminalUser.sex = item.sex
      this.$store.commit('SET_CRIMINALRECORD', this.criminalUser)
      if (Object.keys(this.criminalUser).length) {
        this.$router.push({
          name: 'Новая запись',
        })
      } else {
        this.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
      }
    },
    submitRecord () {
      let self = this
      let target = self.criminalRecordUserData
      console.log(self.criminalUser, self.criminalRecordUserData)
      if (target.sex === 'Мужчина') {
        self.sex_to_submit = 'm'
      } else if (target.sex === 'Женщина') {
        self.sex_to_submit = 'f'
      } else {
        self.sex_to_submit = 'Неизвестно'
      }
      axios.post('http://194.87.144.130:3000/api/lspd_criminalrecord', {
        name: target.name,
        surname: target.surname,
        age: target.age,
        sex: self.sex_to_submit,
        violation: target.violation.toString(),
        term: target.term,
        date: target.date,
        department: target.department,
        fine_amount: target.fine_amount,
        descr: target.descr,
      })
        .then(response => {
          self.snack('top', 'Запись успешно сохранена!', '#5cb860')
        })
        .catch(error => {
          console.log(error)
          self.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
        })
    },
    updateRecord () {
      let self = this
      let target = self.criminalRecordUserData
      if (target.sex === 'Мужчина') {
        self.sex_to_submit = 'm'
      } else if (target.sex === 'Женщина') {
        self.sex_to_submit = 'f'
      } else {
        self.sex_to_submit = 'Неизвестно'
      }
      axios
      .post('http://194.87.144.130:3000/dynamic', {
        query:
          "UPDATE lspd_criminalrecord SET name ='" + target.name + "', surname = '" + target.surname + "', age = '" + target.age + "', sex ='" + self.sex_to_submit + "', violation ='" + target.violation.toString() + "', term ='" + target.term + "', date ='" + target.date + "', department ='" + target.department + "', fine_amount='" + target.fine_amount + "', descr='" + target.descr + "'",
      })
        .then(response => {
          self.snack('top', 'Запись успешно обновлена!', '#5cb860')
        })
        .catch(error => {
          console.log(error)
          self.snack('top', 'Ошибка! Невозможно обновить данные', '#d32f2f')
        })
    },
    cancelRecord () {
      this.criminalUser = {
        editMode: false,
        name: '',
        surname: '',
        age: 0,
        sex: 'Неизвестно',
        department: '',
        date: '',
        fine_amount: 0,
        violation: '',
        descr: '',
        term: 0,
      }

      this.$store.commit('SET_CRIMINALRECORD', this.criminalUser)
      this.$router.push({
        name: 'Архив',
      })
    },
  },
}
