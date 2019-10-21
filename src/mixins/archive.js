import axios from 'axios'

//  also need const snack
export const archive = {
  data () {
    return {
      dialog: false,
      submit_delete: false,
      item: {
        editMode: false,
        name: '',
        surname: '',
        age: 0,
        sex: '',
        department: '',
        date: '',
        fine_amount: 0,
        violation: '',
        descr: '',
        term: 0,
      },
      defaultCase: {
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
      },
    }
  },
  mounted () {
    this.insertRecords()
  },
  methods: {
    getRecords () {
      return axios.get('http://194.87.144.130:3000/api/lspd_criminalrecord?_size=100')
    },
    insertRecords () {
      let self = this
      axios.all([self.getRecords()])
        .then(axios.spread(recordsList => {
          let records = recordsList.data
          records.forEach(item => {
            switch (item.sex) {
              case 'm': {
                item.sex = 'Мужчина'
                break
              }
              case 'f': {
                item.sex = 'Женщина'
                break
              }
              default: {
                item.sex = 'Неизвестно'
                break
              }
            }
            self.archive.items.push(item)
          })
        }
        )
        )
    },
    showCase (item) {
      this.item = Object.assign({}, item)
      this.dialog = true
    },
    close (modal) {
      if (modal === 'case') {
        this.dialog = false
      } else {
        this.submit_delete = false
      }
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultCase)
        this.item = Object.assign({}, this.defaultCase)
      }, 300)
    },
    submitDelete (item) {
      this.item = Object.assign({}, item)
      this.submit_delete = true
    },
    deleteCase (item) {
      let self = this
      axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              'DELETE FROM lspd_criminalrecord WHERE (`id` = ' + item.id + ')',
          })
          .then(response => {
            console.log(response)
            self.close('submit_delete')
            self.archive.items = []
            self.insertRecords()
          })
          .catch(error => {
            console.log(error)
            self.snack('top', 'Ошибка!', '#D32F2F')
          })
    },
    editCase (item) {
      console.log(item)
      item.editMode = true
      let array = item.violation.split(',')
      item.violation = array
      this.item = Object.assign({}, item)
      this.$store.commit('SET_CRIMINALRECORD', this.item)
      if (Object.keys(this.item).length) {
        this.$router.push({
          name: 'Новая запись',
        })
      }
    },
  },
}
