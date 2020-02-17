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
  mounted () {
    const self = this
     window.addEventListener('message', event => {
       if (process.env.NODE_ENV !== 'production') {
         self.$store.commit('SET_OFFICER_NAME', 'suk')
         self.$store.commit('SET_OFFICER_SURNAME', 'blet')
       } else {
         if (event.data.job === 'police') {
           self.$store.commit(
             'SET_OFFICER_NAME',
             event.data.identity.firstname,
           )
           self.$store.commit(
             'SET_OFFICER_SURNAME',
             event.data.identity.lastname,
           )
         }
       }
     })
  },
  methods: {
    authorise () {
      this.isAuthorised = true
    },
  },
}
