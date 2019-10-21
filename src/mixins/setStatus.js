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
        phone: '',
        wanted: '',
      },
      defaultStatus: {
        identifier: '',
        name: '',
        surname: '',
        age: '',
        phone: '',
        wanted: '',
      },
    }
  },
  methods: {
    setStatus (item) {
      this.dialog = true
      this.userStatus = Object.assign({}, item)
      console.log(this.userStatus)
    },
    changeStatus () {
      this.userStatus.wanted = this.status
    },
    saveStatus () {
      let self = this
      if (self.userStatus.wanted === 'Не в розыске') {
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "DELETE FROM lspd_mostwanted WHERE identifier = '" + self.userStatus.identifier + "'",
          })
          .then(response => {
            console.log(response.data)
            self.snack('top', 'Статус успешно изменен!', '#5cb860')
          })
          .catch(error => {
            console.log(error)
            self.snack('top', 'Ошибка! Невозможно установить статус', '#D32F2F')
          })
      } else {
        axios.put('http://194.87.144.130:3000/api/lspd_mostwanted', {
          identifier: self.userStatus.identifier,
          name: self.userStatus.name,
          surname: self.userStatus.surname,
          age: self.userStatus.age,
          phone_number: self.userStatus.phone || self.userStatus.phone_number,
          wanted: self.userStatus.wanted,
        })
          .then(response => {
            console.log(response.data)
            self.snack('top', 'Статус успешно изменен!', '#5cb860')
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
