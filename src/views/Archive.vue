<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <material-card
          color="red darken-3"
          title="Архив"
          text="Список дел"
          flat
          full-width
        >
          <v-data-table
            :headers="archive.headers"
            :items="archive.items"
            :items-per-page="5"
          />
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        archive: {
          headers: [
            {
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              sortable: false,
              text: 'Фамилия',
              value: 'lastname',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              sortable: false,
              text: 'Нарушение',
              value: 'violation',
            },
            {
              sortable: false,
              text: 'Дата',
              value: 'date',
            },
            {
              sortable: false,
              text: 'Ведомство',
              value: 'department',
            },
          ],
          items: [],
        },
      }
    },
    mounted () {
      this.insertRecords()
    },
    methods: {
      getRecords () {
        return axios.get('http://194.87.144.130:3000/api/lspd_criminalrecord?_size=100')
      },
      insertRecords () {
        let self = this
        axios.all([self.getRecords()])
          .then(axios.spread(function (recordsList) {
            let records = recordsList.data
            records.forEach(item => {
              self.archive.items.push(item)
            })
          }
          )
          )
      },
    },

  }
</script>
