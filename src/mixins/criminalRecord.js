export const criminalRecord = {
  data () {
    return {
      criminalUser: {
        name: '',
        age: '',
        surname: '',
      },
    }
  },
  methods: {
    criminalRecord (item) {
      this.criminalUser = Object.assign({}, [item.name, item.surname, item.age])

      this.$store.commit('SET_CRIMINALRECORD', this.criminalUser)
      if (Object.keys(this.criminalUser).length) {
        this.$router.push({
          name: 'Новая запись',
        })
      } else {
        this.snack('top', 'Ошибка! Данные не найдены', 'error')
      }
    },
  },
}
