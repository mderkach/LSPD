// https://vuex.vuejs.org/en/getters.html

export default {
  USER: state => {
    return state.user
  },
  CRIMINALRECORD: state => {
    return state.criminalRecordUserData
  },
  CRIMINALRECORD_EDIT: state => {
    return state.criminalRecordUserData.editMode
  },
  CRIMINALRECORD_NAME: state => {
    return state.criminalRecordUserData.name
  },
  CRIMINALRECORD_SURNAME: state => {
    return state.criminalRecordUserData.surname
  },
  CRIMINALRECORD_AGE: state => {
    return state.criminalRecordUserData.age
  },
  CRIMINALRECORD_SEX: state => {
    return state.criminalRecordUserData.sex
  },
  CRIMINALRECORD_VIOLATION: state => {
    return state.criminalRecordUserData.violation
  },
  CRIMINALRECORD_TERM: state => {
    return state.criminalRecordUserData.term
  },
  CRIMINALRECORD_DATE: state => {
    return state.criminalRecordUserData.date
  },
  CRIMINALRECORD_DEPARTMENT: state => {
    return state.criminalRecordUserData.departmant
  },
  CRIMINALRECORD_FINE_AMOUNT: state => {
    return state.criminalRecordUserData.fine_amount
  },
  CRIMINALRECORD_DESCR: state => {
    return state.criminalRecordUserData.descr
  },
  OFFICER_NAME: state => {
    return state.officer.name
  },
  OFFICER_SURNAME: state => {
    return state.officer.surname
  },
}
