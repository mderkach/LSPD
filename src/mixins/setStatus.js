import axios from 'axios'

export const setStatus = {
  data () {
    return {
      dialog: false,
      statusItems: ['Не в розыске', 'В розыске', 'Пропавший(ая) без вести'],
      status: null,
      userStatus: {
        identifier: '',
        name: '',
        surname: '',
        age: '',
        sex: '',
        phone: '',
        wanted: '',
      },
      defaultStatus: {
        identifier: '',
        name: '',
        surname: '',
        age: '',
        sex: 'Неизвестно',
        phone: '',
        wanted: '',
      },
    }
  },
  methods: {
    setStatus (item) {
      this.dialog = true
      this.userStatus = Object.assign({}, item)
    },
    changeStatus () {
      this.userStatus.wanted = this.status
    },
    saveStatus () {
      const self = this
      let dbSex = ''
      if (self.userStatus.sex === 'Мужчина') {
        dbSex = 'm'
      } else if (self.userStatus.sex === 'Женщина') {
        dbSex = 'f'
      } else {
        dbSex = 'Неизвестно'
      }
      if (self.userStatus.wanted === 'Не в розыске') {
        axios
          .post('http://185.186.141.22:3000/dynamic', {
            query:
              "DELETE FROM lspd_mostwanted WHERE identifier = '" + self.userStatus.identifier + "'",
          })
          .then(response => {
            self.snack('top', 'Статус успешно изменен!', '#5cb860')
          })
          .catch(error => {
            console.log(error)
            self.snack('top', 'Ошибка! Невозможно установить статус', '#D32F2F')
          })
      } else {
        axios.put('http://185.186.141.22:3000/api/lspd_mostwanted', {
          identifier: self.userStatus.identifier,
          name: self.userStatus.name,
          surname: self.userStatus.surname,
          age: self.userStatus.age,
          sex: dbSex,
          phone_number: self.userStatus.phone || self.userStatus.phone_number,
          wanted: self.userStatus.wanted,
        })
          .then(response => {
            self.dialog = false
            self.snack('top', 'Статус успешно изменен!', '#5cb860')

            if (typeof self.getMostWanted === 'function') {
              self.mostWanted.items = []
              self.getMostWanted()
            } else {
              this.$router.push({
                name: 'Сводка',
              })
            }
          })
          .catch(error => {
            console.log(error)
            self.snack('top', 'Ошибка! Невозможно установить статус', '#D32F2F')
          })
      }
    },
    closeDialog () {
      this.dialog = false
      this.userStatus = Object.assign({}, this.defaultStatus)
    },
  },
}
