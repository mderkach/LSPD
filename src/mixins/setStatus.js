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
    },
    changeStatus () {
      this.userStatus.wanted = this.status
      console.log(this.userStatus)
    },
    saveStatus () {
      let self = this
      axios.put('http://194.87.144.130:3000/api/lspd_mostwanted', {
        identifier: self.userStatus.identifier,
        name: self.userStatus.name,
        surname: self.userStatus.surname,
        age: self.userStatus.age,
        phone_number: self.userStatus.phone,
        wanted: self.userStatus.wanted,
      })
        .then(response => {
          self.snack('top', 'Статус успешно изменен!', 'success')
        })
        .catch(error => {
          console.log(error)
          self.snack('top', 'Ошибка! невозможно установить статус', 'error')
        })
    },
  },
}
