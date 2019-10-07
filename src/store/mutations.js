// https://vuex.vuejs.org/en/mutations.html

export default {
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_CRIMINALRECORD: (state, payload) => {
    state.criminalRecordUserData = payload
  },
}
