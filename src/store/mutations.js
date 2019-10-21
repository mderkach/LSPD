// https://vuex.vuejs.org/en/mutations.html

export default {
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_CRIMINALRECORD: (state, payload) => {
    state.criminalRecordUserData = payload
  },
  SET_CRIMINALRECORD_NAME: (state, payload) => {
    state.criminalRecordUserData.name = payload
  },
  SET_CRIMINALRECORD_SURNAME: (state, payload) => {
    state.criminalRecordUserData.surname = payload
  },
  SET_CRIMINALRECORD_AGE: (state, payload) => {
    state.criminalRecordUserData.age = payload
  },
  SET_CRIMINALRECORD_SEX: (state, payload) => {
    state.criminalRecordUserData.sex = payload
  },
}
