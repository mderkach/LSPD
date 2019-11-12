import axios from 'axios'
import { mapMutations, mapGetters, mapState } from 'vuex'

export const auth = {
  data () {
    return {
      isAuthorised: false,
    }
  },
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
      let self = this
      let sid = self.$route.query.sessionid
      if (sid) {
        axios.get('http://194.87.144.130:3000/api/user_sessionid/' + sid, {
          headers: { 'Cache-Control': 'no-cache' },
        })
          .then(response => {
            let officer = response.data[0].identifier
            if (self.officer.name && self.officer.surname) {
              console.log(self.officer.firstname && self.officer.surname)
            } else {
              self.getOfficer(officer)
            }
          })
      }
    },
    getOfficer (id) {
      let self = this
      axios.post('http://194.87.144.130:3000/dynamic', {
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
