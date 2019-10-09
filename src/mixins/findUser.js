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
    getUsers () {
      return axios.get('http://194.87.144.130:3000/api/users?_size=64')
    },
    getVehicles () {
      return axios.get('http://194.87.144.130:3000/api/owned_vehicles')
    },
    getProperties () {
      return axios.get('http://194.87.144.130:3000/api/owned_properties')
    },
    findByName () {
      let self = this
      let target = this.searchByName
      let name = target.name
      let surname = target.surname
      let match = []

      axios.all([self.getUsers(), self.getVehicles(), self.getProperties()])
        .then(axios.spread(function (users, vehicles, properties) {
          let usersData = users.data
          let vehiclesData = vehicles.data
          let propertiesData = properties.data

          let names = usersData.filter(item => {
            if (name) {
              return item.firstname === name
            }
            if (surname) {
              return item.lastname === surname
            }
          })

          names.forEach((item, index) => {
            let steamID = item.identifier
            let id = index + 1
            let name = item.firstname
            let surname = item.lastname
            let age = item.dateofbirth
            let phone = item.phone_number
            let vehicles = vehiclesData.filter(item => {
              if (item.owner === steamID && item.job === null && item.type === 'car') {
                return item
              }
            })
            let vehiclePlates = []
            let vehicle = ''
            vehicles.forEach(item => {
              vehiclePlates.push(item.plate)
              vehicle = vehiclePlates.toString()
            })

            if (vehicles.length === 0) {
              vehicle = 'Нет данных'
            }

            let profession = item.job
            let properties = propertiesData.filter(item => {
              if (item.owner === steamID) {
                return item
              }
            })
            let propertyAdresses = []
            let property = ''
            properties.forEach(item => {
              propertyAdresses.push(item.name)
              property = propertyAdresses.toString()
            })

            let suspect = {
              steamID,
              id,
              name,
              surname,
              age,
              phone,
              vehicle,
              profession,
              property,
            }

            match.push(suspect)
          })

          self.$store.commit('SET_USER', match)
        }
        )
        )
    },
    findByPhone () {
      let self = this
      let target = this.searchByPhone
      let phone = target.phone
      let match = []

      axios.all([self.getUsers(), self.getVehicles(), self.getProperties()])
        .then(axios.spread(function (users, vehicles, properties) {
          let usersData = users.data
          let vehiclesData = vehicles.data
          let propertiesData = properties.data

          let phones = usersData.filter(item => {
            if (phone) {
              return item.phone_number === phone
            }
          })

          phones.forEach((item, index) => {
            let steamID = item.identifier
            let id = index + 1
            let name = item.firstname
            let surname = item.lastname
            let age = item.dateofbirth
            let phone = item.phone_number
            let vehicles = vehiclesData.filter(item => {
              if (item.owner === steamID && item.job === null && item.type === 'car') {
                return item
              }
            })
            let vehiclePlates = []
            let vehicle = ''
            vehicles.forEach(item => {
              vehiclePlates.push(item.plate)
              vehicle = vehiclePlates.toString()
            })

            if (vehicles.length === 0) {
              vehicle = 'Нет данных'
            }

            let profession = item.job
            let properties = propertiesData.filter(item => {
              if (item.owner === steamID) {
                return item
              }
            })
            let propertyAdresses = []
            let property = ''
            properties.forEach(item => {
              propertyAdresses.push(item.name)
              property = propertyAdresses.toString()
            })

            let suspect = {
              steamID,
              id,
              name,
              surname,
              age,
              phone,
              vehicle,
              profession,
              property,
            }

            match.push(suspect)
          })

          self.$store.commit('SET_USER', match)
        }
        )
        )
    },
    findByVehicle () {
      let self = this
      let target = this.searchByVehicle
      let plate = target.vehicle
      let match = []

      axios.all([self.getUsers(), self.getVehicles(), self.getProperties()])
        .then(axios.spread(function (users, vehicles, properties) {
          let usersData = users.data
          let vehiclesData = vehicles.data
          let propertiesData = properties.data

          let vehiclesArray = vehiclesData.filter(vehicle => {
            if (plate && vehicle.plate === plate && vehicle.job === null && vehicle.type === 'car') {
              return vehicle
            }
          })

          let vehiclePlates = vehiclesArray.map(vehicle => {
            return vehicle.plate
          })

          if (vehiclesArray.length !== 0) {
            let steamID = vehiclesArray[0].owner

            let owner = usersData.filter(item => {
              if (item.identifier === steamID) {
                return item
              }
            })

            owner.forEach((item, index) => {
              let steamID = item.identifier
              let id = index + 1
              let name = item.firstname
              let surname = item.lastname
              let age = item.dateofbirth
              let phone = item.phone_number
              let vehicle = vehiclePlates.toString()
              let profession = item.job
              let properties = propertiesData.filter(item => {
                if (item.owner === steamID) {
                  return item
                }
              })
              let propertyAdresses = []
              let property = ''
              properties.forEach(item => {
                propertyAdresses.push(item.name)
                property = propertyAdresses.toString()
              })

              let suspect = {
                steamID,
                id,
                name,
                surname,
                age,
                phone,
                vehicle,
                profession,
                property,
              }

              match.push(suspect)
            })
          }
          self.$store.commit('SET_USER', match)
        }
        )
        )
    },
  },
}
