import axios from 'axios'

//  also need const snack
export const findUser = {
  data () {
    return {
      searchByName: {
        name: '',
        surname: '',
      },
      searchByPhone: {
        phone: '',
      },
      searchByVehicle: {
        vehicle: '',
      },
    }
  },
  methods: {
    findByName () {
      let target = this.searchByName
      let name = target.name
      let surname = target.surname
      let match = []
      if (name) {
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "SELECT identifier, firstname AS name, lastname AS surname, dateofbirth AS age, job AS profession, sex, phone_number AS phone,(SELECT GROUP_CONCAT(DISTINCT name ORDER BY name ASC SEPARATOR ', ') FROM owned_properties WHERE users.identifier = owned_properties.owner GROUP BY owned_properties.owner) AS property, (SELECT GROUP_CONCAT(DISTINCT plate ORDER BY plate ASC SEPARATOR ', ') FROM owned_vehicles WHERE job IS NULL AND (type IS NULL OR type = 'car') AND users.identifier = owned_vehicles.owner GROUP BY owned_vehicles.owner) AS vehicle, (SELECT wanted FROM lspd_mostwanted WHERE users.identifier = lspd_mostwanted.identifier) AS wanted FROM users Where firstname = '" +
              name +
              "' LIMIT 0 , 10000",
          })
          .then(response => {
            response.data.forEach((object, index) => {
              object.id = index + 1
              switch (object.profession) {
                case null:
                case 'unemployed': {
                  object.profession = 'Безработный'
                  break
                }
                case 'offpolice':
                case 'police': {
                  object.profession = 'Полицеский'
                  break
                }
                case 'offambulance':
                case 'ambulance': {
                  object.profession = 'Врач'
                  break
                }
                case 'mechanic': {
                  object.profession = 'Механик'
                  break
                }
              }
              switch (object.sex) {
                case 'm': {
                  object.sex = 'Мужчина'
                  break
                }
                case 'f': {
                  object.sex = 'Женщина'
                  break
                }
              }
              if (object.wanted === null) object.wanted = 'Не в розыске'
              if (object.vehicle === null) object.vehicle = 'Нет данных'
              if (object.property === null) object.property = 'Нет данных'
            })
            match = response.data
            this.commitData(match)
          })
      }
      if (surname) {
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "SELECT identifier, firstname AS name, lastname AS surname, dateofbirth AS age, sex, job AS profession, phone_number AS phone,(SELECT GROUP_CONCAT(DISTINCT name ORDER BY name ASC SEPARATOR ', ') FROM owned_properties WHERE users.identifier = owned_properties.owner GROUP BY owned_properties.owner) AS property, (SELECT GROUP_CONCAT(DISTINCT plate ORDER BY plate ASC SEPARATOR ', ') FROM owned_vehicles WHERE job IS NULL AND (type IS NULL OR type = 'car') AND users.identifier = owned_vehicles.owner GROUP BY owned_vehicles.owner) AS vehicle, (SELECT wanted FROM lspd_mostwanted WHERE users.identifier = lspd_mostwanted.identifier) as wanted FROM users Where lastname = '" +
              surname +
              "' LIMIT 0 , 10000",
          })
          .then(response => {
            response.data.forEach((object, index) => {
              object.id = index + 1
              switch (object.sex) {
                case 'm': {
                  object.sex = 'Мужчина'
                  break
                }
                case 'f': {
                  object.sex = 'Женщина'
                  break
                }
                default: {
                  object.sex = 'Неизвестно'
                  break
                }
              }
              if (object.wanted === null) object.wanted = 'Не в розыске'
              if (object.vehicle === null) object.vehicle = 'Нет данных'
              if (object.property === null) object.property = 'Нет данных'
              if (object.profession === null || object.profession === 'unemployed') object.profession = 'Безработный'
              if (object.profession === 'offpolice') object.profession = 'Полицеский'
              if (object.profession === 'offambulance') object.profession = 'Врач'
            })
            match = response.data
            this.commitData(match)
          })
      }
      if (!name && !surname) {
        this.snack('top', 'Может, стоит сперва ввести данные?', '#2979FF')
      }
    },
    findByPhone () {
      let target = this.searchByPhone
      let phone = target.phone
      let match = []

      if (phone) {
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "SELECT identifier, firstname AS name, lastname AS surname, dateofbirth AS age, sex, job AS profession, phone_number AS phone,(SELECT GROUP_CONCAT(DISTINCT name ORDER BY name ASC SEPARATOR ', ') FROM owned_properties WHERE users.identifier = owned_properties.owner GROUP BY owned_properties.owner) AS property, (SELECT GROUP_CONCAT(DISTINCT plate ORDER BY plate ASC SEPARATOR ', ') FROM owned_vehicles WHERE job IS NULL AND (type IS NULL OR type = 'car') AND users.identifier = owned_vehicles.owner GROUP BY owned_vehicles.owner) AS vehicle, (SELECT wanted FROM lspd_mostwanted WHERE users.identifier = lspd_mostwanted.identifier) as wanted FROM users Where phone_number = '" +
              phone +
              "' LIMIT 0 , 10000",
          })
          .then(response => {
            response.data.forEach((object, index) => {
              object.id = index + 1
              switch (object.sex) {
                case 'm': {
                  object.sex = 'Мужчина'
                  break
                }
                case 'f': {
                  object.sex = 'Женщина'
                  break
                }
                default: {
                  object.sex = 'Неизвестно'
                  break
                }
              }
              if (object.wanted === null) object.wanted = 'Не в розыске'
              if (object.vehicle === null) object.vehicle = 'Нет данных'
              if (object.property === null) object.property = 'Нет данных'
              if (object.profession === null || object.profession === 'unemployed') object.profession = 'Безработный'
              if (object.profession === 'offpolice') object.profession = 'Полицеский'
              if (object.profession === 'offambulance') object.profession = 'Врач'
            })
            match = response.data
            this.commitData(match)
          })
      } else {
        this.snack('top', 'Может, стоит сперва ввести данные?', '#2979FF')
      }
    },
    findByVehicle () {
      let target = this.searchByVehicle
      let plate = target.vehicle
      let match = []
      if (plate) {
        axios
          .post('http://194.87.144.130:3000/dynamic', {
            query:
              "SELECT identifier, firstname AS name, lastname AS surname, dateofbirth AS age, sex, job AS profession, phone_number AS phone,(SELECT GROUP_CONCAT(DISTINCT name ORDER BY name ASC SEPARATOR ', ') FROM owned_properties WHERE users.identifier = owned_properties.owner GROUP BY owned_properties.owner) AS property, (SELECT GROUP_CONCAT(DISTINCT plate ORDER BY plate ASC SEPARATOR ', ') FROM owned_vehicles WHERE job IS NULL AND (type IS NULL OR type = 'car') AND users.identifier = owned_vehicles.owner GROUP BY owned_vehicles.owner) AS vehicle, (SELECT wanted FROM lspd_mostwanted WHERE users.identifier = lspd_mostwanted.identifier) as wanted FROM users",
          })
          .then(response => {
            match = response.data.filter(vehicle => {
              if (vehicle.vehicle !== null) {
                if (vehicle.vehicle.toString().includes(plate)) {
                  return vehicle
                }
              }
            })
            match.forEach((object, index) => {
              object.id = index + 1
              switch (object.sex) {
                case 'm': {
                  object.sex = 'Мужчина'
                  break
                }
                case 'f': {
                  object.sex = 'Женщина'
                  break
                }
                default: {
                  object.sex = 'Неизвестно'
                  break
                }
              }
              if (object.wanted === null) object.wanted = 'Не в розыске'
              if (object.vehicle === null) object.vehicle = 'Нет данных'
              if (object.property === null) object.property = 'Нет данных'
              if (object.profession === null || object.profession === 'unemployed') object.profession = 'Безработный'
              if (object.profession === 'offpolice') object.profession = 'Полицеский'
              if (object.profession === 'offambulance') object.profession = 'Врач'
            })
            this.commitData(match)
          })
      } else {
        this.snack('top', 'Может, стоит сперва ввести данные?', '#2979FF')
      }
    },
    commitData (data) {
      if (data.length > 0) {
        this.$store.commit('SET_USER', data)
      } else {
        this.snack('top', 'Ошибка! Данные не найдены', '#D32F2F')
      }
    },
  },
}
