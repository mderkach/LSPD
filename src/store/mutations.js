// https://vuex.vuejs.org/en/mutations.html

export default {
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_CRIMINALRECORD: (state, payload) => {
    state.criminalRecordUserData = payload
  },
  SET_CRIMINALRECORD_NAME: (state, payload) => {
    state.criminalRecordUserData[0] = payload
  },
  SET_CRIMINALRECORD_SURNAME: (state, payload) => {
    state.criminalRecordUserData[1] = payload
  },
  SET_CRIMINALRECORD_AGE: (state, payload) => {
    state.criminalRecordUserData[2] = payload
  },
}
