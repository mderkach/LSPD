import axios from 'axios'
import { mapMutations, mapGetters, mapState } from 'vuex'

export const auth = {
  data: () => ({
    isAuthorised: false,
  }),
  computed: {
    ...mapState(['officer']),
    ...mapGetters([
      'OFFICER_NAME',
      'OFFICER_SURNAME',
    ]),
    ...mapMutations([
      'SET_OFFICER_NAME',
      'SET_OFFICER_SURNAME',
    ]),
  },
  methods: {
    authorise () {
      const self = this
      const sid = self.$route.query.sessionid
      if (sid) {
        axios.get('http://185.186.141.22:3000/api/user_sessionid/' + sid, {
          headers: { 'Cache-Control': 'no-cache' },
        })
          .then(response => {
            const officer = response.data[0].identifier
            if (self.officer.name && self.officer.surname) {
              console.log(self.officer.firstname && self.officer.surname)
            } else {
              self.getOfficer(officer)
            }
          })
      }
    },
    getOfficer (id) {
      const self = this
      axios.post('http://185.186.141.22:3000/dynamic', {
        query:
          "SELECT job, firstname, lastname FROM users Where identifier = '" + id + "'",
      })
        .then(response => {
          console.log(response.data)
          if (response.data[0].job === 'police') {
            self.$store.commit('SET_OFFICER_NAME', response.data[0].firstname)
            self.$store.commit('SET_OFFICER_SURNAME', response.data[0].lastname)
            self.isAuthorised = true
          } else {
            alert('Неовзможно пройти авторизацию. Вы, что, хацкер?')
          }
        })
    },
  },
}
