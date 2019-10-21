export const criminalRecord = {
  data () {
    return {
      criminalUser: {
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
  methods: {
    criminalRecord (item) {
      this.criminalUser = Object.assign({}, item)

      this.$store.commit('SET_CRIMINALRECORD', this.criminalUser)
      if (Object.keys(this.criminalUser).length) {
        this.$router.push({
          name: 'Новая запись',
        })
      } else {
        this.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
      }
    },
  },
}
