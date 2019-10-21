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
  SET_CRIMINALRECORD_SEX: (state, payload) => {
    state.criminalRecordUserData.sex = payload
  },
  SET_CRIMINALRECORD_AGE: (state, payload) => {
    state.criminalRecordUserData.age = payload
  },
  SET_CRIMINALRECORD_VIOLATION: (state, payload) => {
    state.criminalRecordUserData.violation = payload
  },
  SET_CRIMINALRECORD_TERM: (state, payload) => {
    state.criminalRecordUserData.term = payload
  },
  SET_CRIMINALRECORD_DATE: (state, payload) => {
    state.criminalRecordUserData.date = payload
  },
  SET_CRIMINALRECORD_DEPARTMENT: (state, payload) => {
    state.criminalRecordUserData.department = payload
  },
  SET_CRIMINALRECORD_FINE_AMOUNT: (state, payload) => {
    state.criminalRecordUserData.fine_amount = payload
  },
  SET_CRIMINALRECORD_DESCR: (state, payload) => {
    state.criminalRecordUserData.descr = payload
  },
}
